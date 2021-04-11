import metadataParser from "markdown-yaml-metadata-parser";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { markdownPlugins, markdownRenderers } from "./markdownConfig";
import fistMonthsUrl from "@blogs/2018-08-21-first-months.md";
import winSetup from "@blogs/2018-09-07-win10-setup.md";
import pipenv from "@blogs/2018-09-14-get-started-pipenv.md";
import technicalDebt from "@blogs/2018-10-12-machine-learning-technical-debt.md";
import deployMLServices from "@blogs/2018-12-09-share-and-deploy-ml-services.md";
import mlKotlin from "@blogs/2019-04-07-machine-learning-kotlin.md";
import mlFlow from "@blogs/2019-07-26-mlflow-iris.md";
import bigDataWorld from "@blogs/2019-11-20-big-data-world.md";
import newWebsite from "@blogs/2021-04-07-new-website.md";
import { Helmet } from "react-helmet";
import Questions from "./Questions";

const BlogPost = () => {
  let { filename } = useParams();
  const filenames = [
    fistMonthsUrl,
    winSetup,
    pipenv,
    technicalDebt,
    deployMLServices,
    mlKotlin,
    mlFlow,
    bigDataWorld,
    newWebsite,
  ];
  const [post, setPost] = useState();

  useEffect(() => {
    filenames
      .filter((f) => f.includes(filename))
      .forEach(async (filename) => {
        const response = await fetch(filename);
        const text = await response.text();
        const post = metadataParser(text);
        setPost(post);
      });
  }, [filename]);

  return (
    <section className="text-gray-600 body-font">
      <Helmet>
        <title>{post && post.metadata.title}</title>
        <meta name="description" content={post && post.metadata.description} />
        <meta property="og:type" content="article" />
      </Helmet>
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
        <Questions></Questions>
      </div>
    </section>
  );
};
export default BlogPost;
