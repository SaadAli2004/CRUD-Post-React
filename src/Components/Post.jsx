import { useState, useContext, useEffect } from "react"
import { UserContext } from "./PostAPI"
import { Modal, Box } from "@mui/material"
import axios from "axios"



function Post() {
    const {baseURL, user, img,desc,posts,updatePost, setUser, setImg, setDesc,setPosts,setUpdatePost} = useContext(UserContext)
    
 const editHandler = (currentPost) => {
    setUpdatePost(currentPost);
    setUser(currentPost.postText);
    setImg(currentPost.postImg);
    setDesc(currentPost.postDesc);
    setShowModal(true);
    
}

const deleteHandler = async(postID) => {
   try {
      
      const removeData = await axios.delete(`${baseURL}/${postID}`)
   } catch (error) {
      
   }

   setPosts((prev) => prev.filter((p) => p.id !== postID));

}
 const [showModal, setShowModal] = useState(false);
//   const [selectedPost, setSelectedPost] = useState("");


const updateHandler= async()=> {

   try {

      // Put the state values in keys of object "post" after going into the base URL then into the posts ID
      const update = await axios.put(`${baseURL}/${updatePost.id}`, {postText:user,postImg:img,postDesc:desc} )

      // Afterwards, map the posts into specific arrays "p"
      // Check if p.id matches updatePost.id, then update setPost state with update.data; otherwise keep the "p" same
       setPosts((prev) => prev.map((p) => (p.id === updatePost.id ? update.data : p)));
   } catch (error) {
      console.log(error)
   }

  
// Set all these to empty afterwards
   setShowModal(false);
setUpdatePost(null);
setUser("");
setImg("");
setDesc("");
}

    useEffect(() => {



        const postURL = async() => {
         try {
            const postData = await axios.get(baseURL)
            setPosts(postData.data);
            
            // console.log("Post received", post);
         } catch (error) {
            console.log(error);
         }
        } 

    postURL();

    },[])

    return(
        
       <>
        
        {showModal && (
 
          <Modal
           open={showModal} onClose={() => setShowModal(false)} className="h-screen">
            <Box className="h-screen flex justify-center items-center">
          <div className="bg-amber-800 rounded-2xl h-fit p-10 w-7/12 flex gap-3" >
          <div>
            <img src={img} alt="" className="bg-red-400 w-60 h-60 object-cover" />
          </div>
          {/* Changes input length */}
           <div className="w-8/12">
           <form action="" className="flex flex-col">
            <div>
            <label htmlFor="title">Change Post Title</label>
            <input type="text" value={user} onChange={(e) => setUser(e.target.value)} name="title" className="bg-neutral-600 p-2 w-full" />
            </div>
            <div>
            <label htmlFor="img">Change Post Image URL</label>
            <input type="text" name="img" value={img} onChange={(e) => setImg(e.target.value)} className="bg-neutral-600 p-2 w-full" />
            </div>
            <div>
            <label htmlFor="title">Change Post Description</label>
            <textarea type="text" name="desc" value={desc} onChange={(e) => setDesc(e.target.value)} className="bg-neutral-600 p-2 w-full h-40" placeholder=""  />
            </div>

           </form>
           <div className="flex justify-end gap-2 p-2">


           <button className="bg-blue-600 p-3 cursor-pointer" onClick={updateHandler}>Update</button>
            <button className="bg-gray-200 text-gray-600 p-3 cursor-pointer" onClick={()=> setShowModal(false)}>Cancel</button>

           </div>
           </div>
          </div>
        

            </Box>
          
        </Modal>
        )
        
          }
       {posts.map((post,index) =>(
       <div className="p-4 bg-neutral-900 text-xl text-white flex flex-col" key={index}>
         <div className="p-3">
            <h1>{post.postText}</h1>
         </div>
        <div className="bg-white rounded-md flex justify-center">
        <img src={post.postImg} className="w-fit object-cover" alt="post image" />
        </div>
        <div className="p-3">
        <h1>{post.postDesc}</h1>
        <div className="flex pt-10 text-sm gap-3">
            <button className="bg-blue-600 rounded-md p-3 cursor-pointer" onClick={() => editHandler(post)} >Edit</button>
        <button className="bg-red-600 rounded-md p-3 cursor-pointer" onClick={()=> deleteHandler(post.id)} >Delete</button>
        </div>
        </div>
       

       </div>

       ))}
       
       
       </>

    )
}
export default Post;