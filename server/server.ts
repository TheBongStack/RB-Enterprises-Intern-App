import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth";
import productsRouter from "./routes/products";

const app = express();
const port = process.env.PORT || 8000;

app.use([
  morgan("combined"),
  express.json(),
  express.urlencoded({ extended: false }),
]);

app.use("/auth", authRouter);
app.use("/products", productsRouter);

app.listen(port, () =>
  console.log("Server has started listening at port : ", port)
);
