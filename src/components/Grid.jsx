import {formatPrice} from "../helper.js";
import StarRating from "./StarRating.jsx"
import Spinner from "./Spinner.jsx";
import { Link } from "react-router-dom"

// todo: move heart to top right with add to cart button
export default function Grid({ items }) {
    return (
            <div className="w-full flex flex-col items-center pt-5">
                {items === null
                    ? <Spinner/>
                    : <div className="grid w-full grid-cols-4 gap-5">
                        {
                            items.map(item =>
                                <Link key={item.id} to={`/item/${item.id}`} className="block">
                                    <div className="flex flex-col h-92 border border-black">
                                        <div className="flex items-center justify-center h-72">
                                            <img className="w-40" src={item.image} alt={item.title}/>
                                        </div>
                                        <div className="bg-black text-white p-4">
                                            <div className="flex justify-between mt-auto">
                                                <h2 className="w-36 truncate ..."> {item.title} </h2>
                                                <button>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 fill-white">
                                                        <title>heart</title>
                                                        <path
                                                            d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="flex justify-between">
                                                <StarRating rating={item.rating.rate} color="white"/>
                                                <h2 className="font-bold">
                                                    ${formatPrice(item.price)}
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}
                    </div>
                }
            </div>
    )
}

