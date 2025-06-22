import Sidebar from "../components/ui/Sidebar";
import Masonry from "react-masonry-css";
import "../masonry.css";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchSharedBrainQuery } from "../store/services/brainApiSlice";
import ShareCard from "../components/ui/ShareCard";
import Button from "../components/ui/Button";
import { FiArrowLeft } from "react-icons/fi";

const SharedBrainDashboard = () => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  const { shareHash } = useParams();
  const navigate = useNavigate();

  if (!shareHash) {
    navigate("/dashboard");
  }

  const {
    data: sharedContent,
    isError: fetchingError,
    error,
  } = useFetchSharedBrainQuery({ hash: shareHash || "" });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId === "") {
      navigate("/signin");
      toast.info("Please Login");
    }
  });

  if (fetchingError) {
    if ((error as { status?: number }).status === 401) {
      toast.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "User not logged in"
      );
      navigate("/signin");
      return;
    }
    toast.error("Something went wrong");
    navigate("/signin");
    return;
  }

  return (
    <div className="bg-slate-100 w-screen min-h-screen">
      <Sidebar />
      <div className="ml-72">
        <div className="flex justify-between px-5 py-5 items-center">
          <h2 className="text-3xl">All Notes by {sharedContent?.username}</h2>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="md"
              text="Dashboard"
              startIcon={<FiArrowLeft />}
              onClick={() => {
                navigate("/dashboard");
              }}
            />
          </div>
        </div>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid px-5"
          columnClassName="my-masonry-grid_column"
        >
          {sharedContent?.content.map((content, index) => {
            return (
              <ShareCard
                key={index}
                title={content.title}
                contentType={content.type}
                link={content.link}
                tags={content.tags}
                time={content.createdAt}
              />
            );
          })}
        </Masonry>
      </div>
    </div>
  );
};

export default SharedBrainDashboard;
