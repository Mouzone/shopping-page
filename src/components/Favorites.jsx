import {useParams} from "./App.jsx";
import StarRating from "./StarRating.jsx";
import {formatPrice} from "../helper.js";
import Spinner from "./Spinner.jsx";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

export default function Favorites() {
    const { items, liked, setLiked } = useParams()

    function onClick(id) {
        return (e) => {
            e.preventDefault()
            if (liked.find(curr_id => curr_id === id)) {
                setLiked([...liked.filter(curr_id => curr_id !== id)])
            } else{
                setLiked([...liked, id])
            }
        }
    }

    return (
        <>
            <div className="flex p-10 pb-5">
                <h1 className="font-bold text-5xl border border-black p-4 bg-black text-white"> Favorites </h1>
            </div>
            {
                items === null
                    ? (<div className="h-[70vh] w-[100vw] flex items-center justify-center">
                            <Spinner/>
                        </div>
                    )
                    : liked.length === 0
                        ? (<div className="h-[50vh] w-[100vw] flex items-center justify-center">
                                <p className="text-center pt-4 bold text-lg"> Looking Empty... </p>
                            </div>
                        )
                        : <div className="grid grid-cols-3 gap-4 p-10 pt-0 items-center">
                            {
                                liked.map(id => {
                                    return (
                                        <Link key={id} to={`/collection/${id}`} className="block">
                                            <div className="flex flex-col h-92 border border-black">
                                                <div className="flex items-center justify-center h-72 relative">
                                                    <img className="w-40" src={items[id - 1].image} alt={items[id - 1].title}/>
                                                    <FavoriteButton onClick={onClick(id)}/>
                                                </div>
                                                <div className="bg-black text-white p-4">
                                                    <div className="flex justify-between mt-auto">
                                                        <h2 className="w-36 truncate ..."> {items[id - 1].title} </h2>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <StarRating rating={items[id - 1].rating.rate} color="white"/>
                                                        <h2 className="font-bold">
                                                            ${formatPrice(items[id - 1].price)}
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
            }
        </>
    )
}

function FavoriteButton({ onClick }) {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
             className="w-8 fill-red-500 top-0 right-0 absolute m-3"
             onClick={onClick}
        >
            <title>Favorite</title>
            <path
                d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
        </svg>
    )
}

FavoriteButton.propTypes = {
    onClick: PropTypes.func.isRequired
}