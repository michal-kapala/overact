import Head from 'next/head'
import { useSession } from "next-auth/react"
import React, { useState } from 'react'
import { tabs } from '../src/types/navigation'
import { Layout } from '../src/components/global/Layout'
import MobileSidebar from '../src/components/dashboard/MobileSidebar'
import DesktopSidebar from '../src/components/dashboard/DesktopSidebar'
import TopBar from '../src/components/dashboard/TopBar'
import DashboardPanel from '../src/components/dashboard/panels/DashboardPanel'
import OrderPanel from '../src/components/dashboard/panels/OrderPanel'
import ProductPanel from '../src/components/dashboard/panels/ProductPanel'
import CategoryPanel from '../src/components/dashboard/panels/CategoryPanel'
import ColorPanel from '../src/components/dashboard/panels/ColorPanel'
import SizePanel from '../src/components/dashboard/panels/SizePanel'
import { useCategories } from '../src/graphql/queries/Category/categories'
import { useProducts } from '../src/graphql/queries/Product/products'
import type { OveractUser } from '../src/types/OveractUser'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createClient } from '@supabase/supabase-js';
import { useColors } from '../src/graphql/queries/Color/colors'
import { useSizes } from '../src/graphql/queries/Size/sizes'

/**
 * Supabase Client data fetched from the server.
 */
interface DashboardProps {
  apiKey: string;
  url: string;
}

/**
 * Returns Supabase Client data from the server.
 * @param ctx Call context.
 * @returns `Promise<DashboardProps>`
 */
export function getStaticProps(ctx: any) {
  return {
    props: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      apiKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    } as DashboardProps, 
  }
}

export default function DashboardPage({ url, apiKey }: DashboardProps) {
  // auth
  const { data: session, status } = useSession()

  // dashboard-scoped supabase client
  const supabaseClient = createClient(url, apiKey);
  
  // product categories
  const { isLoading: isCategoriesLoading, data: categories } = useCategories();

  // colors
  const { isLoading: isColorsLoading, data: colors } = useColors();

  // sizes
  const { isLoading: isSizesLoading, data: sizes } = useSizes();

  // products
  const {isLoading: isProductsLoading, data: products} = useProducts();

  // UI states
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs.dashboard);
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);
  const [addColorModalOpen, setAddColorModalOpen] = useState(false);
  const [addSizeModalOpen, setAddSizeModalOpen] = useState(false);

  if(isCategoriesLoading || isProductsLoading || isColorsLoading || isSizesLoading) {
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
                    categories={categories?.categories ?? []}
                    colors={colors?.colors ?? []}
                    sizes={sizes?.sizes ?? [] }
                    modalOpen={addProductModalOpen}
                    setModalOpen={setAddProductModalOpen}
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
                  />
                  :
                  <div/>
              }
              {
                activeTab == tabs.sizes
                  ?
                  <SizePanel
                    categories={categories?.categories ?? []}
                    modalOpen={addSizeModalOpen}
                    setModalOpen={setAddSizeModalOpen}
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
