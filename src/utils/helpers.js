
export const removeItem = (array, item) => {
    const filteredItems = array.filter(exItem => exItem !== item)
    return filteredItems
}

// header
export const header = {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") }
}
