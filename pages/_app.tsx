import "../styles/globals.css";
import type { AppProps } from "next/app";
//import { UserProvider } from "@auth0/nextjs-auth0";
import { Provider } from "react-redux";

import { store } from "../app/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
