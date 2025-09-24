import { createContext, useState } from "react";
import Input from "./Input";

export const UserContext = createContext();

function PostAPI() {
  const baseURL = "https://68af3f8db91dfcdd62bbd212.mockapi.io/createpost";
  const [user, setUser] = useState("");
  const [img, setImg] = useState("");
  const [desc, setDesc] = useState("");
  const [posts, setPosts] = useState([]);
    const [updatePost, setUpdatePost] = useState([]);

  return (
    <UserContext.Provider
      value={{
        baseURL,
        user,
        img,
        desc,
        posts,
        updatePost,
        setUser,
        setImg,
        setDesc,
        setPosts,
        setUpdatePost
      }}
    >
      <Input />
    </UserContext.Provider>
  );
}
export default PostAPI;
