export const imageRatio: number = 630 / 1200;

export type OGQuery = {
  title: string;
  signature?: string;
  type?: 'png' | 'avif' | 'webp' | 'jpeg';
  color?: string;
  backgroundColor?: string;
};

export function getImageUrl(params: OGQuery): string {
  const url = new URL('/api/image', process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000');
  if (params.title) {
    url.searchParams.append('title', params.title);
  }
  if (params.type) {
    url.searchParams.append('type', params.type);
  }
  if (params.signature) {
    url.searchParams.append('signature', params.signature);
  }
  if (params.color) {
    url.searchParams.append('color', params.color);
  }
  if (params.backgroundColor) {
    url.searchParams.append('backgroundColor', params.backgroundColor);
  }
  return url.href;
}

/**
 * Copied from {@link https://stackoverflow.com/questions/54806869/looking-for-substring-alternative-javascript StackOverflow}
 * @param text the original text
 * @param max number of characters per line
 * @returns `text` with `\n` every `max` characters
 */
export function explode(text: string, max: number): string {
  if (text == null) return '';
  if (text.length <= max) return text;
  const nextNewLine = /\n/.exec(text);

  const lineLength = nextNewLine ? nextNewLine.index : text.length;
  if (lineLength <= max) {
    const line = text.substring(0, lineLength);
    const rest = text.substring(lineLength + 1);
    return line + '\n' + explode(rest, max);
  } else {
    let line = text.substring(0, max);
    let rest = text.substring(max);

    const res = /([\s])[^\s]*$/.exec(line);
    if (res) {
      //
      line = text.substring(0, res.index);
      rest = text.substring(res.index + 1);
    } else {
      line = line + '-';
    }
    return line + '\n' + explode(rest, max);
  }
}

export const MIME_MAP: Record<string, string> = {
  png: 'image/png',
  avif: 'image/avif',
  webp: 'image/webp',
  jpeg: 'image/jpeg',
};

export const SUPPORTED_ENCODING = new Set(['png', 'avif', 'webp', 'jpeg']);

export const canonical = (path: string) => new URL(path, process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000').href;
