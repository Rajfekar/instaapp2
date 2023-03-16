import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
} from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { db } from "../firebase"
import Post from "./Post"

const Posts = () => {
  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"))
  const [posts, setPosts] = useState([])
  useEffect(
    () =>
      onSnapshot(q, (snapshot) => {
        setPosts(snapshot.docs)
      }),
    [db]
  )

  return (
    <div>
      {posts.map((post, i) => (
        <Post
          key={i}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  )
}

export default Posts
