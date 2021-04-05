import metadataParser from "markdown-yaml-metadata-parser";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { markdownPlugins, markdownRenderers } from "./markdownConfig";

const BlogPost = () => {
  let { filename } = useParams();
  const [post, setPost] = useState();

  function importAll(r) {
    return r.keys().map(r);
  }

  useEffect(() => {
    importAll(require.context("./blogs", false, /\.md$/))
      .map((f) => f.default)
      .filter((f) => f.includes(filename))
      .forEach(async (filename) => {
        const file = await import(
          `${filename
            .split(".")[0]
            .toString()
            .replace("/static/media/", "./blogs/")}.md`
        );
        const response = await fetch(file.default);
        const text = await response.text();
        const post = metadataParser(text);
        setPost(post);
      });
  }, [filename]);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-10 mx-auto flex flex-col">
        <div className="flex flex-wrap w-full mb-4">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              {post && post.metadata.title}
            </h1>
            <div className="h-1 w-20 bg-yellow-300 rounded"></div>
            <span className="inline-block py-1 px-2 rounded bg-yellow-50 text-yellow-500 text-xs font-medium tracking-widest my-5">
              {post && post.metadata.categories[0]}
            </span>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500"></p>
        </div>
        <div className="md:w-auto">
          <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
            {post && (
              <ReactMarkdown
                renderers={markdownRenderers}
                plugins={markdownPlugins}
                transformImageUri={(uri) => `${process.env.PUBLIC_URL}${uri}`}
              >
                {post.content}
              </ReactMarkdown>
            )}
          </article>
        </div>
      </div>
    </section>
  );
};
export default BlogPost;
