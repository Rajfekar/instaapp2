import React from "react"
import Image from "next/image"
import {
  HomeIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid"
import {
  PaperAirplaneIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
} from "@heroicons/react/24/outline"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useRecoilState, useRecoilValue } from "recoil"
import { modalState } from "../atoms/modalAtom"

const Header = () => {
  const { data: session } = useSession()
  const [open, setOpen] = useRecoilState(modalState)
  // const open = useRecoilValue(modalState)
  const router = useRouter()
  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        {/* Left */}
        <div className="relative mt-2  w-24 hidden lg:inline-grid">
          <h1 className="font-bold w-  lg:mt-2 tracking-wider">SocialApp</h1>
        </div>
        <div className="relative mt-2  w-10  lg:hidden flex-shrink-0 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            />
          </svg>
        </div>

        <div className="max-w-xs">
          {/* Middle - Search Input Area */}
          <div className="relative mt-1 p-3 rounded-md ">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-8 w-8 text-gray-500" />
            </div>
            <input
              type="text"
              name=""
              id=""
              placeholder="Search"
              className="bg-gray-50 block w-full pl-12 sm:text-sm  focus:ring-black focus-border-black h-8 rounded-md "
            />
          </div>
        </div>
        {/* Right */}

        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="navBtn" onClick={() => router.push("/")} />
          {/* <Bars3Icon className="h-7 w-10 md:hidden cursor-pointer " /> */}
          {session && (
            <PlusCircleIcon
              className="h-7 w-10 md:hidden cursor-pointer"
              onClick={() => setOpen(true)}
            />
          )}

          {session ? (
            <>
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn -rotate-45" />
                <div className="absolute -top-1 -right-2 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white text-xs w-5">
                  3
                </div>
              </div>
              <PlusCircleIcon
                className="navBtn"
                onClick={() => setOpen(true)}
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <img
                src={session?.user?.image}
                alt="profile-pic"
                className="h-10 rounded-full cursor-pointer navBtn"
              />

              <button type="button" onClick={signOut}>
                Logout
              </button>
            </>
          ) : (
            <button type="button" onClick={signIn}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
