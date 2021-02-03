export const checkIfError = (error) => {
    if (error) {
        console.log(error.response.data)
    }
};