const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://Abhi:vNY8i1ODJIZEQJrk@namastenode.1eeou.mongodb.net/devTinder");
};

module.exports = connectDB;

