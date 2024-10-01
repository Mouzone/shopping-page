import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './components/App.jsx'
import Homepage from './components/Homepage.jsx'
import Collection from './components/Collection.jsx'
import Favorites from "./components/Favorites.jsx";
import Item, { loader as itemLoader } from './components/Item.jsx'
import Checkout from "./components/Checkout.jsx";

import './index.css'
import ErrorPage from "./components/ErrorPage.jsx";
// todo: make website responsive
// change columns for grid and make margins more responsive
// change img widths for screen width
// todo: Refactor
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                errorElement: <ErrorPage/>,
                children: [
                    {
                        index: true,
                        element: <Homepage/>
                    },
                    {
                        path: "home",
                        element: <Homepage/>,
                    },
                    {
                        path: "collection",
                        element: <Collection/>,
                    },
                    {
                        path: "favorites",
                        element: <Favorites/>,
                    },
                    {
                        path: "checkout",
                        element: <Checkout/>,
                    },
                    {
                        path:"collection/:itemId",
                        element: <Item/>,
                        loader: itemLoader,
                    }
                ]
            }
        ],
    },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
