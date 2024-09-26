import {useLoaderData} from "react-router-dom";
import {getItem} from "../helper.js";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import {formatPrice} from "../helper.js";

export default function Item() {
    const { item } = useLoaderData()
    return (
        <div className="flex p-32 mt-auto gap-20 items-center">
            <img src={item.image} alt={item.title} className="w-72"/>
            <div className="flex flex-col gap-3">
                <h1 className="text-3xl"> {item.title} </h1>
                <StarRating rating={item.rating.rate} reviews={item.rating.count}/>
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

function StarRating({ rating, reviews }) {
    const totalStars = 5

    const stars = Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1
        if (rating >= starValue) {
            return <FaStar key={index} style={{ color: "black"}}/>
        } else if (rating >= starValue - 0.5) {
            return <FaStarHalfAlt key={index} style={{ color: "black" }}/>
        } else {
            return <FaRegStar key={index} style={{ color:"black" }}/>
        }
    })

    return (
        <div className="flex gap-1 text-lg">
            <h3> {rating} </h3>
            <div className="flex mr-1 mt-1">
                { stars }
            </div>
            <h3> {reviews} ratings </h3>
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