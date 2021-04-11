import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import footnotes from "remark-footnotes";
import gfm from "remark-gfm";
import styles from "./post.css";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";

const style = coy;
style['pre[class*="language-"]']["backgroundColor"] = "rgba(249, 250, 251, 1)";
style['pre[class*="language-"]>code']["backgroundColor"] =
  "rgba(249, 250, 251, 1)";
style[':not(pre) > code[class*="language-"]']["backgroundColor"] =
  "rgba(249, 250, 251, 1)";
console.log(coy);

export const markdownRenderers = {
  footnoteReference: FootnoteReference,
  footnoteDefinition: FootnoteDefinition,
  code: ({ language, value }) => {
    return (
      <div className="border flex flex-col rounded mb-0 bg-gray-50">
        <div className="block flex justify-start h-7 bg-gray-200 rounded-t">
          <div className="rounded-full text-gray-700 text-center bg-red-500 h-3 w-3 m-2"></div>
          <div className="rounded-full text-gray-700 text-center bg-yellow-500 h-3 w-3 m-2"></div>
          <div className="rounded-full text-gray-700 text-center bg-green-500 h-3 w-3 m-2"></div>
        </div>
        <SyntaxHighlighter language={language} children={value} style={style} />
      </div>
    );
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

{
  /* <div className="py-8">
  <div className="block flex justify-start h-8 bg-gray-700 rounded-t">
    <div className="rounded-full text-gray-700 text-center bg-red-500 h-4 w-4 m-2"></div>
    <div className="rounded-full text-gray-700 text-center bg-yellow-500 h-4 w-4 m-2"></div>
    <div className="rounded-full text-gray-700 text-center bg-green-500 h-4 w-4 m-2"></div>
  </div>
  <pre className="block bg-gray-800 p-4 rounded-b overflow-x-auto">
    <code className="font-mono bg-gray-800 text-gray-400 text-sm inline px-1">
        <SyntaxHighlighter language={language} children={value} />
    </code>
  </pre>
</div>; */
}

function Pre({ inline, realClassName, children }) {
  const Component = inline ? "span" : "pre";
  return <Component className={realClassName}>{children}</Component>;
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
