export const admin = (req, res, next) => {
    try {
        if(!req.user){
            return res.status(401).json({
                error: true,
                message: "Unauthorized",
            })
        }

        if(req.user.role !== 'Admin'){
            return res.status(403).json({
                error: true,
                message: "Access denied. Admin only.",
            })
        }

        return next();
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message,
        })
    }
}