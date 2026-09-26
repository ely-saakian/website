import Main from "@/components/Blog/Main";
import { PostRow, SeriesSection } from "@/components/Blog/SeriesSection";
import { getAllPosts, groupBySeries } from "@/lib/posts";

export default async function Blog() {
  let posts: Awaited<ReturnType<typeof getAllPosts>> = [];
  try {
    posts = await getAllPosts();
  } catch (error) {
    console.error("Error fetching posts from Tina:", error);
  }

  const { series, standalone } = groupBySeries(posts);

  return (
    <Main>
      <div className="flex w-full max-w-[960px] flex-col gap-10 pt-2">
        <h1 className="text-4xl font-semibold tracking-[-0.025em] text-ink sm:text-[40px]">
          Blog
        </h1>

        {series.map((s) => (
          <SeriesSection key={s.name} series={s} />
        ))}

        {standalone.length > 0 && (
          <section aria-labelledby="more-writing" className="flex flex-col">
            <h2 id="more-writing" className="eyebrow pb-2">
              More writing
            </h2>
            <ul className="flex flex-col">
              {standalone.map((post) => (
                <li key={post.slug} className="border-t border-line">
                  <PostRow post={post} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </Main>
  );
}
