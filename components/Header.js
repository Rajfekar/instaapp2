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
          <Image
            className="cursor-pointer"
            onClick={() => router.push("/")}
            src="/Instagram_logo.png"
            width={250}
            height={250}
            alt={"instagram"}
            property={"hello"}
          />
        </div>
        <div className="relative mt-2  w-10  lg:hidden flex-shrink-0 cursor-pointer">
          <Image
            className="cursor-pointer"
            onClick={() => router.push("/")}
            src="/insta-logo.png"
            width={250}
            height={250}
            alt={"instagram"}
          />
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
          <PlusCircleIcon
            className="h-7 w-10 md:hidden cursor-pointer"
            onClick={() => setOpen(true)}
          />

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
