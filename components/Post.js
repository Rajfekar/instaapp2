import React, { useEffect, useState } from "react"
import {
  BookmarkIcon,
  ChatBubbleLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  FaceSmileIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline"
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid"
import { useSession } from "next-auth/react"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore"
import { db } from "../firebase"
import { Snapshot } from "recoil"
import Moment from "react-moment"

const Post = ({ id, username, userImg, img, caption }) => {
  const { data: session } = useSession()
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])
  const [Likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)
  //
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  )
  //
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid))
    } else {
      await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
        username: session?.user?.username,
      })
    }
  }

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  )
  useEffect(() => {
    setHasLiked(
      Likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    )
  }, [Likes])

  const sendComment = async (e) => {
    e.preventDefault()
    const commentToSend = comment
    setComment(" ")
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session?.user?.username,
      userImg: session?.user?.image,
      timestamp: serverTimestamp(),
    })
  }

  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          alt="user"
          className="rounded-full h-12 object-contain border p-1 mr-3"
        />
        <p className="flex-1 font-bold">{username}</p>
        <EllipsisHorizontalIcon className="h-5" />
      </div>
      {/* img */}
      <img src={img} alt="image" className="object-cover w-full " />
      {/* Buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4 pb-2">
          <div className="flex space-x-4 ">
            {hasLiked ? (
              <HeartIconFilled
                className="btn text-pink-600"
                onClick={likePost}
              />
            ) : (
              <HeartIcon className="btn" onClick={likePost} />
            )}

            <ChatBubbleLeftEllipsisIcon className="btn" />
            <PaperAirplaneIcon className="btn -rotate-45" />
          </div>
          <BookmarkIcon className="btn " />
        </div>
      )}

      {/* caption */}
      <p className="p-5 truncate">
        {Likes.length > 0 && (
          <p className="font-bold mb-1">{Likes.length} Likes</p>
        )}

        <span className="font-bold mr-1 ">{username}</span>
        {caption}
      </p>
      {/* comments */}

      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((val, i) => (
            <div key={i} className="flex items-center space-x-2 mb-3">
              <img
                src={val.data().userImg}
                alt="img"
                className="h-7 rounded-full"
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{val.data().username}</span>{" "}
                {val.data().comment}
              </p>
              <Moment fromNow className="pr-5 text-xs">
                {val.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}
      {/* input box */}
      {session && (
        <form className="flex items-center p-4">
          <FaceSmileIcon className="h-7" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border-none flex-1 focus:ring-0 outline-none"
            placeholder="Add a comment..."
          />
          <button
            className="font-semibold text-blue-400"
            type="submit"
            // disabled={!comment}
            onClick={sendComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  )
}

export default Post
