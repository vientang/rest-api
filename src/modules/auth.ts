import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';

/**
 * Compares plain text password against hashed password
 * @param {string} password 
 * @param {string} hash 
 * @returns {Promise}
 */
export const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash);
}

/**
 * Creates a hashed password from a plain text password
 * @param {string} password 
 * @returns 
 */
export const hashPassword = (password) => {
    return bcrypt.hash(password, 5);
}

export const createJWT = (user) => {
    const token = jwt.sign(
        { 
            id: user.id, 
            username: user.username 
        }, 
        process.env.JWT_SECRET
    )
    return token;
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization
    const [, token] = bearer.split(' ')

    if (!bearer || !token) {
        res.status(401)
        res.json({ message: 'Not authorized' })
        return
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    } catch (e) {
        res.status(401)
        res.json({ message: 'Invalid token' })
        return
    }
}