import readingTime from "reading-time";
import client from "@tina/__generated__/client";
import Main from "@/components/Homepage/Main";
import { HomeContent } from "@/components/Homepage/Main/HomeContent";

async function getHomeData() {
  let latestPostResult = null;

  try {
    const postsResponse = await client.queries.postConnection({
      sort: "date",
      last: 1,
    });

    const latestEdge =
      postsResponse.data?.postConnection?.edges?.[0]?.node ?? null;

    if (latestEdge) {
      const bodyString = JSON.stringify(latestEdge.body);
      const timeToRead = readingTime(bodyString).text;

      latestPostResult = {
        data: {
          title: latestEdge.title,
          description: latestEdge.description ?? undefined,
          date: latestEdge.date
            ? new Date(latestEdge.date).toString()
            : undefined,
          series: (latestEdge as any).series ?? undefined,
        },
        timeToRead,
        slug: latestEdge._sys.filename,
      };
    }
  } catch (error) {
    console.error("Error fetching latest post from Tina: ", error);
  }

  return { latestPost: latestPostResult };
}

export default async function Home() {
  const { latestPost } = await getHomeData();

  return (
    <Main>
      <HomeContent latestPost={latestPost} />
    </Main>
  );
}
