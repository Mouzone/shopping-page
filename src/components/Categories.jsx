import Spinner from "./Spinner.jsx";

export default function Categories({categories, filterBy, setFilter}) {
    function filterOnCategory(category) {
        return () => {
            setFilter({...filterBy, category: category})
        }
    }

    return (
        <>
            <h2 className="text-2xl underline"> Categories: </h2>
            {categories === null ? (
                <Spinner/>
            ) : (
                categories.map(category => {
                    return (
                        <button
                            key={category} className={`self-start ml-3 ${filterBy.category === category ? "font-bold" : "none"}`}
                            onClick={filterOnCategory(category)}
                        >
                            {
                                category === "jewelery"
                                    ? "Jewelry"
                                    : category
                                        .split(" ")
                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                        .join(" ")
                            }
                        </button>
                    )
                })
            )}
        </>
    )
}

