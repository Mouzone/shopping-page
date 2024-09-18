export default function NavBar() {
    return (
        <div className="flex gap-5 pt-10 pb-10 pl-32 pr-32 items-end border bg-amber-50">
            <h1 className="font-extrabold text-6xl">
                Goods.
            </h1>
            <button className="text-2xl font-bold underline decoration-4">
                Home
            </button>
            <button className="text-2xl font-bold underline decoration-4">
                Collection
            </button>
            <input
                aria-label="search"
                placeholder="Search"
                className="bg-gray-300 rounded-full px-5 ml-auto h-9 w-40"
            />
            <button className="flex items-center gap-1 cursor-pointer text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 fill-red-500"><title>Favorite</title>
                    <path
                        d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
                </svg>
                {0}
            </button>
            <button className="flex items-center gap-1 cursor-pointer text-lg -ml-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8"><title>cart</title>
                    <path
                        d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"/>
                </svg>
                {0}
            </button>
        </div>
    )
}
