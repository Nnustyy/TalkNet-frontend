import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/store.ts";
import App from "./App.tsx";
import { Provider } from "./provider.tsx";
// import "@/styles/globals.css";
import './styles/globals.css';
import ThemeProvider from "./components/themeProvider/index.tsx";

const router = createBrowserRouter([
  {path:'/auth', element: <h1>authorization</h1>},
  {path:'/', element:<h1>Layout</h1>}
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <Provider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

