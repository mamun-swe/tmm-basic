
const fs = require('fs')

// Delete a file
const removeFile = (destination, file) => {
    fs.unlink(destination + file, function (err) {
        if (err) {
            console.error(err)
        }
        return
    });
}

module.exports = {
    removeFile
}