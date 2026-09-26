/**
 * Tina Cloud returns `image` fields as `https://assets.tina.io/<client-id>/<path>`,
 * while the local Tina server returns `/<path>`. Media is repo-based (tina/config.ts
 * `mediaRoot: ""`, public folder `public`), so every file is also served from this
 * site: strip the Tina prefix so next/image optimizes it as a local image.
 */
export function localMediaPath(src: string | null | undefined): string | null {
  if (!src) return null;
  return src.replace(/^https:\/\/assets\.tina\.io\/[^/]+(?=\/)/, "");
}
