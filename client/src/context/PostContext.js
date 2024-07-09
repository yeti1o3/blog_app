import { useState,createContext } from "react";
export const PostContext = createContext([]);
export const PostProvider=({children})=>
{
    const[postInfo,setPostInfo]=useState(null);
    return <PostContext.Provider value={{postInfo,setPostInfo}}>{children}</PostContext.Provider>
}