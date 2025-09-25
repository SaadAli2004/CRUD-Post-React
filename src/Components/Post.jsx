import { useState, useContext, useEffect } from "react";
import { UserContext } from "./PostAPI";
import { Modal, Box } from "@mui/material";
import axios from "axios";

function Post() {
  const {
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
    setUpdatePost,
  } = useContext(UserContext);

  const editHandler = (currentPost) => {
    setUpdatePost(currentPost);
    setUser(currentPost.postText);
    setImg(currentPost.postImg);
    setDesc(currentPost.postDesc);
    setShowModal(true);
  };

  const deleteHandler = async (postID) => {
    try {
      const removeData = await axios.delete(`${baseURL}/${postID}`);
    } catch (error) {}

    setPosts((prev) => prev.filter((p) => p.id !== postID));
  };
  const [showModal, setShowModal] = useState(false);
  //   const [selectedPost, setSelectedPost] = useState("");

  const updateHandler = async () => {
    try {
      // Put the state values in keys of object "post" after going into the base URL then into the posts ID
      const update = await axios.put(`${baseURL}/${updatePost.id}`, {
        postText: user,
        postImg: img,
        postDesc: desc,
      });

      // Afterwards, map the posts into specific arrays "p"
      // Check if p.id matches updatePost.id, then update setPost state with update.data; otherwise keep the "p" same
      setPosts((prev) =>
        prev.map((p) => (p.id === updatePost.id ? update.data : p))
      );
    } catch (error) {
      console.log(error);
    }

    // Set all these to empty afterwards
    setShowModal(false);
    setUpdatePost(null);
    setUser("");
    setImg("");
    setDesc("");
  };

  useEffect(() => {
    const postURL = async () => {
      try {
        const postData = await axios.get(baseURL);
        setPosts(postData.data);

        // console.log("Post received", post);
      } catch (error) {
        console.log(error);
      }
    };

    postURL();
  }, []);

  return (
    <>
      {showModal && (
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          className="h-screen"
        >
          <Box className="h-screen flex justify-center items-center">
            <div className="bg-gray-900 rounded-2xl  p-20 max-md:p-10 w-7/12 max-sm:flex-col max-sm:w-full max-sm:items-center max-sm:gap-8 flex gap-3">
              <div>
                <img
                  src={img}
                  alt=""
                  className="bg-black w-60 h-60 object-contain"
                />
              </div>
              {/* Changes input length */}
              <div className="w-8/12 max-sm:w-full text-white">
                <form className="flex flex-col">
                  <div>
                    <label htmlFor="title">Change Post Title</label>
                    <input
                      type="text"
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                      name="title"
                      className="bg-black rounded-md p-2 w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="img">Change Post Image URL</label>
                    <input
                      type="text"
                      name="img"
                      value={img}
                      onChange={(e) => setImg(e.target.value)}
                      className="bg-black rounded-md p-2 w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="title">Change Post Description</label>
                    <textarea
                      type="text"
                      name="desc"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      className="bg-black rounded-md p-2 w-full h-40 resize-none"
                      placeholder=""
                    />
                  </div>
                </form>
                <div className="flex justify-end gap-2 p-2">
                  <button
                    className="bg-blue-800 text-black p-3 rounded-md cursor-pointer"
                    onClick={updateHandler}
                  >
                    Update
                  </button>
                  <button
                    className="bg-gray-400 text-gray-800 rounded-md p-3 cursor-pointer"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </Box>
         
        </Modal>
      )}
      {posts.map((post, index) => (
        <div className="pt-5 p-2 text-lg w-11/12 text-white  max-sm:w-full max-sm:p-0 md:pt-1 md:text-lg sm:pt-0 lg:w-4/12 md:w-5/12 max-md:mx-auto" key={index}>
          <div className="bg-black shadow-[0_0_20px] shadow-cyan-600/35 h-160 rounded-md p-5 md:h-140 lg:h-150 sm:m-10 md:m-0 ">
            <div className="p-3">
              <h1>{post.postText}</h1>
            </div>
            <div className="bg-white rounded-md flex justify-center">
              <img
                src={post.postImg}
                className="h-95 object-cover max-sm:h-90 md:h-70 lg:h-90"
                alt="post image"
              />
            </div>
            <div className="p-3">
              <h1 className="line-clamp-3 md:line-clamp-2">{post.postDesc}</h1>
              <div className="flex pt-10 text-sm gap-3">
                <button
                  className="bg-indigo-800 rounded-md p-3 cursor-pointer"
                  onClick={() => editHandler(post)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 rounded-md p-3 cursor-pointer"
                  onClick={() => deleteHandler(post.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
    </>
  );
}
export default Post;
