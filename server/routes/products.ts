import { Router } from "express";
import { fetchProducts, addProducts } from "../handlers/products";

const productsRouter = Router();

productsRouter.get("/", fetchProducts);
productsRouter.post("/", addProducts);

export default productsRouter;