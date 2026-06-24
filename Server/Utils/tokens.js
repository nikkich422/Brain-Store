import jwt from 'jsonwebtoken';

export const generateAccessToken = async (userId) => {
    const token = jwt.sign({id: userId},
        process.env.ACCESS_TOKEN_SECRET_KEY,
        {expiresIn: '15m'}
    );
    return token;
}

export const generateRefreshToken = async(userId) => {
    const token = jwt.sign(
        {id: userId},
        process.env.REFRESH_TOKEN_SECRET_KEY,
        {expiresIn: '7d'},
    )
    return token;
}