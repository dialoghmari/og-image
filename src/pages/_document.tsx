import { getImageUrl } from "lib";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@dialoghmari" />
        <meta name="keywords" content="SEO, Open Graph" />
        <meta name="author" content="Dia Loghmari" />
        <meta
          name="description"
          content="A service to generate dynamic Open Graph images."
        />
        <meta
          property="og:image"
          content={getImageUrl({
            title: "Open Graph Image as a Service",
            signature: "Made by Dia Loghmari with 🧡",
          })}
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Open Graph Image as a Service" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
