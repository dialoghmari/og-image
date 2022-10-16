import { Canvas, GlobalFonts } from "@napi-rs/canvas";
import { explode, imageRatio, MIME_MAP, SUPPORTED_ENCODING } from "lib";
import type { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /* Init the context */
  const fontSize: number = 45;
  const width: number = 1200;
  const height: number = width * imageRatio; /* 630 */
  const canvas = new Canvas(width, height);
  const context = canvas.getContext("2d");

  /* Init the background */
  context.fillStyle = "#0e1111";
  context.fillRect(0, 0, width, height);

  /* Register fonts */
  GlobalFonts.registerFromPath(
    join(__dirname, "..", "fonts", "AppleColorEmoji@2x.ttf"),
    "Apple Emoji"
  );

  /* Adding tiitle's text */
  context.font = `bold ${fontSize}px Apple Emoji`;
  context.textAlign = "center";
  context.textBaseline = "top";
  context.fillStyle = "#fff";
  const title = explode((req.query.title as string) || "Hello world 👋", 45);
  let lines = title.split("\n");
  for (let i = 0; i < lines.length; i++) {
    context.fillText(
      lines[i].trim(),
      width / 2,
      (height - 48) / 2 - fontSize * (lines.length / 2) + i * fontSize
    );
  }

  /* Adding signature  */
  if (req.query.signature) {
    context.fillStyle = "#fff";
    context.font = "bold 24px Apple Emoji";
    context.fillText(String(req.query.signature), width / 2, height - 48);
  }

  /* Render */
  const { type = "png" } = req.query;
  let encodeType: "png" | "webp" | "avif";
  if (typeof type === "string" && SUPPORTED_ENCODING.has(type)) {
    // @ts-expect-error
    encodeType = type;
  } else {
    encodeType = "png";
  }
  // @ts-expect-error
  const buffer = await canvas.encode(encodeType);
  res.setHeader("Content-Type", MIME_MAP[encodeType]);
  res.setHeader("Content-Disposition", "inline");
  res.setHeader(
    "Cache-Control",
    `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
  );
  res.send(buffer);
}
