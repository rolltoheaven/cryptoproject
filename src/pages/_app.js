import React from "react";
import Head from "next/head";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import ErrorBoundary from "../components/error-boundary/ErrorBoundary";
import { AuthProvider } from "../context/auth/authContext";
import { AvaxboxProvider } from "../context/avaxbox/avaxboxContext";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Furystaker</title>
        <meta name="title" content="Multi chain staker" />
        <meta
          name="description"
          content="Furystaker is a multi-platform ROI project."
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content="Furystaker is a multi-platform ROI project." />
        <meta
          property="og:description"
          content="Furystaker is a multi-platform ROI project."
        />
        <meta
          property="og:image"
          content=""
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content="Furystaker is a multi-platform ROI project." />
        <meta
          property="twitter:description"
          content="Furystaker is a multi-platform ROI project."
        />
        <meta
          property="twitter:image"
          content=""
        />
      </Head>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: false,
          }}
        >
          <ErrorBoundary>
            <AuthProvider>
              <AvaxboxProvider>
                <Component {...pageProps} />
              </AvaxboxProvider>
            </AuthProvider>
          </ErrorBoundary>
        </ColorModeProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
