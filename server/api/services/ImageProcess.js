const Jimp = require('jimp')

// Convert to blur, watermark and upload image
const BlurImage = async (file) => {
    try {
        // Recived file data
        let image = await Jimp.read(file.data)
        await image.resize(200, 200)
        await image.blur(3)
        await image.quality(50)
        const newFilename = 'tmm-profile-' + Date.now() + '-blur' + '.png'

        // Add watermark
        let watermark = await Jimp.read('./static/watermark.png')
        await watermark.resize(400, 200)

        await image.composite(watermark, -15, 0, {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacityDest: 1,
            opacitySource: 0.7
        })

        // Upload in destination
        await image.write(`uploads/blur/${newFilename}`)
        return newFilename
    } catch (error) {
        if (error) return error
    }
}

// Add Waterkark & upload clear image
const ClearImage = async (file) => {
    try {
        // Recived file data
        let image = await Jimp.read(file.data)
        await image.resize(200, 200)
        await image.quality(50)
        const newFilename = 'tmm-profile-' + Date.now() + '-clear' + '.png'

        // Add watermark
        let watermark = await Jimp.read('./static/watermark.png')
        await watermark.resize(400, 200)

        await image.composite(watermark, -15, 0, {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacityDest: 1,
            opacitySource: 0.7
        })

        // Upload in destination
        await image.write(`uploads/clear/${newFilename}`)
        return newFilename
    } catch (error) {
        if (error) return error
    }
}

module.exports = {
    BlurImage,
    ClearImage
}