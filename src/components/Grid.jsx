// todo: add spinner when items is loading, not when there are no items in search
import {formatPrice} from "../helper.js";
export default function Grid({ items }) {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="grid w-full grid-cols-[repeat(auto-fit,_minmax(150px,_4fr))] gap-16 items-center mt-4">
                {items === null ? (
                        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
                    ) : (
                        items.map(item =>
                            <div key={item.id} className="flex flex-col h-96">
                                <div className="flex items-center justify-center h-72">
                                    <img className="w-40" key={item.id} src={item.image} alt={item.title}/>
                                </div>
                                <div className="flex mt-auto">
                                    <h2 className="w-40 truncate ..."> {item.title} </h2>
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6">
                                            <title>heart-outline</title>
                                            <path
                                                d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z"/>
                                        </svg>
                                    </button>
                                </div>
                                <h2 className="font-bold">
                                    ${formatPrice(item.price)}
                                </h2>
                                <p className="w-44 line-clamp-3 truncate ... text-xs whitespace-normal"> {item.description}</p>
                            </div>)
                    )
                }
            </div>
        </div>)
}

