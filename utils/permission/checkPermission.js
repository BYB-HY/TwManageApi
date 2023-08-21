module.exports = function checkPermission(allowedRoles) {
    return (req, res, next) => {
        const userRole = req.user.rid
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                success: true,
                message: '没有足够的权限',
            });
        }
        
        next();
    };

}