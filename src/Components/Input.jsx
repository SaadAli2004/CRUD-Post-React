import { useState } from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "./PostAPI.jsx";
import axios from "axios";
import Post from "./Post.jsx";
function Input() {
  const { baseURL, user, img, desc, setUser, setImg, setDesc } =
    useContext(UserContext);

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

    try {
      const data = await axios.post(baseURL, {
        postText: user,
        postImg: img,
        postDesc: desc,
      });
      setUser("");
      setImg("");
      setDesc("");

      console.log("Data sent", data.data);
    } catch (error) {}
  };

  useEffect(() => {
    const getUrl = async () => {
      const url = await axios.get(baseURL);
    };
    getUrl();
  }, []);

  return (
    <>
      <div className="text-xl p-3 flex gap-2">

      <input type="text" placeholder="Enter text" onChange={inputHandler} className="bg-gray-300" />
      <input type="text" placeholder="Enter image url" onChange={urlHandler} className="bg-gray-300" />
      <input
        type="text"
        placeholder="Enter description"
        onChange={descHandler}
        className="bg-gray-300"
      />

      <button onClick={submitHandler}>Submit</button>
      </div>
      
      <Post/>
    </>
    
  );
}
export default Input;
