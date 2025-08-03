import { api } from "./api";
import { Post} from "@/types";

export const postsApi = api.injectEndpoints({
  endpoints:(build) => ({
    createPost: build.mutation<Post,{content:string} >({
      query: (postData) =>({
        url:'/posts',
        method:'POST',
        body: postData
      })
    }),
    getAllPosts: build.query<Post[], void>({
      query: () => ({
        url:`/posts`,
        method:'GET'
      })
    }),
    getPostById: build.query<Post,string>({
      query: (postId) => ({
        url:`/posts/${postId}`,
        method:'GET'
      })
    }),
    deletePost: build.mutation<void, string>({
      query: (postId) => ({
        url:`/posts/${postId}`,
        method:'DELETE'
      })
    })
  })
})

export const {useCreatePostMutation, useGetAllPostsQuery, useLazyGetAllPostsQuery, useGetPostByIdQuery, useLazyGetPostByIdQuery, useDeletePostMutation} = postsApi;
export const {endpoints: {createPost, getAllPosts, getPostById, deletePost}} = postsApi;