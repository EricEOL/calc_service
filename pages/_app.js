import Head from 'next/head';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta property="og:image" content="" key="ogimage" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://calculadora-servico.vercel.app/" />
        <meta property="og:title" content="Calculadora de Serviços" key="ogtitle" />
        <meta property="og:description" content="Descubra quando você estará de serviço novamente de uma forma simples" key="ogdesc" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
