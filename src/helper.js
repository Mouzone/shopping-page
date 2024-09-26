function customFilter(items, filterBy) {
    let filtered_items = filterBy.category === "" ? items : items.filter(item => item.category === filterBy.category)
    filtered_items = filtered_items.filter(item =>
        parseFloat(item.price) >= filterBy.min_price && parseFloat(item.price) <= filterBy.max_price)
    return filtered_items
}

function customSort(list, sortBy) {
    if (sortBy.type === "") {
        return list;
    }

    let do_if_greater = 1;
    let do_if_less = -1;
    if (sortBy.direction === "descending") {
        do_if_greater = -1;
        do_if_less = 1;
    }

    list.sort((a, b) => {
        let left, right;

        switch (sortBy.type) {
            case "alphabetical":
                left = a.title.toLowerCase();
                right = b.title.toLowerCase();
                break;
            case "price":
                left = parseFloat(a.price);
                right = parseFloat(b.price);
                break;
            case "rating":
                left = parseFloat(a.rating.rate);
                right = parseFloat(b.rating.rate);
                break;
            default:
                return 0;
        }

        return left === right
            ? 0
            : left > right
                ? do_if_greater
                : do_if_less;
    });

    return list;
}

function formatPrice(price) {
    if (Number.isInteger(price)) {
        return price.toFixed(2)
    }
    return price.toFixed(2);
}

function getItem(id){
    return fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => data.find(entry => entry.id === id) || null)
}

export {customFilter, customSort, formatPrice, getItem}