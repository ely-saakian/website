import fs from "fs";
import matter from "gray-matter";
import readingTime from "reading-time";
import { gql, GraphQLClient } from "graphql-request";
import { isEmpty } from "lodash";
import Main from "../components/Homepage/Main";
import { HomeContent } from "../components/Homepage/Main/HomeContent";

async function getHomeData() {
  let files: string[] = [];

  try {
    files = fs.readdirSync(`${process.cwd()}/content/blog/posts`);
  } catch (e) {
    console.warn(e);
    files = [];
  }

  let latestPostResult = null;

  if (files.length > 0) {
    const latestPostFilename = files.sort((f1, f2) => {
      let f1WithMetadata;
      let f2WithMetadata;
      try {
        f1WithMetadata = fs
          .readFileSync(`content/blog/posts/${f1}`)
          .toString();
        f2WithMetadata = fs
          .readFileSync(`content/blog/posts/${f2}`)
          .toString();
      } catch (e) {
        console.warn(e);
        return 0;
      }

      const data1 = matter(f1WithMetadata).data;
      const data2 = matter(f2WithMetadata).data;

      return data2.date - data1.date;
    })[0];

    const latestPostFile = fs
      .readFileSync(`content/blog/posts/${latestPostFilename}`)
      .toString();
    const latestPostData = matter(latestPostFile);

    const timeToRead = readingTime(latestPostData.content).text;
    const slug = latestPostFilename.replace(".md", "");

    latestPostResult = {
      latestPostData: {
        data: {
          ...latestPostData.data,
          date: new Date(latestPostData.data.date).toString(),
        },
      },
      timeToRead,
      slug,
    };
  }

  const reposApi = "https://api.github.com/users/ely-saakian/repos";

  let latestProjectData = {};
  try {
    const response = await fetch(reposApi);
    const reposData = await response.json();

    const latestRepo =
      reposData.sort(
        (repo1: any, repo2: any) => repo2.updated_at - repo1.updated_at,
      )[0] || {};

    if (!isEmpty(latestRepo)) {
      const githubToken = process.env.GITHUB_TOKEN;
      if (githubToken) {
        const query = gql`
          {
            repository(owner: "ely-saakian", name: "${latestRepo.name}") {
              openGraphImageUrl
            }
          }
        `;

        const graphQLClient = new GraphQLClient(
          "https://api.github.com/graphql",
          {
            headers: {
              authorization: `Bearer ${githubToken}`,
            },
          },
        );

        const graphQLresponse: any = await graphQLClient.request(query);

        latestProjectData = {
          title: latestRepo.name,
          description: latestRepo.description,
          url: latestRepo.html_url,
          imageUrl: graphQLresponse.repository.openGraphImageUrl,
          date: latestRepo.updated_at,
        };
      }
    }
  } catch (error) {
    console.error("Error getting repos: ", error);
  }

  return { latestPost: latestPostResult, latestProject: latestProjectData };
}

export default async function Home() {
  const { latestPost, latestProject } = await getHomeData();

  return (
    <Main>
      <HomeContent latestPost={latestPost} latestProject={latestProject as any} />
    </Main>
  );
}
