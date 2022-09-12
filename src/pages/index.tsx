import type { NextPage } from 'next';
import IntroCard from '../components/Homepage/Main/IntroCard';
import LatestBlogPostCard from '../components/Homepage/Main/LatestBlogPostCard';
import ProjectCard from '../components/Homepage/Main/ProjectCard';
import DailyQuoteCard from '../components/Homepage/Main/DailyQuoteCard';
import Main from '../components/Homepage/Main';
import Masonry from 'react-masonry-css';
import SubscribeCard from '../components/Blog/SubscribeCard';
import fs from 'fs';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { Project } from './projects';
import { gql, GraphQLClient } from 'graphql-request';
import { isEmpty } from 'lodash';

interface HomePageProps {
  latestPost: {
    latestPostData: matter.GrayMatterFile<string>;
    timeToRead: string;
    slug: string;
  };
  latestProject: Project;
}

const Home: NextPage<HomePageProps> = ({ latestPost, latestProject }) => {
  const breakpointColumnsObj = {
    default: 2,
    768: 1,
  };

  return (
    <Main>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid flex space-x-10"
        columnClassName="my-masonry-grid_column space-y-10"
      >
        <IntroCard></IntroCard>
        <LatestBlogPostCard latestPost={latestPost}></LatestBlogPostCard>
        <ProjectCard latestProject project={latestProject}></ProjectCard>
        <DailyQuoteCard></DailyQuoteCard>
        <SubscribeCard></SubscribeCard>
      </Masonry>
    </Main>
  );
};

export async function getStaticProps() {
  let files;

  try {
    files = fs.readdirSync(`${process.cwd()}/content/blog/posts`);
  } catch (e) {
    console.warn(e);
    return { props: {} };
  }

  const latestPostFilename = files.sort((f1, f2) => {
    let f1WithMetadata;
    let f2WithMetadata;
    try {
      f1WithMetadata = fs.readFileSync(`content/blog/posts/${f1}`).toString();
      f2WithMetadata = fs.readFileSync(`content/blog/posts/${f2}`).toString();
    } catch (e) {
      console.warn(e);
      return 0;
    }

    const data1 = matter(f1WithMetadata).data;
    const data2 = matter(f2WithMetadata).data;

    return data2.date - data1.date;
  })[0];

  const latestPostFile = fs.readFileSync(`content/blog/posts/${latestPostFilename}`).toString();
  const latestPostData = matter(latestPostFile);

  const timeToRead = readingTime(latestPostData.content).text;

  const slug = latestPostFilename.replace('.md', '');

  const reposApi = 'https://api.github.com/users/ely-saakian/repos';

  let latestProjectData = {};
  try {
    const response = await fetch(reposApi);
    const reposData = await response.json();

    const latestRepo = reposData.sort((repo1: any, repo2: any) => repo2.updated_at - repo1.updated_at)[0] || {};

    if (!isEmpty(latestRepo)) {
      const query = gql`
        {
          repository(owner: "ely-saakian", name: "${latestRepo.name}") {
            openGraphImageUrl
          }
        }
      `;

      const graphQLClient = new GraphQLClient('https://api.github.com/graphql', {
        headers: {
          authorization: 'Bearer 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',
        },
      });

      const graphQLresponse = await graphQLClient.request(query);

      latestProjectData = {
        title: latestRepo.name,
        description: latestRepo.description,
        url: latestRepo.html_url,
        imageUrl: graphQLresponse.repository.openGraphImageUrl,
        date: latestRepo.updated_at,
      };
    }
  } catch (error) {
    console.error('Error getting repos: ', error);
  }

  return {
    props: {
      latestPost: {
        latestPostData: {
          data: {
            ...latestPostData.data,
            date: new Date(latestPostData.data.date).toString(),
          },
        },
        timeToRead,
        slug,
      },
      latestProject: latestProjectData,
    },
  };
}

export default Home;
