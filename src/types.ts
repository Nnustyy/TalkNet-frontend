export type User = {
  email:string,
  id:string,
  password:string,
  name?:string,
  avatarUrl?:string,
  dateOfBirth?:Date,
  createdAt:Date,
  updatedAt:Date,
  bio?:string,
  location?:string,
  posts:Post[],
  likes:Like[],
  comments:Comment[],
  followers: Follows[],
  following:Follows[],
  isFollowing?:Boolean
}

export type Post = {
  id:string,
  content:string,
  author:User,
  authorId:string,
  likes: Like[],
  comments:Comment,
  createdAt:Date
}

export type Like = {
  id:string,
  user:User,
  userId:string,
  post:Post,
  postId:string,
  createdAt:Date

}

export type Comment = {
  id:string,
  content:string,
  user:User,
  userId:string,
  post:Post,
  postId:string,
  createdAt:Date,
}

export type Follows = {
  id:string,
  follower:User,
  followerId:string,
  following:User,
  followingId:string,
  createdAt:Date
  
}

