export default function Tag({type, toDisplay, setState}) {
    const mapping = {
        "": "",
        "alphabetical ascending": "A - Z",
        "alphabetical descending": "Z - A",
        "price ascending": "Price ↑",
        "price descending": "Price ↓",
    }

    let text = ""
    if (type === "filter") {
        text = toDisplay.category
    } else if (type === "sort") {
        text = mapping[toDisplay.type + " " + toDisplay.direction]
    }

    function onClick(type) {
        return type === "filter"
            ? () => setState({
                category: "",
                min_price: 0,
                max_price: Infinity,})
            : () => setState({
                type: "",
                direction: ""
            })
    }

    return (
        text && (<div
            className="flex pr-2 bg-blue-200 rounded justify-center items-center">
            <p className="text-xs p-2 pr-1 overflow-hidden whitespace-nowrap truncate">{text}</p>
            <button
                type="button"
                className="w-3"
                onClick={onClick(type)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>window-close</title>
                    <path
                        d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z"/>
                </svg>
            </button>
        </div>
        )
    )
}