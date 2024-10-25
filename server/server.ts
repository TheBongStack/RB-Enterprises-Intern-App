import express from "express";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 8000;

app.use(
  morgan("combined", {
    skip: (_, res) => res.statusCode < 299,
  })
);

app.get("/", (req, res) => {
  res.json({ redirect: "/" });
  res.send();
});


app.post("/products", (req, res) => {

})
app.get("/products", (req, res) => {

})

app.listen(port, () =>
  console.log("Server has started listening at port : ", port)
);
