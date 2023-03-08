import React from "react"
import {
  ClientSafeProvider,
  getProviders,
  signIn as SignIntoProvider,
} from "next-auth/react"
// import { BuiltInProviderType } from "next-auth/providers"
import Header from "../../components/Header"

// browser...
const signIn = ({ providers }) => {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center min-h-screen py-2  -mt-56 px-14 text-center ">
        <h1 className="font-bold w-  lg:mt-2 tracking-wider">SocialApp</h1>
        <div className="mt-40">
          {Object.values(providers).map((provider, i) => (
            <div key={i}>
              <button
                className="p-3 bg-blue-500 rounded-lg text-white"
                onClick={() =>
                  SignIntoProvider(provider.id, { callbackUrl: "/" })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
// server side rendering
export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}
export default signIn
