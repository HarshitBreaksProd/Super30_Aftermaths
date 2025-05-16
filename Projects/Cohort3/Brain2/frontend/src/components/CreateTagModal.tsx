import { FaTimes } from "react-icons/fa";
import Button from "./ui/Button";
import { useState } from "react";
import { useCreateTagMutation } from "../store/services/tagsApiSlice";

export interface CreateTagModal {
  open: boolean;
  onReject: () => void;
}

const CreateTagModal = (props: CreateTagModal) => {
  const [title, setTitle] = useState("");
  const [createTag] = useCreateTagMutation();

  return (
    <div
      className={`fixed w-full h-full flex items-center justify-center z-15 transition-all duration-300 ${
        props.open
          ? "backdrop-filter backdrop-blur-sm bg-white/1 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="-translate-y-20 min-w-96 bg-white border border-indigo-600 p-5 rounded-2xl">
        <Button
          text=""
          startIcon={<FaTimes />}
          size="md"
          variant="badge"
          onClick={props.onReject}
          className="text-red-500! fixed right-0 top-0"
        />
        <h3 className="text-indigo-700 text-2xl font-bold mb-4">
          Create a tag
        </h3>
        <div className="flex flex-col gap-2">
          <input
            className="px-2 py-1 border border-indigo-400 rounded-lg placeholder:text-indigo-400 text-indigo-800"
            placeholder="Tag Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="flex pt-4 gap-4">
          <Button
            variant="primary"
            text="Create"
            size="md"
            className="w-full! flex! justify-center!"
            onClick={async () => {
              await createTag({ title });
              props.onReject();
              setTitle("");
            }}
          />
          <Button
            variant="danger-outline"
            text="Cancel"
            size="md"
            className="w-full! flex! justify-center!"
            onClick={() => {
              props.onReject();
              setTitle("");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTagModal;
