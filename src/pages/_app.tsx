import { type AppType } from "next/app";
import { type Session } from "next-auth";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { SideBar } from "~/components/SideBar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Social Network</title>
        <meta
          name="description"
          content="A social network app by Andrey Koshelev"
        />
        <link rel="icon" href="/favicon.ico?v=2" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div
        className={`container mx-auto flex min-h-screen min-w-full flex-grow  bg-gradient-to-b from-[#222] to-[#333] font-poppins text-white`}
      >
        <SideBar />
        <Component {...pageProps} />
        <ToastContainer />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
