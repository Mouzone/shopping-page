import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './components/App.jsx'
import Homepage from './components/Homepage.jsx'
import Collection from './components/Collection.jsx'
import Item, { loader as itemLoader } from './components/Item.jsx'

import './index.css'

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
                // add a base page for item/ that redirects to collection
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
