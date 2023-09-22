import { logo } from "../assets";
import { AiOutlineGithub } from "react-icons/ai";
const Hero = () => {
  return (
    <header className="flex w-full flex-col items-center justify-center">
      <nav className="mb-10 flex w-full items-center justify-between pt-3">
        <img src={logo} alt="sum_logo" className="w-28 object-contain" />
        <a href="">
          <AiOutlineGithub className="h-8 w-8 object-contain" />
        </a>
      </nav>
      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAi GPT-4</span>
      </h1>
      <h2 className="desc">
        Experience the future of article summarization with{" "}
        <span className="orange_gradient font-bold">Sumz</span>, powered by
        OpenAI's cutting-edge GPT-4 technology.{" "}
        <span className="orange_gradient font-bold">Sumz</span> allows you to
        effortlessly transform lengthy articles and text content into concise,
        informative summaries.
      </h2>
    </header>
  );
};

export default Hero;
