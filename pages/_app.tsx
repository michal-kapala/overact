import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react"
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps<{session: Session;}>) {
  
    return(
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
        </QueryClientProvider>
      </SessionProvider>
    )
}

export default MyApp
