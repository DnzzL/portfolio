import { useEffect, useState } from "react";
import metadataParser from "markdown-yaml-metadata-parser";
import BlogSnippet from "Snipper";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  function importAll(r) {
    return r.keys().map(r);
  }

  useEffect(() => {
    importAll(require.context("/blogs", false, /\.md$/))
      .map((f) => f.default)
      .forEach(async (filename) => {
        const fname = `${filename
          .split(".")[0]
          .toString()
          .replace("/static/media/", "")}`;
        const file = await import(
          `${filename
            .split(".")[0]
            .toString()
            .replace("/static/media/", "/blogs/")}.md`
        );
        const response = await fetch(file.default);
        const text = await response.text();
        const { metadata, content } = metadataParser(text);
        setPosts((prevPosts) => [{ metadata, content, fname }, ...prevPosts]);
      });
  }, []);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Articles
            </h1>
            <div className="h-1 w-20 bg-yellow-300 rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500"></p>
        </div>
        <div className="-my-8 divide-y-2 divide-gray-100">
          {posts.length > 0 &&
            posts.map((post) => <BlogSnippet post={post}></BlogSnippet>)}
        </div>
      </div>
    </section>
  );
};
export default Blog;
