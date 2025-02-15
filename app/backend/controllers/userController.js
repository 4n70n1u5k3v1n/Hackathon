const jwt = require("jsonwebtoken");
const { getUserByUsername, verifyPassword} = require("../entities/userEntity");


const JWT_SECRET = process.env.JWT_SECRET || "blabla729wwdee302!2-";
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await getUserByUsername(username);
        if (!user) {
            return res.status(401).json({ success: false, error: "Invalid username or password." });
        }
        
        const passwordMatch = await verifyPassword(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, error: "Invalid username or password." });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            JWT_SECRET,
            { expiresIn: "2h" }
        );

        console.log(token);


        res.clearCookie("authToken", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            path: "/",
        });

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 48 * 60 * 60 * 1000, 
            path: "/",
        });


        res.status(200).json({
            success: true,
            userID: user.id,
            role: user.role,
            username: user.username,
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, error: "Internal server error." });
    }
};

exports.logoutUser = (req, res) => {
    res.clearCookie("authToken", {
        httpOnly: true,
        secure: true, 
        sameSite: "None", 
        path: "/", 
    });

    return res.status(200).json({ success: true, message: "Logged out successfully." });
};
