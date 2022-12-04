import Head from 'next/head'
import { useSession, signOut } from "next-auth/react"
import React, { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  ChartSquareBarIcon,
  MenuAlt2Icon,
  ShoppingBagIcon,
  TableIcon,
  TagIcon,
  XIcon,
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import { Layout } from '../src/components/global/Layout'

const TAB = {
  dashboard: "Dashboard",
  products: "Products",
  categories: "Categories",
  orders: "Orders"
};

const navigation = [
  { name: TAB.dashboard, icon: ChartSquareBarIcon },
  { name: TAB.orders, icon: TableIcon },
  { name: TAB.products, icon: ShoppingBagIcon },
  { name: TAB.categories, icon: TagIcon },
];

export default function Example() {
  // auth
  const { data: session, status } = useSession()

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(TAB.dashboard);

  if(status === "authenticated" && session.user?.role === "ADMIN")
  {
    return (
      <>
        <div>
          <Head>
            <title>Dashboard | Overact</title>
          </Head>
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>
  
              <div className="fixed inset-0 flex z-40">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                          type="button"
                          className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <span className="sr-only">Close sidebar</span>
                          <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 flex items-center px-4">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="mt-5 flex-1 h-0 overflow-y-auto">
                      <nav className="px-2 space-y-1">
                        {navigation.map((item) => (
                          <button
                            type="button"
                            key={item.name}
                            onClick={() => {setActiveTab(item.name); console.info(item.name);}}
                            className={
                              activeTab == item.name
                                ? 'bg-gray-900 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
                              }
                          >
                            <item.icon
                              className={
                                activeTab == item.name
                                ? 'text-gray-300 mr-4 flex-shrink-0 h-6 w-6'
                                : 'text-gray-400 group-hover:text-gray-300 mr-4 flex-shrink-0 h-6 w-6'
                              }
                              aria-hidden="true"
                            />
                            {item.name}
                          </button>
                        ))}
                      </nav>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
                <div className="flex-shrink-0 w-14" aria-hidden="true">
                  {/* Dummy element to force sidebar to shrink to fit close icon */}
                </div>
              </div>
            </Dialog>
          </Transition.Root>
  
          {/* Static sidebar for desktop */}
          <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
              <div className="flex justify-center items-center h-16 flex-shrink-0 px-4 bg-gray-900">
                <img
                  className="h-8 w-auto"
                  src="/overact.png"
                  alt="Overact"
                />
              </div>
              <div className="flex-1 flex flex-col overflow-y-auto">
                <nav className="flex-1 px-2 py-4 space-y-1">
                  {navigation.map((item) => (
                    <button
                      type="button"
                      key={item.name}
                      onClick={() => {setActiveTab(item.name); console.info(item.name);}}
                      className={
                        activeTab == item.name
                        ? 'bg-gray-900 text-white group transition flex items-center px-2 py-2 text-sm font-medium rounded-md w-full' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white group transition flex items-center px-2 py-2 text-sm font-medium rounded-md w-full'
                      }
                    >
                      <item.icon
                          className={
                            activeTab == item.name
                            ? 'text-gray-300 mr-3 flex-shrink-0 h-6 w-6'
                            : 'text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6'
                          }
                          aria-hidden="true"
                      />
                      {item.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
          <div className="md:pl-64 flex flex-col">
            <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-gray-900 shadow">
              <button
                type="button"
                className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex-1 px-4 flex justify-between">
                <div className="flex-1 flex ">
                  <form className="w-full flex md:ml-0" action="#" method="GET">
                    <label htmlFor="search-field" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                      <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <input
                        id="search-field"
                        className="block w-full h-full pl-8 pr-3 py-2 border-transparent bg-gray-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                        placeholder="Search"
                        type="search"
                        name="search"
                      />
                    </div>
                  </form>
                </div>
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative inline-block">
                    <>
                    {/* User dropdown Toggle Button */}
                    <Menu.Button className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-5 text-sm rounded border-gray-500 bg-gray-700 text-gray-300 shadow-sm hover:text-gray-200 hover:bg-gray-600 active:shadow-none">
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
                  </Menu>
                </div>
              </div>
            </div>
  
            <main className="flex-1">
              {/*Overview*/}
              {
                activeTab == TAB.dashboard 
                ?
                <div className="py-6">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <h1 className="text-2xl font-semibold text-gray-300">Dashboard</h1>
                  </div>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    {/* Replace with your content */}
                    <div className="py-4">
                      <div className="border-4 border-dashed border-gray-300 rounded-lg h-96" />
                    </div>
                    {/* /End replace */}
                  </div>
                </div>
                :
                <div/>
              }
  
              {/*Orders*/}
              {
                activeTab == TAB.orders 
                ?
                <div className="py-6">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <h1 className="text-2xl font-semibold text-gray-300">Orders</h1>
                  </div>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    {/* Replace with your content */}
                    <div className="py-4">
                      <div className="border-4 border-dashed border-gray-300 rounded-lg h-96" />
                    </div>
                    {/* /End replace */}
                  </div>
                </div>
                :
                <div/>
              }
              
              {/*Products*/}
              {
                activeTab == TAB.products 
                ?
                <div className="py-6">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <h1 className="text-2xl font-semibold text-gray-300">Products</h1>
                  </div>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    {/* Replace with your content */}
                    <div className="py-4">
                      <div className="border-4 border-dashed border-gray-300 rounded-lg h-96" />
                    </div>
                    {/* /End replace */}
                  </div>
                </div>
                :
                <div/>
              }
  
              {/*Categories*/}
              {
                activeTab == TAB.categories 
                ?
                <div className="py-6">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <h1 className="text-2xl font-semibold text-gray-300">Categories</h1>
                  </div>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    {/* Replace with your content */}
                    <div className="py-4">
                      <div className="border-4 border-dashed border-gray-300 rounded-lg h-96" />
                    </div>
                    {/* /End replace */}
                  </div>
                </div>
                :
                <div/>
              }
            </main>
          </div>
        </div>
      </>
    );
  }
  if(status === "unauthenticated" || (status === "authenticated" && session.user?.role == "USER")) {
    return(
      <Layout>
        <Head>
          <title>Dashboard | Overact</title>
        </Head>
        <div className="text-center py-64 sm:py-72 md:py-80 md:my-2">
          <h1 className="text-4xl"><b>401 Unauthorized</b></h1>
          <h1 className="text-2xl pt-4">Please login to proceed.</h1>
        </div>
      </Layout>
    );
  }
}
