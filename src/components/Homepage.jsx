import { useState, useEffect } from "react";
import { Carousel, IconButton } from "@material-tailwind/react";

export default function Homepage() {
    const [ items, setItems ] = useState([])

    useEffect(() => {
        fetch('https://fakestoreapi.com/products?limit=5')
            .then(res=> res.json())
            .then(data => setItems(data))
            .then(err => console.error(err))
    }, [])

    if (items.length === 0) {
        return <p>Loading...</p>;  // Show a loading state while fetching data
    }
    // todo: change arrows to not have stems
    // todo: autoplay, loop
    return (
            <div className="flex flex-col items-center mt-10">
                <h2 className="font-bold text-7xl"> Any Item </h2>
                <h3 className="font-bold text-4xl"> Cheap Price </h3>
                <Carousel
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
                              size="lg"
                              onClick={handlePrev}
                              className="!absolute -bottom-1 left-5"
                          >
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={5}
                                  stroke="currentColor"
                                  className="h-6 w-6"
                              >
                                  <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                                  />
                              </svg>
                              
                          </IconButton>
                      )}
                      nextArrow={({ handleNext }) => (
                          <IconButton
                              variant="text"
                              color="gray"
                              size="lg"
                              onClick={handleNext}
                              className="!absolute -bottom-1 !right-5"
                          >
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={5}
                                  stroke="currentColor"
                                  className="h-6 w-6"
                              >
                                  <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                  />
                              </svg>
                          </IconButton>
                      )}>
                    {items.map(item =>
                        <img
                            key={item.title}
                            src={item.image}
                            alt={item.title}
                        />)}
                </Carousel>
            </div>

    )
}

