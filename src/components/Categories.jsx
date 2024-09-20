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
                categories.map(category =>
                    <CategoryButton
                        key={category}
                        category={category}
                        filterOnCategory={filterOnCategory}
                        isActive={filterBy.category === category}
                    />
                )
            )}
        </>
    )
}

function CategoryButton({ category, filterOnCategory, isActive}) {
    let text = category === "jewelery" ? "Jewelry" : category
    text = text
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")

    return (
        <button
            className={`self-start ml-3 ${isActive ? "font-bold" : "none"}`}
            onClick={filterOnCategory(category)}
        >
            {text}
        </button>
    )
}