const foodPartnerModel = require("../models/foodpartner.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

/**
 * Middleware to authenticate Food Partners
 */
async function authFoodPartnerMiddleware(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Please login as Food Partner first" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const foodPartner = await foodPartnerModel.findById(decoded.id);

        if (!foodPartner) {
            return res.status(401).json({ message: "Food Partner not found" });
        }

        req.foodPartner = foodPartner; // attach foodPartner to request
        next();
    } catch (err) {
        console.error("authFoodPartnerMiddleware error:", err);
        return res.status(401).json({ message: "Invalid token or unauthorized" });
    }
}

/**
 * Middleware to authenticate Users
 */
async function authUserMiddleware(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Please login first" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user; // attach user to request
        next();
    } catch (err) {
        console.error("authUserMiddleware error:", err);
        return res.status(401).json({ message: "Invalid token or unauthorized" });
    }
}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
};
