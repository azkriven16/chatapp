import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";
import { Bird } from "lucide-react";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { authUser, updateProfile } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!selectedImage) {
      await updateProfile({ fullName: name, bio });
      navigate("/");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image, fullName: name, bio });
      navigate("/");
    };
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="w-5/6 max-w-2xl bg-white text-gray-800 border-2 border-gray-200 flex items-center justify-between max-sm:flex-col-reverse rounded-lg shadow-xl">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-10 flex-1"
        >
          <h3 className="text-lg text-gray-800">Profile Details</h3>
          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer text-gray-700"
          >
            <input
              onChange={(e) => setSelectedImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept="image/*"
              hidden
            />
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : authUser.profilePic || assets.avatar_icon
              }
              className={`size-12 object-cover rounded-full ${
                selectedImage && "rounded-full"
              }`}
              alt=""
            />
            Upload profile image
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
            placeholder="Your name"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white text-gray-800"
          />

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
            placeholder="Write profile bio"
            rows={4}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white text-gray-800"
          />
          <button
            type="submit"
            className="bg-black hover:bg-gray-800 text-white p-2 rounded-full text-lg cursor-pointer transition-colors"
          >
            Save
          </button>
        </form>
        <div className="mx-10 max-sm:mt-10 flex flex-col items-center gap-3">
          <Bird className="w-32 h-32 text-black" />
          <img
            src={authUser.profilePic || assets.avatar_icon}
            className="max-w-44 aspect-square object-cover rounded-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
