import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import React, { Fragment, useState, FC, ReactNode } from "react";
import { Menu, Transition } from "@headlessui/react";

export const NavBar: FC<{children?: ReactNode}> = () => {
  // auth session
  const { data: session, status } = useSession()

  // dropdown open
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // search bar text
  const [searchValue, setSearchValue] = useState("");

  // searchbar input updates
  function onSearchbarChange(event: any) {
    setSearchValue(event.target.value);
  }

  return(
    <>
      {/* Page Header */}
      <header id="page-header" className="sticky backdrop-blur-lg bg-white/40 z-10 top-0 flex flex-none items-center bg-white shadow-sm z-1">
        <div className="container xl:max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between py-4">
            {/* Left Section */}
            <div className="flex w-full mx-auto items-center">
              {/* Logo */}
              <Link href="/">
                <a className="group inline-flex items-center text-center space-x-2 font-bold text-lg tracking-wide text-gray-700 hover:text-blue-600 active:text-gray-700">
                  <img src="/overact.png" alt='Overact logo' className="flex scale-75"/>
                </a>
              </Link>
              {/* Search bar */}
              <div className="flex w-full items-center justify-center px-2 lg:px-16">
                <div className="flex flex-row my-4 mx-auto xl:ml-6 border-2 rounded border-slate-300 p-1 xl:min-w-full text-sm items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-6 h-6 p-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <input 
                    type="search" 
                    value={searchValue}
                    placeholder="Search"
                    onChange={onSearchbarChange}
                    className="w-full block appearance-none rounded-lg border-none outline-none focus:outline-none bg-transparent text-base text-slate-900 transition placeholder:text-slate-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            {/* END Left Section */}

            {/* Right Section */}
            <div className="flex items-center space-x-1 lg:space-x-5">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex lg:items-center lg:space-x-2">
                <Link href="/api/graphql">
                  <a className="text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded text-gray-600 border border-transparent hover:text-blue-500 hover:bg-blue-50 hover:border-blue-50 active:bg-blue-100 active:border-blue-100">
                    <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="opacity-50 hi-solid hi-home inline-block w-5 h-5"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                    <span>Home</span>
                  </a>
                </Link>
                <Link href="/">
                  <a className="text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded text-gray-600 border border-transparent hover:text-blue-500 hover:bg-blue-50 hover:border-blue-50 active:bg-blue-100 active:border-blue-100">
                    <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="opacity-50 hi-solid hi-user-circle inline-block w-5 h-5"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" /></svg>
                    <span>Profile</span>
                  </a>
                </Link>
                <Link href="/">
                  <a className="text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded text-gray-600 border border-transparent hover:text-blue-500 hover:bg-blue-50 hover:border-blue-50 active:bg-blue-100 active:border-blue-100">
                    <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="opacity-50 hi-solid hi-briefcase inline-block w-5 h-5"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" /><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" /></svg>
                    <span>Projects</span>
                  </a>
                </Link>
                <Link href="/">
                  <a href="#" className="text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded text-gray-600 border border-transparent hover:text-blue-500 hover:bg-blue-50 hover:border-blue-50 active:bg-blue-100 active:border-blue-100">
                    <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="opacity-50 hi-solid hi-cog inline-block w-5 h-5"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
                    <span>Settings</span>
                  </a>
                </Link>
              </nav>
              {/* END Desktop Navigation */}

              <Menu as="div" className="relative inline-block">
                {/* User Dropdown */}
                {
                  status === "authenticated"
                    ?
                    (
                      <>
                        {/* User dropdown Toggle Button */}
                        <Menu.Button className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-5 text-sm rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none">
                          <span className="truncate">{session.user?.name}</span>
                          <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="opacity-50 hi-solid hi-chevron-down inline-block w-5 h-5"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </Menu.Button>
                        {/* END Dropdown Toggle Button */}

                        {/* Dropdown */}
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-150"
                          enterFrom="transform opacity-0 scale-75"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-100"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-75"
                        >
                          <Menu.Items className="absolute right-0 origin-top-right mt-2 w-48 shadow-xl rounded z-1">
                            <div className="bg-white ring-1 ring-black ring-opacity-5 rounded divide-y divide-gray-100">
                              <div className="p-2 space-y-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="#"
                                      className={`flex items-center space-x-2 rounded py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-700 ${
                                        active ? "text-gray-700 bg-gray-100" : "text-gray-600 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:bg-gray-100 focus:text-gray-700"
                                      }`}
                                    >
                                      <svg className="hi-solid hi-user-circle inline-block w-5 h-5 opacity-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" /></svg>
                                      <span>Profile</span>
                                    </a>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="#"
                                      className={`flex items-center space-x-2 rounded py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-700 ${
                                        active ? "text-gray-700 bg-gray-100" : "text-gray-600 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:bg-gray-100 focus:text-gray-700"
                                      }`}
                                    >
                                      <svg className="hi-solid hi-inbox inline-block w-5 h-5 opacity-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd" /></svg>
                                      <span>Inbox</span>
                                    </a>
                                  )}
                                </Menu.Item>
                              </div>
                              <div className="p-2 space-y-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      className={`flex items-center space-x-2 rounded py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-700 ${
                                        active ? "text-gray-700 bg-gray-100" : "text-gray-600 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:bg-gray-100 focus:text-gray-700"
                                      }`}
                                    >
                                      <svg className="hi-solid hi-cog inline-block w-5 h-5 opacity-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
                                      <span>Settings</span>
                                    </a>
                                  )}
                                </Menu.Item>
                              </div>
                              <div className="p-2 space-y-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => signOut()}
                                      className={`flex items-center space-x-2 rounded py-2 px-3 text-sm font-medium w-full text-gray-600 hover:bg-gray-100 hover:text-gray-700 ${
                                        active ? "text-gray-700 bg-gray-100" : "text-gray-600 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:bg-gray-100 focus:text-gray-700"
                                      }`}
                                    >
                                      <svg className="hi-solid hi-lock-closed inline-block w-5 h-5 opacity-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>  
                                      <span>Sign out</span>
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            </div>
                          </Menu.Items>
                        </Transition>
                        {/* END Dropdown */}
                      </>
                    )
                    :
                    (
                      <>
                        {/* Login dropdown Toggle Button */}
                        <Menu.Button className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-5 text-sm rounded border-gray-300 bg-blue-500 text-gray-50 shadow-sm hover:text-gray-800 hover:bg-blue-400 hover:border-gray-300 hover:shadow active:bg-blue-400 active:border-white active:shadow-none">
                          <span className="truncate">Login</span>
                          <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="opacity-50 hi-solid hi-chevron-down inline-block w-5 h-5"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </Menu.Button>
                        {/* END Dropdown Toggle Button */}

                        {/* Dropdown */}
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-150"
                          enterFrom="transform opacity-0 scale-75"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-100"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-75"
                        >
                          <Menu.Items className="absolute right-0 origin-top-right mt-2 w-48 shadow-xl rounded z-1">
                            <div className="bg-white ring-1 ring-black ring-opacity-5 rounded divide-y divide-gray-100">
                              <div className="p-2 space-y-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => signIn('github')}
                                      className={`flex items-center space-x-2 rounded py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-700 w-full ${
                                        active ? "text-gray-700 bg-gray-100" : "text-gray-600 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:bg-gray-100 focus:text-gray-700"
                                      }`}
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                      <span>Github</span>
                                    </button>
                                  )}
                                </Menu.Item>
                                
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => signIn('google')}
                                      className={`flex items-center space-x-2 rounded py-2 px-3 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-700 w-full ${
                                        active ? "text-gray-700 bg-gray-100" : "text-gray-600 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:bg-gray-100 focus:text-gray-700"
                                      }`}
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16"> <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/> </svg> 
                                      <span>Google</span>
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            </div>
                          </Menu.Items>
                        </Transition>
                        {/* END Dropdown */}
                      </>
                    )
                }
              </Menu>

              {/* Toggle Mobile Navigation */}
              <div className="lg:hidden">
                <button
                  type="button"
                  className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-6 rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none"
                  onClick={() => setMobileNavOpen(!mobileNavOpen)}
                >
                  <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="hi-solid hi-menu inline-block w-5 h-5"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                </button>
              </div>
              {/* END Toggle Mobile Navigation */}
            </div>
            {/* END Right Section */}
          </div>

          {/* Mobile Navigation */}
          <div
            className={`lg:hidden ${
              mobileNavOpen ? "" : "hidden"
            }`}
          >
            <nav className="flex flex-col space-y-2 py-4 border-t">
              <a href="#" className="text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded border border-blue-50 bg-blue-50 text-blue-500">
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="opacity-50 hi-solid hi-home inline-block w-5 h-5"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                <span>Home</span>
              </a>
              <a href="#" className="text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded text-gray-600 border border-transparent hover:text-blue-500 hover:bg-blue-50 hover:border-blue-50 active:bg-blue-100 active:border-blue-100">
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="opacity-50 hi-solid hi-user-circle inline-block w-5 h-5"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" /></svg>
                <span>Profile</span>
              </a>
              <a href="#" className="text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded text-gray-600 border border-transparent hover:text-blue-500 hover:bg-blue-50 hover:border-blue-50 active:bg-blue-100 active:border-blue-100">
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="opacity-50 hi-solid hi-briefcase inline-block w-5 h-5"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" /><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" /></svg>
                <span>Projects</span>
              </a>
              <a href="#" className="text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded text-gray-600 border border-transparent hover:text-blue-500 hover:bg-blue-50 hover:border-blue-50 active:bg-blue-100 active:border-blue-100">
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="opacity-50 hi-solid hi-cog inline-block w-5 h-5"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
                <span>Settings</span>
              </a>
            </nav>
          </div>
          {/* END Mobile Navigation */}
        </div>
      </header>
      {/* END Page Header */}
    </>
  );
}
