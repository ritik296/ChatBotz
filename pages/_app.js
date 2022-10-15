import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  
  return (
    <>
      <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
          <link href={`https://fonts.googleapis.com/css2?family=Ubuntu+Mono&display=swap`} rel="stylesheet"/>
          <link href={"https://fonts.googleapis.com/css2?family=Concert+One&family=Ubuntu+Mono&display=swap"} rel="stylesheet"/> 
      </Head>
      <Component {...pageProps} />
    </>
  ) 
}

export default MyApp



// font-family: 'Concert One', cursive;

// font-family: 'Ubuntu Mono', monospace;
