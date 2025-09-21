import { useState, useContext, useEffect } from "react"
import { UserContext } from "./PostAPI"
import axios from "axios"


function Post() {
    const {baseURL, user, img,desc,posts, setUser, setImg, setDesc,setPosts} = useContext(UserContext)
    

    const handleEdit = (id) => {
        setUser(posts[id - 1].postText)
        console.log(id)
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
       {posts.map((post,index) =>(

       <div className="p-20 border flex" key={index}>
        <div>
        <img src={post.postImg} className="w-40" alt="post image" />
        </div>
        <div className="flex flex-col p-3">

        <h1>Post title : {post.postText}</h1>
        <h1>Post Description : {post.postDesc}</h1>
        <div className="flex pt-20 gap-3">
            <button className="bg-blue-600 p-3 cursor-pointer" onClick={()=> handleEdit(post.id)} >Edit</button>
        <button className="bg-red-600 p-3 cursor-pointer" >Delete</button>
        </div>
        </div>
        

       </div>

       ))}
       
       </>

    )
}
export default Post;