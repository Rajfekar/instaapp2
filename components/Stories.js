import React from "react"
import { faker } from "@faker-js/faker"
import { useEffect, useState } from "react"
import Story from "./Story"
import { type } from "os"
import { useSession } from "next-auth/react"
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import { useRecoilState, useRecoilValue } from "recoil"
import { modalState } from "../atoms/modalAtom"
const Stories = () => {
  const [open, setOpen] = useRecoilState(modalState)
  const { data: session } = useSession()
  var [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const suggestion = [...Array(20)].map((val, i) => ({
      // userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      // email: faker.internet.email(),
      avatar: faker.image.avatar(),
      // password: faker.internet.password(),
      // birthdate: faker.date.birthdate(),
      // registeredAt: faker.date.past(),
    }))

    setSuggestions(suggestion)
  }, [])

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border border-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
      {session && (
        <div
          onClick={() => setOpen(true)}
          className="flex items-center justify-center "
        >
          <Story
            key={"rajfekar123"}
            imgurl={session?.user?.image}
            username={session?.user?.username}
          />
        </div>
      )}
      {suggestions.map((profile, i) => (
        <Story key={i} imgurl={profile.avatar} username={profile.username} />
      ))}
    </div>
  )
}

export default Stories
