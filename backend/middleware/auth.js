const userRepository = require('../repositories/userRepository');
const tokenRepository = require('../repositories/tokenRepository');

exports.authenticate = (req, res, next) => {
    const token = req.headers['Token'];

    if (!token){
        return res.status(401).json({
            success: false,
            error: 'You dont have access to this endpoint'
        });
    }

    const data = tokenRepository.getDataForToken(token)

    if (!data){
        return res.status(401).json({
            success: false,
            error: 'You dont have access to this endpoint'
        });
    }

    const user = userRepository.getUserById(data.userId);

    req.user = user;

    next();
}