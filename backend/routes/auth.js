const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();

// ✅ User Registration Route
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // ✅ Check if all fields are filled
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // ✅ Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // ✅ Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Create new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
