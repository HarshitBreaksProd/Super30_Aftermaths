import { FaSearch, FaTimes } from "react-icons/fa";
import Button from "./ui/Button";
import { contentTypes } from "../types";
import { useEffect, useState } from "react";
import { FiHash } from "react-icons/fi";
import { useFetchTagByKeywordQuery } from "../store/services/tagsApiSlice";
import { AiOutlineLoading, AiOutlinePlus } from "react-icons/ai";
import CreateTagModal from "./CreateTagModal";
import { useCreateContentMutation } from "../store/services/contentApiSlice";
import { toast } from "react-toastify";

interface Tag {
  _id: string;
  title: string;
}

export interface AddContentModalProps {
  open: boolean;
  onClose: () => void;
}

const AddContentModal = (props: AddContentModalProps) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [selectedContentType, setSelectedContentType] = useState("");
  const [unSelectedTags, setUnSelectedTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [tagKeyword, setTagKeyword] = useState("");
  const [addTagModalOpen, setAddTagModalOpen] = useState(false);

  const {
    data: fetchedTags,
    isLoading: fetchingTags,
    error: errorFetchingTags,
    refetch: refetchTagsByKeyword,
  } = useFetchTagByKeywordQuery({ keyword: tagKeyword });

  const [createContent] = useCreateContentMutation();

  useEffect(() => {
    refetchTagsByKeyword();

    setUnSelectedTags(
      fetchedTags?.tags?.filter(
        (fetchedTag) =>
          !selectedTags.some(
            (selectedTag) => selectedTag._id === fetchedTag._id
          )
      ) || []
    );
  }, [tagKeyword, fetchedTags, selectedTags, refetchTagsByKeyword]);

  const resetInputs = () => {
    setTitle("");
    setLink("");
    setSelectedContentType("");
    setSelectedTags([]);
    setTagKeyword("");
    setUnSelectedTags([]);
  };

  const onSubmit = async () => {
    const tags = selectedTags.map((tag) => tag._id);
    try {
      const res = await createContent({
        title,
        link,
        type: selectedContentType,
        tags,
      });
      if (res.error) {
        const errMsg =
          (res.error as { data?: { message?: string } })?.data?.message ||
          "An error occurred";
        toast.error(errMsg);
        props.onClose();
        return;
      }
      toast.success(res.data.message);
      resetInputs();
      props.onClose();
      return;
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong, Please refresh and retry");
      resetInputs();
      props.onClose();
      return;
    }
  };

  const onCancel = () => {
    resetInputs();
    props.onClose();
  };

  return (
    <div
      className={`fixed w-screen h-screen flex items-center justify-center z-10 transition-all duration-300 ${
        props.open
          ? "backdrop-filter backdrop-blur-sm bg-indigo-400/30 pointer-events-auto"
          : "opacity-0 pointer-events-none -z-10"
      }`}
    >
      <CreateTagModal
        open={addTagModalOpen}
        onReject={() => setAddTagModalOpen(false)}
      />
      <div className="-translate-y-20 min-w-96 max-w-96 bg-white border border-indigo-600 p-5 rounded-2xl">
        <Button
          text=""
          startIcon={<FaTimes />}
          size="md"
          variant="badge"
          onClick={onCancel}
          className="text-red-500! fixed right-0 top-0"
        />
        <h3 className="text-indigo-700 text-2xl font-bold mb-4">Add Content</h3>
        <div className="flex flex-col gap-2">
          <input
            className="px-2 py-1 border border-indigo-400 rounded-lg placeholder:text-indigo-400 text-indigo-800"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            className="px-2 py-1 border border-indigo-400 rounded-lg placeholder:text-indigo-400 text-indigo-800"
            placeholder="Link"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />
          <div className="mt-4">
            <h3 className="text-indigo-700 text-lg mb-1">
              Select Content Type:
            </h3>
            <div className="flex flex-wrap gap-2">
              {contentTypes.map((type, index) => {
                return (
                  <button
                    key={index}
                    type="button"
                    className={`${
                      selectedContentType === type
                        ? "bg-indigo-700 text-white"
                        : "bg-indigo-100 text-indigo-700"
                    } rounded-md px-1.5 py-0.5 border hover:cursor-pointer`}
                    onClick={() => {
                      setSelectedContentType(type);
                    }}
                  >
                    {type[0].toUpperCase().concat(type.slice(1))}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-indigo-700 text-lg mb-1">Select Tags:</h3>
              <Button
                variant="secondary"
                size="sm"
                text="Create Tag"
                startIcon={<AiOutlinePlus />}
                onClick={() => {
                  setAddTagModalOpen(true);
                }}
              />
            </div>
            {fetchingTags ? (
              <AiOutlineLoading className="animate-spin" />
            ) : errorFetchingTags ? (
              <span className="text-sm text-red-500">Error Fetching Tags</span>
            ) : (
              <>
                <div className="bg-indigo-100 rounded-lg p-2">
                  <div className="flex flex-wrap gap-2">
                    {selectedTags.map((tag) => (
                      <button
                        key={tag._id}
                        type="button"
                        onClick={() => {
                          setSelectedTags(
                            selectedTags.filter((t) => t._id !== tag._id)
                          );
                        }}
                        className="flex items-center px-2 rounded-2xl bg-indigo-700 text-white"
                      >
                        <FiHash />
                        {tag.title}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    value={tagKeyword}
                    onChange={(e) => setTagKeyword(e.target.value)}
                    className="px-2 py-1 border border-indigo-400 rounded-lg placeholder:text-indigo-400 text-indigo-800 w-full"
                    placeholder="Search tags"
                  />
                  <FaSearch className="text-indigo-500 fixed right-8 pointer-events-none" />
                </div>
                <div className="flex flex-wrap gap-2 text-indigo-700">
                  {unSelectedTags
                    .filter((_, index) => index < 10)
                    .map((tag) => (
                      <button
                        key={tag._id}
                        type="button"
                        onClick={() => {
                          setSelectedTags([...selectedTags, tag]);
                        }}
                        className="flex items-center px-2 rounded-2xl bg-indigo-100 text-indigo-700"
                      >
                        <FiHash />
                        {tag.title}
                      </button>
                    ))}
                  {unSelectedTags.length > 10 ? "..." : ""}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex pt-4 gap-4">
          <Button
            variant="primary"
            text="Create"
            size="md"
            className="w-full! flex! justify-center!"
            onClick={onSubmit}
          />
          <Button
            variant="danger-outline"
            text="Cancel"
            size="md"
            className="w-full! flex! justify-center!"
            onClick={props.onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default AddContentModal;
