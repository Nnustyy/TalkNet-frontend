import { api } from "./api";

export const followApi = api.injectEndpoints({
  endpoints: (build) => ({
    followUser: build.mutation<void, {followingId:string}>({
      query: (id) => ({
        url: '/follow',
        method:'POST',
        body:id
      })
    }),
    unfollowUser: build.mutation<void, string>({
      query: (id) => ({
        url:`/follow/${id}`,
        method:'DELETE'
      })
    })
  })
})

export const {useFollowUserMutation, useUnfollowUserMutation} = followApi;
export const {endpoints: {followUser, unfollowUser}} = followApi;