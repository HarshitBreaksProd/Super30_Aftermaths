import { FaTimes } from "react-icons/fa";
import Button from "./Button";

export interface ConfirmationModalProps {
  open: boolean;
  heading: string;
  subheading: string;
  onAccept: () => void;
  onReject: () => void;
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
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
        <h3 className="text-indigo-700 text-2xl font-bold">{props.heading}</h3>
        <p>{props.subheading}</p>
        <div className="flex w-full gap-2 mt-5">
          <Button
            variant="danger"
            size="md"
            text="Delete"
            onClick={async () => await props.onAccept()}
            className="w-full flex items-center justify-center"
          />
          <Button
            variant="secondary"
            size="md"
            text="Cancel"
            onClick={props.onReject}
            className="w-full flex items-center justify-center"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
