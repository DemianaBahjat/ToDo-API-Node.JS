
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

async function auth(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Unauthenticated, you must login first' });
    }
    
    try {
        let decoded = await promisify(jwt.verify)(authorization, process.env.SECRET_KEY);
        req.id = decoded.data.id;
        req.role = decoded.data.role;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

function restrictTo(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.role)) {
            return res.status(403).json({ message: 'You do not have permission to do this action' });
        }
        next();
    };
}

module.exports = { auth, restrictTo };
