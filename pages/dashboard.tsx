import Head from 'next/head'
import { useSession } from "next-auth/react"
import React, { useState } from 'react'
import { tabs } from '../src/types/navigation'
import Layout from '../src/components/global/Layout'
import MobileSidebar from '../src/components/dashboard/MobileSidebar'
import DesktopSidebar from '../src/components/dashboard/DesktopSidebar'
import TopBar from '../src/components/dashboard/TopBar'
import DashboardPanel from '../src/components/dashboard/panels/DashboardPanel'
import OrderPanel from '../src/components/dashboard/panels/OrderPanel'
import ProductPanel from '../src/components/dashboard/panels/ProductPanel'
import CategoryPanel from '../src/components/dashboard/panels/CategoryPanel'
import ColorPanel from '../src/components/dashboard/panels/ColorPanel'
import SizePanel from '../src/components/dashboard/panels/SizePanel'
import type { OveractUser } from '../src/types/OveractUser'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createClient } from '@supabase/supabase-js';
import { useColors } from '../src/graphql/queries/Color/colors'
import { useSizes } from '../src/graphql/queries/Size/sizes'

/**
 * API data fetched from the server.
 */
interface DashboardProps {
  cdnAnonKey: string;
  cdnUrl: string;
  apiUrl: string;
}

/**
 * Returns API data from the server.
 * @param ctx Call context.
 * @returns `Promise<DashboardProps>`
 */
export function getServerSideProps(ctx: any) {
  // build API url (client-side appUrl is /)
  const host = ctx.req.headers['host'];
  const apiUrl = host !== '/'
    // server query
    ? `http://${host}/api/graphql`
    // client query
    : `${host}api/graphql`;

  return {
    props: {
      cdnUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      cdnAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      // next app base URL passed in 'Host' header
      apiUrl,
    } as DashboardProps, 
  }
}

export default function DashboardPage({ cdnUrl, cdnAnonKey, apiUrl }: DashboardProps) {
  // auth
  const { data: session, status } = useSession()

  // dashboard-scoped supabase client
  const supabaseClient = createClient(cdnUrl, cdnAnonKey);

  // colors
  const { isLoading: isColorsLoading, data: colors } = useColors(apiUrl);

  // sizes
  const { isLoading: isSizesLoading, data: sizes } = useSizes(apiUrl);

  // UI states
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs.dashboard);
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);
  const [addColorModalOpen, setAddColorModalOpen] = useState(false);
  const [addSizeModalOpen, setAddSizeModalOpen] = useState(false);

  if(isColorsLoading || isSizesLoading) {
    return (
      <>
        <Head>
          <title>Dashboard | Overact</title>
        </Head>
        <div>
          Data loading...
        </div>
      </>
    )
  }

  // Cast user data to include role injected in session() callback
  var userCast = session?.user as OveractUser;

  if(status === "authenticated" && userCast.role === "ADMIN")
  {
    return (
      <SessionContextProvider
        supabaseClient={supabaseClient}
      >
        <div>
          <Head>
            <title>Dashboard | Overact</title>
          </Head>

          {/* Closeable sidebar for mobile */}
          <MobileSidebar 
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Static sidebar for desktop */}
          <DesktopSidebar 
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Top bar and a panel */}
          <div className="md:pl-64 flex flex-col">

            <TopBar
              username={session.user?.name as string}
              setSidebarOpen={setSidebarOpen}
            />
  
            {/* Panels */}
            <main className="flex-1">
              { activeTab == tabs.dashboard ? <DashboardPanel /> : <div/> }
              { activeTab == tabs.orders ? <OrderPanel /> : <div/> }
              {
                activeTab == tabs.products
                  ?
                  <ProductPanel 
                    colors={colors?.colors ?? []}
                    sizes={sizes?.sizes ?? []}
                    modalOpen={addProductModalOpen}
                    setModalOpen={setAddProductModalOpen}
                    storageUrl={cdnUrl}
                    apiUrl={apiUrl}
                  />
                  :
                  <div/>
              }
              {
                activeTab == tabs.categories
                  ?
                  <CategoryPanel
                    modalOpen={addCategoryModalOpen}
                    setModalOpen={setAddCategoryModalOpen}
                    apiUrl={apiUrl}
                  />
                  :
                  <div/>
              }
              {
                activeTab == tabs.colors
                  ?
                  <ColorPanel
                    modalOpen={addColorModalOpen}
                    setModalOpen={setAddColorModalOpen}
                    apiUrl={apiUrl}
                  />
                  :
                  <div/>
              }
              {
                activeTab == tabs.sizes
                  ?
                  <SizePanel
                    modalOpen={addSizeModalOpen}
                    setModalOpen={setAddSizeModalOpen}
                    apiUrl={apiUrl}
                  />
                  :
                  <div/>
              }
            </main>
          </div>
        </div>
      </SessionContextProvider>
    );
  }
  if(status === "unauthenticated" || (status === "authenticated" && userCast.role == "USER")) {
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
