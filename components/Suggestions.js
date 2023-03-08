import { faker } from "@faker-js/faker"
import React, { useEffect, useState } from "react"

const Suggestions = () => {
  var [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    const suggestion = [...Array(10)].map((val, i) => ({
      // userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      // email: faker.internet.email(),
      avatar: faker.image.avatar(),
      // password: faker.internet.password(),
      // birthdate: faker.date.birthdate(),
      // registeredAt: faker.date.past(),
      company: faker.company.name(),
    }))

    setSuggestions(suggestion)
  }, [])

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>
      {suggestions.map((profile, i) => (
        <div key={i} className={"flex items-center justify-between mt-3"}>
          <img
            src={profile.avatar}
            alt="profile"
            className="w-10 h-10 rounded-full border p-[2px]"
          />
          <div className="flex-1  ml-4">
            <h2 className="font-semibold text-sm">{profile.username}</h2>
            <h3 className="text-xs text-gray-400">
              Works at {profile.company}
            </h3>
          </div>
          <button className="text-blue-400 p-2 font-semibold">Follow</button>
        </div>
      ))}
    </div>
  )
}

export default Suggestions