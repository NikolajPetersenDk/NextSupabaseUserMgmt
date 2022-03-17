import Head from 'next/head'
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>SB User Management</title>
        <link rel="icon" href="favico.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  ) 
}

export default MyApp
