import { Canvas } from "@napi-rs/canvas";
import { explode, imageRatio, MIME_MAP, SUPPORTED_ENCODING } from "lib";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /* Init the context */
  const width: number = 1200;
  const height: number = width * imageRatio; /* 630 */
  const canvas = new Canvas(width, height);
  const context = canvas.getContext("2d");

  /* Init the background */
  context.fillStyle = "#0e1111";
  context.fillRect(0, 0, width, height);

  /* Adding tiitle's text */
  context.font = "bold 45pt Arial";
  context.textAlign = "center";
  context.textBaseline = "top";
  const title = explode((req.query.title as string) || "Hello \n world 👋", 40);
  const numberOfLine = (title.match(new RegExp("\n", "g")) || []).length + 1;
  context.fillStyle = "#fff";
  context.fillText(title, 600, 630 / 2 - 45 * numberOfLine);

  /* Adding signature  */
  if (req.query.signature) {
    context.fillStyle = "#fff";
    context.font = "bold 18pt Arial";
    context.fillText(String(req.query.signature), 600, 530);
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
