import mapping from "../mapping.js"

export default function Tag({type, toDisplay, setState}) {
    let text = ""
    if (type === "filter") {
        text = toDisplay.category
    } else if (type === "sort") {
        text = mapping[toDisplay.type + " " + toDisplay.direction]
    }

    function onClick(type) {
        return type === "filter"
            ? () => setState({
                ...toDisplay,
                category: "",
                })
            : () => setState({
                type: "",
                direction: ""
            })
    }

    return (
        text && (
            <div className="flex bg-black pl-2 pr-2 text-white rounded justify-center items-center">
                <p className="text-xs p-2 overflow-hidden whitespace-nowrap truncate">{text}</p>
                <button
                    type="button"
                    className="w-3"
                    onClick={onClick(type)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-white"><title>window-close</title>
                        <path
                            d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z"/>
                    </svg>
                </button>
            </div>
        )
    )
}