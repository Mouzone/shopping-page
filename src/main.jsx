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
// todo: make website responsive
// change columns for grid and make margins more responsive
// change img widths for screen width
// todo: take items out and use it in context
// todo: add error pages
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
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
                // todo: add a base page for item/ that redirects to collection
                // todo: have spinner while :itemId loads
                path:"item/:itemId",
                element: <Item/>,
                loader: itemLoader,
            }
        ],
    },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
