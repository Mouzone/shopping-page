import {useLoaderData} from "react-router-dom";
import {getItem} from "../helper.js";
import {formatPrice} from "../helper.js";
import StarRating from "./StarRating.jsx";

export default function Item() {
    const { item } = useLoaderData()
    return (
        <div className="flex p-32 mt-auto gap-20 items-center">
            <img src={item.image} alt={item.title} className="w-72"/>
            <div className="flex flex-col gap-3">
                <h1 className="text-3xl"> {item.title} </h1>
                <div className="flex gap-1 text-lg">
                    <h3> {item.rating.rate} </h3>
                    <StarRating rating={item.rating.rate} color="black"/>
                    <h3> {item.rating.count} ratings </h3>
                </div>
                <h2 className="-mt-2 text-lg font-bold"> ${formatPrice(item.price)} </h2>
                <p> {item.description} </p>
                <div className="flex gap-3 items-center">
                    <input
                        placeholder="Amt"
                        className="w-12 border-b border-black text-center"
                    />
                    <button className="bg-black text-white rounded p-2"> Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export async function loader({params}) {
    const item = await getItem(parseInt(params.itemId))
    if (!item) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        })
    }
    return { item }
}