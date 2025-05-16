import { FiHash, FiMusic, FiTwitter, FiYoutube } from "react-icons/fi";
import Button from "./Button";
import { Tweet } from "react-tweet";
import { BsArrowUpRight } from "react-icons/bs";

export interface ShareCardProps {
  title: string;
  contentType: "youtube" | "tweet" | "spotify" | "link";
  link: string;
  tags: { _id: string; title: string }[];
  time: string;
}

const ShareCard = (props: ShareCardProps) => {
  const createdTime = new Date(props.time);
  const dateString = createdTime.toLocaleDateString();

  const getCardIcon = () => {
    switch (props.contentType) {
      case "youtube":
        return <FiYoutube size={20} />;
      case "tweet":
        return <FiTwitter size={20} />;
      case "link":
        return <BsArrowUpRight size={20} />;
      case "spotify":
        return <FiMusic size={20} />;
    }
  };

  const getEmbedding = () => {
    switch (props.contentType) {
      case "youtube":
        return (
          <iframe
            className="w-full h-50 my-2 rounded-lg"
            src={props.link
              .replace("youtu.be/", "youtube.com/watch?v=")
              .replace("watch?v=", "embed/")}
          ></iframe>
        );
      case "tweet":
        return (
          <div data-theme="light" className="-mt-4">
            <Tweet id={`${props.link.split("/").pop()}`} />
          </div>
        );
      case "link":
        return (
          <a
            href={props.link}
            target="_blank"
            className="hover:cursor-pointer relative"
          >
            <div className="bg-white/0 opacity-0 absolute w-full h-full hover:bg-white/30 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <div className="bg-violet-200 max-w-full w-fit h-fit rounded-full flex pl-2 items-center text-violet-700">
                <span className="max-w-40 overflow-clip whitespace-nowrap overflow-ellipsis px-1 py-1">
                  {props.link}
                </span>
                <span className="bg-violet-200 p-2 rounded-full border">
                  <BsArrowUpRight />
                </span>
              </div>
            </div>
            <iframe
              className="w-full my-2 rounded-lg pointer-events-none"
              src={props.link}
            ></iframe>
          </a>
        );
      case "spotify":
        return (
          <iframe
            className="w-full h-58 my-2 rounded-lg"
            src={props.link.replace("spotify.com/", "spotify.com/embed/")}
          ></iframe>
        );
    }
  };

  return (
    <div className="w-full h-fit bg-white rounded-2xl pt-1 pb-4">
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-4 text-lg">
          <span className="text-gray-600 pl-1.5">{getCardIcon()}</span>
          <h2>{props.title}</h2>
        </div>
      </div>
      <div className="px-2">{getEmbedding()}</div>
      <div className="flex flex-wrap gap-1 px-2">
        {props.tags.map((tag, index) => {
          return (
            <Button
              key={index}
              variant="secondary"
              size="sm"
              startIcon={<FiHash />}
              onClick={() => {}}
              text={tag.title}
              className="rounded-full!"
            ></Button>
          );
        })}
      </div>
      <div className="px-2 mt-3 text-gray-500 text-sm">
        Added on {dateString}
      </div>
    </div>
  );
};

export default ShareCard;
