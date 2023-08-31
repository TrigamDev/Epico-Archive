import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import app from "./app.ts";

const port = process.env.PORT || 5050;

mongoose.connect(process.env.MONGO_URI!, {
}).then((res) => {
    console.log("MongoDB connected");

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((err) => { console.log(err) });