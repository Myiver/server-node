import createError from "http-errors"
import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import logger from "morgan"
import cors from "cors"

import { router as IndexRouter } from "./routes/index"

const app = express()

app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", IndexRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

export { app }
