import Button from "../components/ui/Button";
import Sidebar from "../components/ui/Sidebar";
import { FiPlus, FiShare2 } from "react-icons/fi";
import Card from "../components/ui/Card";
import Masonry from "react-masonry-css";
import "../masonry.css";
import AddContentModal from "../components/AddContentModal";
import { useEffect, useState } from "react";
import {
  useDeleteContentByIdMutation,
  useFetchAllContentQuery,
} from "../store/services/contentApiSlice";
import { toast } from "react-toastify";
import ConfirmationModal from "../components/ui/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import ShareBrainModal from "../components/ShareBrainModal";

const Dashboard = () => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  const navigate = useNavigate();

  const [addContentModalOpen, setAddContentModalOpen] = useState(false);
  const [shareBrainModalOpen, setShareBrainModalOpen] = useState(false);
  const [toBeDeletedCardId, setToBeDeletedCardId] = useState("");
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);

  const {
    data: allContent,
    isError: fetchingError,
    error,
  } = useFetchAllContentQuery(null);
  const [deleteContentById] = useDeleteContentByIdMutation();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId === "") {
      navigate("/signin");
      toast.info("Please Login");
    }
  });

  const onDeleteContent = async (id: string) => {
    try {
      const res = await deleteContentById({ id });
      if (res.error) {
        const errMsg =
          (res.error as { data?: { message?: string } })?.data?.message ||
          "An error occurred";
        toast.error(errMsg);
        setShowDeleteConfirmationModal(false);
        return;
      }
      toast.success(res.data.message);
      setShowDeleteConfirmationModal(false);
      return;
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong, Please refresh and retry");
      setShowDeleteConfirmationModal(false);
      return;
    }
  };

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
      <ConfirmationModal
        open={showDeleteConfirmationModal}
        heading="Are you sure?"
        subheading="Once deleted, the brain card will be lost forever."
        onAccept={async () => await onDeleteContent(toBeDeletedCardId)}
        onReject={() => {
          setShowDeleteConfirmationModal(false);
          setToBeDeletedCardId("");
        }}
      />
      <AddContentModal
        open={addContentModalOpen}
        onClose={() => {
          setAddContentModalOpen(false);
        }}
      />
      <ShareBrainModal
        open={shareBrainModalOpen}
        onClose={() => {
          setShareBrainModalOpen(false);
        }}
      />
      <div className="ml-72">
        <div className="flex justify-between px-5 py-5 items-center">
          <h2 className="text-3xl">All Notes</h2>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="md"
              text="Share Brain"
              startIcon={<FiShare2 />}
              onClick={() => {
                setShareBrainModalOpen(true);
              }}
            />
            <Button
              variant="primary"
              size="md"
              text="Add Content"
              startIcon={<FiPlus />}
              onClick={() => {
                setAddContentModalOpen(true);
              }}
            />
          </div>
        </div>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid px-5"
          columnClassName="my-masonry-grid_column"
        >
          {allContent?.userContent.map((content, index) => {
            return (
              <Card
                key={index}
                title={content.title}
                contentType={content.type}
                link={content.link}
                tags={content.tags}
                time={content.createdAt}
                onDelete={() => {
                  setToBeDeletedCardId(content._id);
                  setShowDeleteConfirmationModal(true);
                }}
              />
            );
          })}
        </Masonry>
      </div>
    </div>
  );
};

export default Dashboard;
