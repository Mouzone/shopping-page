import {useLoaderData} from "react-router-dom";
import {getItem} from "../helper.js";
import {formatPrice} from "../helper.js";
import StarRating from "./StarRating.jsx";
import {useState} from "react";
import {useParams} from "./App.jsx";

export default function Item() {
    const { liked, setLiked } = useParams()
    // todo: if in liked set it active when page loads
    //
    // const onClick = () => {
    //     setLiked
    // }
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
                    <Favorite setLiked={setLiked}/>
                </div>
            </div>
        </div>
    )
}

// todo: set onClick function add to liked, which should update navbar
// make sure it doesn't rerender page
function Favorite({liked, setLiked}) {
    const [ fillColor, setFillColor ] = useState("black")
    const onClick = () => {
        setFillColor(prevColor => prevColor === "black" ? "red" : "black")
    }
    return (
        <button className="flex items-center gap-1 border p-2 rounded border-black text-lg" onClick={onClick}>
            Favorite
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6" fill={fillColor}>
                <title>heart</title>
                <path
                    d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
            </svg>
        </button>
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