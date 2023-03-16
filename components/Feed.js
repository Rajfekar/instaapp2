import { useSession } from "next-auth/react"
import React from "react"
import MiniProfile from "./MiniProfile"
import Posts from "./Posts"
import Stories from "./Stories"
import Suggestions from "./Suggestions"

const Feed = () => {
  const { data: session } = useSession()
  return (
    <main
      className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3   xl:max-w-6xl max-auto ${
        !session && "!grid-cols-1 !max-w-screen  xl:ml-14"
      } 2xl:ml-44`}
    >
      {/* Section */}
      <section className="col-span-2">
        {/* Stories */}
        <Stories />
        {/* Posts */}
        <Posts />
      </section>
      {session && (
        <section className="hidden xl:inline-grid md:col-span-1">
          <div className="fixed top-20 ">
            {/* Mini Profile */}
            <MiniProfile />
            {/* Suggetions */}
            <Suggestions />
          </div>
        </section>
      )}
      {/* Section */}
    </main>
  )
}

export default Feed
