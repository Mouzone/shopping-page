import {formatPrice} from "../helper.js";
import StarRating from "./StarRating.jsx"
import Spinner from "./Spinner.jsx";
import { Link } from "react-router-dom"
import PropTypes from "prop-types";

export default function Grid({ items }) {
    console.log(items)
    return (
            <div className="w-full flex flex-col pt-5">
                {items === null
                    ? ( <div className="mt-[20%]">
                            <Spinner/>
                        </div>
                    )
                    : <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                        {
                            items.map(item =>
                                <Link key={item.id} to={`/collection/${item.id}`} className="block">
                                    <div className="flex flex-col border border-black">
                                        <div className="flex items-center justify-center h-72">
                                            <img className="lg:w-40 md:w-20 sw-10" src={item.image} alt={item.title}/>
                                        </div>
                                        <div className="bg-black text-white p-4">
                                            <div className="flex justify-between">
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

Grid.propTypes = {
    items: PropTypes.arrayOf(PropTypes.exact({
        category: PropTypes.string.isRequired,
        // description is not used in Grid, but in Item
        description: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        // url
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.exact({
            rate: PropTypes.number.isRequired,
            count: PropTypes.number.isRequired,
        }),
        title: PropTypes.string.isRequired,
    }))
}

