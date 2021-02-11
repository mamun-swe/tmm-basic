const jwt = require('jsonwebtoken')
const Admin = require('../../models/Admin')

const isAdmin = async (req, res, next) => {
    try {
        const token = await req.headers.authorization
        if (!token) return res.status(404).json({ message: 'Token not found' })

        // decode token
        const splitToken = await req.headers.authorization.split(' ')[1]
        const decode = await jwt.verify(splitToken, 'SECRET')

        // find admin using token 
        const admin = await Admin.findOne(
            { _id: decode.id }, { access_token: splitToken },
            { $or: [{ role: 'super_admin' }, { role: 'admin' }, { role: 'manager' }] }
        ).exec()

        // IF user are not in that roles
        if (!admin) return res.status(401).json({ message: 'Invalid token' })

        // check role
        if (admin.role === 'super_admin' || 'admin' || 'manager')
            next()
        else
            return res.status(401).json({ message: 'You have no permissions to access' })

    } catch (error) {
        if (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(410).json({ message: 'Token expired' })
            }

            console.log(error);

            return res.status(501).json({ message: 'unauthorized request' })
        }
    }
}


module.exports = {
    isAdmin
}