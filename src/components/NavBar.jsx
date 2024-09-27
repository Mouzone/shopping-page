import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState, useRef} from "react";
import {formatPrice} from "../helper.js";

export default function NavBar({ setSearchBy, liked, setShowFavorites }) {
    const [ isVisible, setIsVisible ] = useState(true)
    const [ items, setItems ] = useState(null )
    const [ localSearchBy, setLocalSearchBy ] = useState("")
    const navigate = useNavigate()
    const ref = useRef(null)

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setItems(data))
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setIsVisible(false)
        }
    }

    const onChange = (e) => {
        setLocalSearchBy(e.target.value)
    }

    const onKeyDown = (e) => {
        if (e.key === "Enter"){
            setSearchBy(e.target.value)
            setLocalSearchBy("")
            navigate('/collection')
        }
    }


    const searched_items = items === null ? null : items.filter(item => item.title.includes(localSearchBy)
        || item.title.toLowerCase().includes(localSearchBy.toLowerCase()))

    return (
        <div className="flex gap-6 pt-10 pb-9 pl-32 pr-32 items-end border bg-black text-white">
            <h1 className="font-extrabold text-6xl">
                Goods.
            </h1>
            <Link
                to="home"
                className="text-2xl font-bold"
            >
                Home
            </Link>
            <Link
                to="collection"
                className="text-2xl font-bold"
            >
                Collection
            </Link>
            <div className="ml-auto" ref={ref}>
                <input
                    aria-label="search"
                    placeholder="Search"
                    className=" rounded-full px-5 h-9 w-40 text-black"
                    value={localSearchBy}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    onSelect={() => setIsVisible(true)}
                />
                { isVisible && (
                    <div className="absolute z-10 text-black border border-b-0 border-black">
                        {(items !== null && localSearchBy !== "") && searched_items.slice(0, 3).map(item => (
                                <Link key={item.id} to={`/item/${item.id}`}
                                      className="bg-white w-72 flex p-4 border-b border-black gap-3 items-center"
                                      onClick={() => setLocalSearchBy("")}>
                                    <img src={item.image} alt={item.id} className="w-20"/>
                                    <div className="flex flex-col gap-2 text-lg ">
                                        <p className="line-clamp-2 font-bold"> {item.title} </p>
                                        <p> ${formatPrice(item.price)} </p>
                                    </div>
                                </Link>
                            )
                        )}
                    </div>
                )
                }
            </div>
            <Favorites liked={liked} setShowFavorites={setShowFavorites}/>
            <button className="flex items-center gap-1 cursor-pointer -ml-3 text-xl">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 fill-white">
                    <title>cart</title>
                    <path
                        d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"/>
                </svg>
                {0}
            </button>
        </div>
    )
}

function Favorites({ liked, setShowFavorites}) {
    const onClick = () => {
        setShowFavorites(true)
    }

    return (
        <Link to={"/collection"} className="flex items-center gap-1 cursor-pointer text-xl"
                onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 fill-red-500">
                <title>Favorite</title>
                <path
                    d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
            </svg>
            {liked.length}
        </Link>
    )
}