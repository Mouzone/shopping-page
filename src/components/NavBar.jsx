export default function NavBar() {
    return (
        <div className="flex gap-14 p-10">
            <h1 className="font-extrabold text-6xl">
                Goods.
            </h1>
            <button>
                <h2 className="text-2xl font-bold"> Home </h2>
            </button>
            <button>
                <h2 className="text-2xl font-bold"> Collection </h2>
            </button>
            <input
                aria-label="search"
                placeholder="Search"
                className="bg-slate-300 rounded-full px-5 ml-auto h-12 w-36 self-center"
            />
            <button className="flex items-center bg-white border border-gray-300 rounded-lg p-2 cursor-pointer text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-red-500 mr-2"><title>Favorite</title>
                    <path
                        d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
                </svg>
            </button>
            <button>

            </button>
        </div>
    )
}
