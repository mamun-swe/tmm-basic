
export const removeItem = (array, item) => {
    const filteredItems = array.filter(exItem => exItem !== item)
    return filteredItems
}


