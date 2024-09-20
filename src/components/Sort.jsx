export default function Sort({ isActive, setIsActive, setSortBy }) {
    function onClick(type, direction) {
        return () => {
            setIsActive(false)
            setSortBy({type: type, direction: direction})
        }
    }

    return (
        <div className="flex flex-col font-light self-end ml-auto mr-32 items-center">
            <button
                className="w-15 flex items-center gap-1"
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

            { isActive && (
                <div className="flex flex-col absolute mt-7 bg-white rounded border border-black pb-2">
                    <button
                        className="hover:underline p-2"
                        onClick={onClick("alphabetical", "ascending")}
                    >
                        A - Z
                    </button>
                    <button
                        className="hover:underline p-2"
                        onClick={onClick("alphabetical", "descending")}
                    >
                        Z - A
                    </button>
                    <button
                        className="hover:underline p-2"
                        onClick={onClick("price", "ascending")}
                    >
                        Price ↑
                    </button>
                    <button
                        className="hover:underline p-2"
                        onClick={onClick("price", "descending")}
                    >
                        Price ↓
                    </button>
                </div>
            )
            }
        </div>
    )
}