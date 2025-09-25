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
    
       if (user.trim() === "" && img.trim() === "" && desc.trim() === "") {
    setLoading(false);
    return;
  }

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
      setPosts(url.data);
    };
    
    getUrl();
  }, []);

  const placeholder= "https://cff2.earth.com/uploads/2019/08/05182654/Young-Americans-are-posting-on-social-media-while-high-and-regretting-it-later.jpg"

  return (
    <>
    <div className="text-center flex text-white bg-radial-[at_0%_0%]  from-purple-500/50 from-5% to-45%  max-sm:p-3 max-sm: max-sm:flex-col-reverse max-sm:bg-gradient-to-b">
     
      <form className="w-10/12 lg:w-6/12 max-sm:w-full sm:p-10 lg:p-10 xl:p-30 max-sm:p-5">
        <div className="text-2xl flex flex-col gap-6 w-full lg:text-xl lg:gap-2 md:text-start max-sm:text-xl max-sm:gap-2">
          <label htmlFor="title" className=" font-bold">Enter Post Title</label>
          <input
            type="text"
            
            onChange={inputHandler}
            className="bg-neutral-950 border border-purple-800 rounded-md p-2"
          />
          <label htmlFor="img" className="font-bold">Enter Image URL</label>
          <input
            type="text"
            
            onChange={urlHandler}
            className="bg-neutral-950 border border-purple-800 rounded-md p-2"
          />
          <div className="m-10 h-80 flex justify-center bg-gray-950 rounded-md max-sm:m-4">
          <img src= {img} className="object-cover w-full" />
          </div>
          <label htmlFor="desc"className="font-bold">Enter Post Description</label>

          <textarea
            type="text"
           
            onChange={descHandler}
            className="bg-neutral-950 border border-purple-800 rounded-md h-60 p-2 resize-none"
          />
         
         <div className="pt-4">
          <button
            onClick={submitHandler}
            className="cursor-pointer  rounded-xl w-5/12   bg-purple-800 p-5"
          >
            Submit
          </button>
         </div>
        </div>
      </form>
    
      <div className="text-5xl flex flex-col gap-5 p-15 max-sm:p-5">
        <h1 className="text-4xl lg:text-6xl font-semibold text-shadow-lg text-shadow-black">Create your first post!</h1>
        <p className="text-xl lg:text-2xl text-shadow-lg text-shadow-black">Start creating and uploading your posts all around the world!</p>
       
      </div>
    </div>

    <div className="text-3xl font-semibold flex flex-col items-center pt-15 lg:text-5xl max-sm:pb-20 md:pb-7">
      <h1 className="p-4 text-white text-shadow-lg border-b-3 border-purple-900 w-10/12 text-center">Posts</h1>
    </div>

      {loading ? (
        <div className="flex justify-center p-20">
          <CircularProgress size="6rem" />
        </div>
      ) : (
        
        posts.length === 0 ? (
          <div>
            <h1 className=" pb-10 text-center max-sm:text-lg sm:text-xl md:text-3xl text-white">There's nothing posted yet!</h1>
          </div>
        ) : (

          <div className="flex flex-wrap justify-center gap-8 max-sm:flex-col md:gap-4 sm:flex sm:flex-col md:flex-row sm:gap-2">
  
            <Post />
          </div>
        )

        
      )}
    </>
  );
}
export default Input;
