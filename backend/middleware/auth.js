const authController = require('../controllers/authController');
const userRepository = require('../repositories/userRepository');

exports.authenticate = (req, res, next) => {
    const token = req.headers['Token'];

    if (!token){
        return res.status(401).json({
            success: false,
            error: 'You dont have access to this endpoint'
        });
    }

    const userId = authController.tokens.get(token);

    if (!userId){
        return res.status(401).json({
            success: false,
            error: 'You dont have access to this endpoint'
        });
    }

    const user = userRepository.getUserById(userId);

    req.user = user;

    next();
}