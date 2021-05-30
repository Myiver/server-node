import createError from "http-errors"
import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import logger from "morgan"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

import * as routers from "./routers"

const app = express()

dotenv.config()

// Connect to database in Mongo Atlas
const start = async () => {
  try {
    await mongoose.connect(process.env.DB_LINK, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log("Connected to database..!");
  } catch ({ message }) {
    console.log("Database connecting error: ", message)
  }
}

start()

// Middlewares
app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

// Handle Routes
app.use("/api/auth", routers.AuthRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

export { app }
