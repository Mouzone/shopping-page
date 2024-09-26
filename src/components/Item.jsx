import {useLoaderData} from "react-router-dom";
import {getItem} from "../helper.js";

export default function Item() {
    const { item } = useLoaderData()
    return (
        <div className="h-72">
            {item.title}
        </div>
    )
}

export async function loader({ params }) {
    const item = await getItem(parseInt(params.itemId))
    if (!item) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        })
    }
    return { item }
}