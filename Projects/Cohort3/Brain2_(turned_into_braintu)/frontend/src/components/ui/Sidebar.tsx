import { BiBrain } from "react-icons/bi";
import SidebarItem from "./SidebarItem";
import {
  FiHash,
  FiLink2,
  FiLogOut,
  FiMusic,
  FiTwitter,
  FiYoutube,
} from "react-icons/fi";
import Button from "./Button";
import { useSignoutMutation } from "../../store/services/authApiSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [logout] = useSignoutMutation();
  const navigate = useNavigate();

  return (
    <div className="w-72 bg-white h-screen fixed rounded-r-2xl flex flex-col justify-between pb-4">
      <div>
        <h1 className="flex mb-8 gap-2 text-2xl items-center h-fit px-4 py-2 text-indigo-700">
          <BiBrain size={36} />{" "}
          <span className="text-black font-light tracking-wide">
            Braintu.ai
          </span>
        </h1>

        <div>
          <SidebarItem
            icon={<FiTwitter />}
            title={"Tweets"}
            onClick={() => {}}
          />
          <SidebarItem
            icon={<FiYoutube />}
            title={"Youtube"}
            onClick={() => {}}
          />
          <SidebarItem
            icon={<FiMusic />}
            title={"Spotify"}
            onClick={() => {}}
          />
          <SidebarItem icon={<FiLink2 />} title={"Links"} onClick={() => {}} />
          <SidebarItem icon={<FiHash />} title={"Tags"} onClick={() => {}} />
        </div>
      </div>

      <div className="px-4 py-2 flex w-full">
        <Button
          variant="secondary"
          size="md"
          text="Logout"
          startIcon={<FiLogOut />}
          onClick={async () => {
            localStorage.removeItem("shareHash");
            localStorage.removeItem("userId");
            await logout(null);
            navigate("/signin");
          }}
          className="w-full flex items-center justify-center"
        />
      </div>
    </div>
  );
};

export default Sidebar;
