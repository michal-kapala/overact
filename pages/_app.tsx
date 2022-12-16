import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react"
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps<{session: Session;}>) {
  
  return(
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
      </SessionProvider>
    </QueryClientProvider>
  )
}

export default MyApp
