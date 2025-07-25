
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
const auth= (req, res, next) => {
    let token = req.header('Authorization');
    console.log("token in auth",token);
    if (!token) {
        res.status(401).send({ msg: 'No token, authorization denied' });
    }
    try {
        token = token.split(' ')[1];
        const decoded = jwt.verify(token, 'password');
        req.User = decoded;
        console.log("******",decoded);
        next();
    } catch (err) {
        res.status(401).send({ msg: 'Token is not valid' });
    }
};

export default auth

