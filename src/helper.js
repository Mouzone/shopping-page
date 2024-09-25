function customFilter(items, filterBy) {
    let filtered_items = filterBy.category === "" ? items : items.filter(item => item.category === filterBy.category)
    filtered_items = filtered_items.filter(item =>
        parseFloat(item.price) >= filterBy.min_price && parseFloat(item.price) <= filterBy.max_price)
    return filtered_items
}

function customSort(list, sortBy) {
    if (sortBy.type === "") {
        return list
    }

    let do_if_greater = 1
    let do_if_less = -1
    if (sortBy.direction === "descending") {
        do_if_greater = -1
        do_if_less = 1
    }


    list.sort((a, b) => {
        const left = sortBy.type === "alphabetical" ? a.title.toLowerCase() : parseFloat(a.price)
        const right = sortBy.type === "alphabetical" ? b.title.toLowerCase() : parseFloat(b.price)

        return left === right
            ? 0
            : left > right
                ? do_if_greater
                : do_if_less
    })

    return list
}

function formatPrice(price) {
    if (Number.isInteger(price)) {
        return price.toFixed(2)
    }
    return price.toFixed(2);
}

export {customFilter, customSort, formatPrice }