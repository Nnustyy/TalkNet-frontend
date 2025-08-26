import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/store.ts";
import App from "./App.tsx";
import { Provider } from "./provider.tsx";
// import "@/styles/globals.css";
import './styles/globals.css';
import ThemeProvider from "./components/themeProvider/index.tsx";
import Auth from "./pages/auth/index.tsx";
import Layout from "./components/layout/index.tsx";
import Posts from "./pages/posts/index.tsx";
import CurrentPost from "./pages/current-post/index.tsx";
import UserProfile from "./pages/user-profile/index.tsx";
import Followers from "./pages/followers/index.tsx";
import Following from "./pages/following/index.tsx";
import AuthGuard from "./features/user/AuthGuard.tsx";

const router = createBrowserRouter([
  {path:'/auth', element: <Auth/>},
  {path:'/',
  element:<Layout/>,
  children:[
    {
      path:'',
      element:<Posts/>
    },
    {
      path:'posts/:id',
      element:<CurrentPost/>
    },
    {
      path:'users/:id',
      element:<UserProfile/>
    },
    {
      path:'followers',
      element:<Followers/>
    },
    {
      path:'following',
      element:<Following/>
    },
  ]
}
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
      <ReduxProvider store={store}>
        {/* <Provider> */}
          <ThemeProvider>
            <AuthGuard>
            <RouterProvider router={router} />
            </AuthGuard>
          </ThemeProvider>
        {/* </Provider> */}
      </ReduxProvider>
    {/* </BrowserRouter> */}
  </React.StrictMode>,
);

