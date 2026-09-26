import Main from "@/components/Homepage/Main";
import { HomeContent } from "@/components/Homepage/Main/HomeContent";
import projectsData from "@/data/projects.json";
import { getAllPosts } from "@/lib/posts";
import { Project } from "@/types/project";

async function getLatestPost() {
  try {
    const posts = await getAllPosts();
    return posts[0] ?? null;
  } catch (error) {
    console.error("Error fetching latest post from Tina: ", error);
    return null;
  }
}

export default async function Home() {
  const latestPost = await getLatestPost();
  const featuredProject = (projectsData as Project[])[0] ?? null;

  return (
    <Main>
      <HomeContent latestPost={latestPost} featuredProject={featuredProject} />
    </Main>
  );
}
