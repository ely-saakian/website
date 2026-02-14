import { ImageResponse } from "next/og";
import client from "@tina/__generated__/client";

export const alt = "Blog post cover";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(
  font: string,
  weight: number,
  text: string,
): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);
  if (!match) throw new Error("Failed to load font data");
  const response = await fetch(match[1]);
  if (response.status !== 200) throw new Error("Failed to fetch font file");
  return response.arrayBuffer();
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let title = "Blog Post";
  let series = "";

  try {
    const data = await client.queries.post({
      relativePath: `${slug}.md`,
    });
    const post = data.data.post;
    title = post.title;
    series = (post as any).series ?? "";
  } catch {
    // fallback to defaults
  }

  const allText = `${series} Blog Series${title}Ely Saakian`;

  const [robotoRegularData, robotoBoldData] = await Promise.all([
    loadGoogleFont("Roboto", 400, allText),
    loadGoogleFont("Roboto", 700, allText),
  ]);

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
        padding: "60px",
        gap: "36px",
      }}
    >
      {series ? (
        <p
          style={{
            fontSize: 36,
            fontWeight: 400,
            color: "#6b7280",
            textAlign: "center",
            lineHeight: 1.2,
            margin: 0,
            fontFamily: "Roboto",
          }}
        >
          {series} Blog Series
        </p>
      ) : null}
      <h1
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: "#000000",
          textAlign: "center",
          lineHeight: 1.2,
          margin: 0,
          fontFamily: "Roboto",
        }}
      >
        {title}
      </h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src="https://elysaakian.com/avatar.png"
          width={204}
          height={56}
          alt=""
        />
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Roboto",
          data: robotoRegularData,
          weight: 400 as const,
          style: "normal" as const,
        },
        {
          name: "Roboto",
          data: robotoBoldData,
          weight: 700 as const,
          style: "normal" as const,
        },
      ],
    },
  );
}
