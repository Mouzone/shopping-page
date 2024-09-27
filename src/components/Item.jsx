import {useLoaderData} from "react-router-dom";
import {getItem} from "../helper.js";
import {formatPrice} from "../helper.js";
import StarRating from "./StarRating.jsx";
import {useParams} from "./App.jsx";
import FavoriteButton from "./FavoriteButton.jsx"

export default function Item() {
    const { liked, setLiked } = useParams()
    const { item } = useLoaderData()
    return (
        <div className="flex p-32 mt-auto gap-5 items-center">
            <img src={item.image} alt={item.title} className="w-72 border border-black p-4"/>
            <div className="flex flex-col gap-3">
                <div className="flex">
                    <h1 className="text-3xl border border-black p-4 w-auto"> {item.title} </h1>
                </div>
                <p className="bg-black text-white text-lg p-4"> {item.description} </p>
                <div className="flex gap-2">
                    <h2 className="text-2xl font-bold border border-black p-4"> ${formatPrice(item.price)} </h2>
                    <div className="flex gap-1 text-2xl border border-black p-4">
                        <h3> {item.rating.rate} </h3>
                        <StarRating rating={item.rating.rate} color="black"/>
                        <h3> {item.rating.count} ratings </h3>
                    </div>
                </div>
                <div className="flex gap-3 items-center text-lg">
                    <input
                        placeholder="Amt"
                        className="w-12 border-b border-black text-center"
                    />
                    <button className="bg-black text-white rounded p-2"> Add to Cart</button>
                    <FavoriteButton liked={liked} setLiked={setLiked} id={item.id}/>
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