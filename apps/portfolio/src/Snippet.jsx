import { useEffect } from "react";
import { useState } from "react";

const BlogSnippet = ({ post }) => {
  const [fname, setFname] = useState("");
  const splitDate = post.metadata.date.split("-");

  useEffect(() => {
    setFname(`/post/${post.fname}`);
  }, [post]);

  return (
    <div className="py-8 flex flex-wrap md:flex-nowrap">
      <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
        <span className="font-semibold title-font text-gray-700">
          {post.metadata.categories}
        </span>
        <span className="mt-1 text-gray-500 text-sm">
          {new Date(
            splitDate.slice(0, 1),
            splitDate.slice(1, 2),
            splitDate.slice(2, 3)
          ).toDateString()}
        </span>
      </div>
      <div className="md:flex-grow">
        <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
          {post.metadata.title}
        </h2>
        <p className="leading-relaxed">{post.metadata.description}</p>
        <a className="text-red-500 inline-flex items-center mt-4" href={fname}>
          Learn More
          <svg
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  );
};
export default BlogSnippet;
