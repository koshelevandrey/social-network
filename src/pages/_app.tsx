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
      </Head>
      <div
        className={`container mx-auto flex min-h-screen min-w-full flex-grow bg-[#003366bf] font-poppins text-white`}
      >
        <SideBar />
        <Component {...pageProps} />
        <ToastContainer />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
