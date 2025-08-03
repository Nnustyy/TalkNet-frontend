import { api } from "./api";

export const likesApi = api.injectEndpoints({
  endpoints: (build) => ({
    likePost: build.mutation<void, {postId:string}>({
      query: (postId) => ({
        url: '/likes',
        method:'POST',
        body:postId
      })
    }),
    unlikePost: build.mutation<void, string>({
      query: (postId) => ({
        url:`/likes/${postId}`,
        method:'DELETE'
      })
    })
  })
})

export const {useLikePostMutation, useUnlikePostMutation} = likesApi;
export const {endpoints: {likePost, unlikePost}} = likesApi;