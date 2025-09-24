import { useState } from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "./PostAPI.jsx";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import Post from "./Post.jsx";
function Input() {
  const {
    baseURL,
    user,
    img,
    desc,
    posts,
    setUser,
    setImg,
    setDesc,
    setPosts,
  } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const inputHandler = (e) => {
    setUser(e.target.value);
  };
  const urlHandler = (e) => {
    setImg(e.target.value);
  };
  const descHandler = (e) => {
    setDesc(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(baseURL, {
        postText: user,
        postImg: img,
        postDesc: desc,
      });

      setPosts((prev) => [...prev, res.data]);
      setUser("");
      setImg("");
      setDesc("");

      console.log("Data sent", data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUrl = async () => {
      const url = await axios.get(baseURL);
    };
    getUrl();
  }, []);

  const placeholder= "https://cff2.earth.com/uploads/2019/08/05182654/Young-Americans-are-posting-on-social-media-while-high-and-regretting-it-later.jpg"

  return (
    <>
    <div className="text-center flex text-white bg-neutral-900 bg-gradient-to-l to-yellow-400/50 from-50%  max-sm:p-3">

      <form className="w-9/12 p-30">
        <div className="text-2xl p-4 flex flex-col gap-6 w-full lg:text-xl lg:gap-2 md:text-start max-sm:text-xl max-sm:gap-2">
          <label htmlFor="title" className=" font-bold">Enter Post Title</label>
          <input
            type="text"
            placeholder="Enter text"
            onChange={inputHandler}
            className="bg-gray-300 rounded-md p-2"
          />
          <label htmlFor="img" className="font-bold">Enter Image URL</label>
          <input
            type="text"
            placeholder="Enter image url"
            onChange={urlHandler}
            className="bg-gray-300 rounded-md p-2"
          />
          <div className="m-10 h-80 flex justify-center rounded-md max-sm:m-4">
          <img src={img} alt="" className="object-cover w-full" />
          </div>
          <label htmlFor="desc"className="font-bold">Enter Post Description</label>

          <textarea
            type="text"
            placeholder="Enter description"
            onChange={descHandler}
            className="bg-gray-300 rounded-md h-60 p-2"
          />
         
         <div className="pt-4">
          <button
            onClick={submitHandler}
            className="cursor-pointer  rounded-xl w-5/12   bg-red-500 p-5"
          >
            Submit
          </button>
         </div>
        </div>
      </form>
    
      <div className="text-5xl p-15">
        <h1>Create your first post!</h1>
        <p>Start creating and uploading your posts all around the world!</p>
      </div>
    </div>

    <div className="text-3xl flex flex-col items-center pt-15">
      <h1 className="p-4">Posts</h1>
    </div>

      {loading ? (
        <div className="flex justify-center p-20">
          <CircularProgress size="6rem" />
        </div>
      ) : (
        <Post />
      )}
    </>
  );
}
export default Input;
