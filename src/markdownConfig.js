import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import footnotes from "remark-footnotes";
import gfm from "remark-gfm";
import styles from "./post.css";

export const markdownRenderers = {
  footnoteReference: FootnoteReference,
  footnoteDefinition: FootnoteDefinition,
  code: ({ language, value }) => {
    return <SyntaxHighlighter language={language} children={value} />;
  },
};
export const markdownPlugins = [gfm, footnotes];

function FootnoteReference(props) {
  return (
    <sup id={"ref-" + props.identifier}>
      <a href={"#def-" + props.identifier}>{props.label}</a>
    </sup>
  );
}

function FootnoteDefinition(props) {
  return (
    <div className={styles.footnoteDefinition} id={"def-" + props.identifier}>
      <a className={styles.backToRef} href={"#ref-" + props.identifier}>
        {props.label}
      </a>
      <div className={styles.footnoteBody}>{props.children}</div>
    </div>
  );
}
