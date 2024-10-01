import mapping from "../mapping.js";
import {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";

export default function Sort({ isActive, setIsActive, setSortBy }) {
    return (
        <div className="flex flex-col font-light self-end ml-auto items-center">
            <button
                className="w-15 flex items-center gap-1 underline"
                onClick={() => setIsActive(!isActive)}
            >
                Sort By

                {isActive
                    ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4"><title>chevron-up</title>
                            <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4"><title>chevron-down</title>
                            <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                        </svg>
                    )
                }
            </button>

            { isActive && <SortList setIsActive={setIsActive} setSortBy={setSortBy}/> }
        </div>
    )
}

function SortList({setIsActive, setSortBy}) {
    const ref = useRef(null)

    const types_directions = [
        "alphabetical ascending",
        "alphabetical descending",
        "price ascending",
        "price descending",
        "rating ascending",
        "rating descending",
    ]

    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setIsActive(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [handleClickOutside])

    function onClick(type, direction) {
        return () => {
            setIsActive(false)
            setSortBy({type: type, direction: direction})
        }
    }

    return (
        <div ref={ref} className="flex flex-col absolute mt-7 bg-white rounded border border-black pb-2">
            {
                types_directions.map(text_direction => {
                    const [type, direction] = text_direction.split(" ")
                    return <button
                        key={text_direction}
                        className="hover:underline p-2"
                        onClick={onClick(type, direction)}
                    >
                        {mapping[text_direction]}
                    </button>
                    }
                )
            }
        </div>
    )
}

Sort.propTypes = {
    isActive: PropTypes.bool.isRequired,
    setIsActive: PropTypes.func.isRequired,
    setSortBy: PropTypes.func.isRequired,
}

SortList.propTypes = {
    setIsActive: PropTypes.func.isRequired,
    setSortBy: PropTypes.func.isRequired,
}