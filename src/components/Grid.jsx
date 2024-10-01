import {formatPrice} from "../helper.js";
import StarRating from "./StarRating.jsx"
import Spinner from "./Spinner.jsx";
import { Link } from "react-router-dom"

export default function Grid({ items }) {
    return (
            <div className="w-full flex flex-col pt-5 items-center justify-items-center">
                {items === null
                    ? ( <div className="mt-[20%]">
                            <Spinner/>
                        </div>
                    )
                    : <div className="grid w-full grid-cols-4 gap-5">
                        {
                            items.map(item =>
                                <Link key={item.id} to={`/collection/${item.id}`} className="block">
                                    <div className="flex flex-col h-92 border border-black">
                                        <div className="flex items-center justify-center h-72">
                                            <img className="w-40" src={item.image} alt={item.title}/>
                                        </div>
                                        <div className="bg-black text-white p-4">
                                            <div className="flex justify-between mt-auto">
                                                <h2 className="w-36 truncate ..."> {item.title} </h2>
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



