import { createCanvas } from "canvas";
import { explode, imageRatio } from "lib";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /* Init the context */
  const width: number = 1200;
  const height: number = width * imageRatio; /* 630 */
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  /* Init the background */
  context.fillStyle = "#0e1111";
  context.fillRect(0, 0, width, height);

  /* Adding tiitle's text */
  context.font = "bold 45pt Arial";
  context.textAlign = "center";
  context.textBaseline = "top";
  const title = explode((req.query.title as string) || "Hello world 👋", 40);
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
  const type = req.query.type as string;
  const buffer =
    type == "png"
      ? canvas.toBuffer("image/png")
      : canvas.toBuffer("image/jpeg");
  res.statusCode = 200;
  res.setHeader("Content-Type", type == "png" ? `image/png` : `image/jpeg`);
  res.setHeader(
    "Cache-Control",
    `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`
  );
  res.end(buffer);
}
