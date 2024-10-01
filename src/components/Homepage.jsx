import { useState, useEffect } from "react";
import { Carousel, IconButton } from "@material-tailwind/react";
import Spinner from "./Spinner.jsx";
import { Link } from "react-router-dom"
import PropTypes from "prop-types";

// todo: make own carousel element
export default function Homepage() {
    const [ items, setItems ] = useState([])

    useEffect(() => {
        fetch('https://fakestoreapi.com/products?limit=5')
            .then(res=> res.json())
            .then(data => setItems(data))
    }, [])

    return (
        <>
            {items.length === 0 ? (
                <div className="flex h-[70%] items-center justify-center">
                    <Spinner/>
                </div>
            ) : (
                <div className="flex flex-col items-center mt-10">
                    <h2 className="font-bold text-7xl">Any Item</h2>
                    <h3 className="font-bold text-4xl mt-4">Cheap Price</h3>
                    <CustomCarousel items={items}/>
                </div>
            )
            }
        </>
    )
}

function CustomCarousel({items}) {
    return <Carousel
        className="rounded-xl w-64 items-center ml-auto mr-auto"
        navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
                    <span
                        key={i}
                        className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                            activeIndex === i ? "w-8 bg-black" : "w-4 bg-gray-500"
                        }`}
                        onClick={() => setActiveIndex(i)}
                    />
                ))}
            </div>
        )}
        prevArrow={({ handlePrev }) => (
            <IconButton
                variant="text"
                color="gray"
                size="sm"
                onClick={handlePrev}
                className="!absolute bottom-0 left-5"
            >
                <svg xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                     strokeWidth="3"
                     className="-ml-1 h-7 w-7">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"></path>
                </svg>
            </IconButton>
        )}
        nextArrow={({handleNext}) => (
            <IconButton
                variant="text"
                color="gray"
                size="sm"
                onClick={handleNext}
                className="!absolute bottom-0 !right-5"
            >
                <svg xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                     strokeWidth="3"
                     className="ml-1 h-7 w-7">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
                </svg>
            </IconButton>
        )}
        autoplay={true}
        autoplayDelay={2000}
        loop={true}
    >
        {
            items.map(item =>
                <Link key={item.id} to={`/collection/${item.id}`} className="block">
                    <img
                        key={item.id}
                        src={item.image}
                        alt={item.title}
                    />
                </Link>
            )
        }
    </Carousel>
}

CustomCarousel.propTypes = {
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