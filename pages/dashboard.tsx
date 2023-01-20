import Head from 'next/head'
import React, { useState } from 'react'
import { tabs } from '../src/types/navigation'
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
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'

/**
 * API data fetched from the server.
 */
interface DashboardProps {
  /**
   * GraphQL API URL.
   */
  apiUrl: string;
  /**
   * Base URL to Supabase Storage.
   */
  cdnUrl: string;
  /**
   * Supabase `anon` role API key.
   */
  cdnAnonKey: string;
  /**
   * NextAuth user.
   */
  user: OveractUser;
}

/**
 * Validates admin user session and returns API data from the server.
 * @param ctx Call context.
 * @returns `Promise<DashboardProps>` or a redirection
 */
export async function getServerSideProps(ctx: any) {
  // page protection - redirect to 404 page
  const ses = await unstable_getServerSession(ctx.req, ctx.res, authOptions);
  const user = ses?.user as OveractUser;
  if(!ses || !user || user.role !== 'ADMIN') {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }

  // build API url (client-side apiUrl is /)
  const host = ctx.req.headers['host'];
  const apiUrl = host !== '/'
    // server query
    ? `https://${host}/api/graphql`
    // client query
    : `${host}api/graphql`;

  const cdnUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const cdnAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  return {
    props: {
      apiUrl,
      cdnUrl,
      cdnAnonKey,
      user,
    } as DashboardProps, 
  }
}

export default function DashboardPage({ apiUrl, cdnUrl, cdnAnonKey, user }: DashboardProps) {

  /**
   * Dashboard-scoped Supabase client for storage API access.
   */
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
            username={user.name as string}
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
                  colors={colors?.colors ?? []}
                  isLoading={isColorsLoading}
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
                  sizes={sizes?.sizes ?? []}
                  isLoading={isSizesLoading}
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
