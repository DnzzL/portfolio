import { useEffect, useState } from "react";
import metadataParser from "markdown-yaml-metadata-parser";
import BlogSnippet from "Snippet";
import fistMonthsUrl from "@blogs/2018-08-21-first-months.md";
import winSetup from "@blogs/2018-09-07-win10-setup.md";
import pipenv from "@blogs/2018-09-14-get-started-pipenv.md";
import technicalDebt from "@blogs/2018-10-12-machine-learning-technical-debt.md";
import deployMLServices from "@blogs/2018-12-09-share-and-deploy-ml-services.md";
import mlKotlin from "@blogs/2019-04-07-machine-learning-kotlin.md";
import mlFlow from "@blogs/2019-07-26-mlflow-iris.md";
import bigDataWorld from "@blogs/2019-11-20-big-data-world.md";

const Blog = () => {
  const filenames = [
    fistMonthsUrl,
    winSetup,
    pipenv,
    technicalDebt,
    deployMLServices,
    mlKotlin,
    mlFlow,
    bigDataWorld,
  ];
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    filenames.forEach(async (filename) => {
      const fname = filename
        .replace("/static/media/", "")
        .split(".")
        .slice(0, 1);
      const response = await fetch(filename);
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
            posts.map((post, i) => (
              <BlogSnippet key={i} post={post}></BlogSnippet>
            ))}
        </div>
      </div>
    </section>
  );
};
export default Blog;
