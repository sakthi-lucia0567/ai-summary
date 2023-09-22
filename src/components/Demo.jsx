import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetArticlesQuery } from "../services/article";
import Loader from "./Loader";
const Demo = () => {
  const [article, setArticle] = useState({ url: "", summary: "" });
  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetArticlesQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("allArticles"),
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = {
        ...article,
        summary: data.summary,
      };

      const updatedAllArticles = [...allArticles, newArticle];
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
      console.log(newArticle);
    }
  };
  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search */}
      <div className="flex w-full flex-col gap-2">
        <form
          className="relative flex items-center justify-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="Link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter URL"
            value={article.url}
            onChange={(e) => {
              setArticle({ ...article, url: e.target.value });
            }}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn  border-none hover:border-slate-700 focus:border-slate-700"
          >
            ⇧
          </button>
        </form>
        {/* Browser url History */}
        <div className="flex max-h-60 flex-col gap-1 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              {" "}
              <div className="copy_btn">
                <img
                  src={copy}
                  alt="copy"
                  className="h-[40%] w-[40%] object-contain"
                />
              </div>
              <p className="flex-1 truncate font-satoshi text-sm font-medium text-blue-700">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Display Results */}
      <div className="my-10 flex max-w-full items-center justify-center">
        {isFetching ? (
          <Loader />
        ) : error ? (
          <p className="text-center font-inter font-bold text-black">
            The Fault is ours, please retry... <br />
            <span className="font-satoshi text-red-500">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="summary_box flex flex-col gap-3">
              <h2 className="orange_gradient font-satoshi text-2xl font-bold">
                Summary
              </h2>{" "}
              <p className="font-inter text-sm font-medium text-gray-700">
                {article.summary}
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
