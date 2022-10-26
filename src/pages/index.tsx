import clsx from "clsx";
import Button from "components/Button";
import SelectField from "components/SelectField";
import TextArea from "components/TextArea";
import TextField from "components/TextField";
import { canonical, getImageUrl, imageRatio, MIME_MAP, OGQuery } from "lib";
import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useRef, useState } from "react";
import styles from "styles/Home.module.css";

const Home: NextPage = () => {
  const [query, setQuery] = useState<OGQuery>({
    title: "Open Graph Image as a Service",
    type: "png",
  });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as any;
    const query: OGQuery = {
      title: form.title.value,
      signature: form.signature.value,
      type: form.type.value,
      color: form.color.value,
      backgroundColor: form.backgroundColor.value,
    };
    setQuery(query);
    buttonRef.current?.focus();
  };

  return (
    <>
      <Head>
        <title>Open Graph Image as a Service</title>
        <link rel="canonical" href={canonical("")} />
      </Head>
      <main
        role="main"
        id="main-content"
        className={clsx("container", styles.main)}
      >
        <h1>Open Graph Image as a Service</h1>
        <div className={styles.appPreview}>
          <section className={styles.formContainer}>
            <h2>Try your OG Image</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <TextArea
                defaultValue="Open Graph Image as a Service"
                name="title"
                label="Title"
                required
                inputClassName={styles.fullWidth}
              />
              <TextField
                name="signature"
                label="Signature"
                inputClassName={styles.fullWidth}
                enterKeyHint="next"
              />
              <SelectField
                name="type"
                label="File type"
                inputClassName={styles.fullWidth}
                defaultValue="png"
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="webp">WEBP</option>
                <option value="avif">AVIF</option>
              </SelectField>
              <TextField
                name="color"
                label="Text color"
                inputClassName={styles.fullWidth}
                enterKeyHint="next"
                type="color"
                defaultValue="#ffffff"
              />
              <TextField
                name="backgroundColor"
                label="Background color"
                inputClassName={styles.fullWidth}
                enterKeyHint="next"
                type="color"
                defaultValue="#0f1110"
              />
              <Button type="submit">Try</Button>
            </form>
          </section>
          <section className={styles.resultContainer}>
            <div className={styles.imageWrapper}>
              <img
                alt="Result"
                width={1200}
                height={1200 * imageRatio}
                className={styles.image}
                src={getImageUrl(query)}
              />
            </div>
            <div className={styles.actions}>
              <Button
                ref={buttonRef}
                type="button"
                title="Copy image URL to clipboard"
                style={{ width: "unset" }}
                onClick={() =>
                  navigator.clipboard.writeText(getImageUrl(query))
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="-0.5 -0.5 15 15"
                  strokeWidth={1}
                  width={24}
                  height={24}
                >
                  <g>
                    <rect
                      x="3"
                      y="3"
                      width="10.5"
                      height="10.5"
                      rx="1"
                      transform="translate(16.5 16.5) rotate(180)"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></rect>
                    <path
                      d="M.5,10.5v-9a1,1,0,0,1,1-1h9"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </g>
                </svg>
              </Button>
            </div>
            <TextArea
              inputClassName={styles.code}
              name="code"
              label="Add it to your website"
              readOnly
              value={`<meta property="og:image" content="${getImageUrl(
                query
              )}" />
<meta property="og:image:type" content="${MIME_MAP[query.type || "png"]}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="${query.title}" />`}
            />
          </section>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>
          Feel free to contribute:{" "}
          <a
            href="https://github.com/dialoghmari/og-image"
            target="_blank"
            rel="noreferrer"
            className={styles.github}
          >
            Github repo
          </a>
        </p>
      </footer>
    </>
  );
};

export default Home;
