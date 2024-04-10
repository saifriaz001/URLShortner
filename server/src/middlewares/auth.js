import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const auth = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Token is missing or invalid",
            });
        }
        const token = authHeader.split(" ")[1];

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user object to request for further use
        next(); // Move to the next middleware or route handler
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({
            success: false,
            message: "Token is missing or invalid",
        });
    }
};