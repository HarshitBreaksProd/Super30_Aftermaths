import { FaTimes } from "react-icons/fa";
import Button from "./ui/Button";
import { useEffect, useState } from "react";
import {
  useDisableShareMutation,
  useEnableShareMutation,
  useFetchShareBrainStatusQuery,
} from "../store/services/brainApiSlice";
import { toast } from "react-toastify";
import { BiCopy } from "react-icons/bi";

export interface ShareBrainModalProps {
  open: boolean;
  onClose: () => void;
}

const ShareBrainModal = (props: ShareBrainModalProps) => {
  const [enabled, setEnabled] = useState(false);
  const { data: shareStatus } = useFetchShareBrainStatusQuery(null);

  const [enableShare] = useEnableShareMutation();
  const [disableShare] = useDisableShareMutation();

  const changeShareStatus = async () => {
    try {
      if (enabled) {
        const res = await enableShare(null);
        toast.success(res.data?.message);
        localStorage.setItem("shareHash", res.data!.hash);
        return;
      } else {
        const res = await disableShare(null);
        localStorage.removeItem("shareHash");
        toast.success(res.data?.message);
        return;
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong, Please refresh and retry");
      return;
    }
  };

  useEffect(() => {
    setEnabled(shareStatus?.status || false);
    if (shareStatus?.status) {
      localStorage.setItem("shareHash", shareStatus.hash!);
    }
  }, [shareStatus, setEnabled]);

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
          onClick={props.onClose}
          className="text-red-500! fixed right-0 top-0"
        />
        <h3 className="text-indigo-700 text-2xl font-bold">Share Your Brain</h3>
        <div className="w-full mt-5 flex gap-2 text-indigo-500 mb-2">
          <p>Enable Share</p>
          <button
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 delay-100 focus:outline-none focus:ring-none ${
              enabled ? "bg-indigo-500" : "bg-indigo-100"
            }`}
            onClick={() => setEnabled(!enabled)}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`inline-block h-5 w-5 rounded-full  transition-all duration-300 transform translate-x-1 ${
                enabled ? "translate-x-5 bg-indigo-200" : "bg-indigo-500"
              }`}
            />
          </button>
        </div>
        {localStorage.getItem("shareHash") &&
        localStorage.getItem("shareHash") !== "" &&
        localStorage.getItem("shareHash") !== null ? (
          <>
            <div className="bg-gray-200/50 p-2 rounded-full relative flex items-center text-indigo-500">
              <button
                className="absolute right-0 bg-indigo-300/10 w-fit h-full flex items-center px-2 rounded-full gap-1 backdrop-blur-md backdrop-filter text-indigo-700 hover:cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${
                      import.meta.env.VITE_FRONTEND_URL
                    }/brain/${localStorage.getItem("shareHash")}`
                  );
                  toast.success("Copied to Clipboard");
                }}
              >
                <BiCopy />
                Copy Url
              </button>
              <p>{localStorage.getItem("shareHash")}</p>
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="flex pt-4 gap-4">
          <Button
            variant="primary"
            text="Confirm"
            size="md"
            className="w-full! flex! justify-center!"
            onClick={async () => await changeShareStatus()}
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

export default ShareBrainModal;
