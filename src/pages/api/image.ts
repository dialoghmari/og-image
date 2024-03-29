import { Canvas } from '@napi-rs/canvas';
import { explode, imageRatio, MIME_MAP, SUPPORTED_ENCODING } from 'lib';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /* Init the context */
  const fontSize: number = 45;
  const width: number = 1200;
  const height: number = width * imageRatio; /* 630 */
  const canvas = new Canvas(width, height);
  const context = canvas.getContext('2d');

  /* Init the background */
  const { backgroundColor = '#0e1111' } = req.query;
  context.fillStyle = String(backgroundColor);
  context.fillRect(0, 0, width, height);

  /* Adding tiitle's text */
  const { color = '#fff' } = req.query;
  context.font = `bold ${fontSize}px Ubuntu`;
  context.textAlign = 'center';
  context.textBaseline = 'top';
  context.fillStyle = String(color);
  const title = explode((req.query.title as string) || 'Hello world 👋', 45);
  let lines = title.split('\n');
  for (let i = 0; i < lines.length; i++) {
    context.fillText(lines[i].trim(), width / 2, (height - 48) / 2 - fontSize * (lines.length / 2) + i * fontSize);
  }

  /* Adding signature  */
  if (req.query.signature) {
    context.fillStyle = String(color);
    context.font = 'bold 24px Ubuntu';
    context.fillText(String(req.query.signature), width / 2, height - 48);
  }

  /* Render */
  const { type = 'png' } = req.query;
  let encodeType: 'png' | 'webp' | 'avif';
  if (typeof type === 'string' && SUPPORTED_ENCODING.has(type)) {
    // @ts-expect-error
    encodeType = type;
  } else {
    encodeType = 'png';
  }
  // @ts-expect-error
  const buffer = await canvas.encode(encodeType);
  res.setHeader('Content-Type', MIME_MAP[encodeType]);
  res.setHeader('Content-Disposition', 'inline');
  res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`);
  res.send(buffer);
}
