import { Request, Response } from "express";
import { db } from "@/server/db/init";
import { ProductsRegistered, UserSessions } from "../db/drizzle/schema";
import { eq } from "drizzle-orm";
import { Product, productObjectValidator} from "../helpers/validators";

export const fetchProducts = async (req: Request, res: Response) => {
  const sessionUser = await db
    .selectDistinct({
      userName: UserSessions.user,
    })
    .from(UserSessions)
    .where(eq(UserSessions.cookie, req.cookies.sessionCookie))
    .limit(1);
  const data = await db.query.ProductsRegistered.findMany({
    where: eq(ProductsRegistered.owner, sessionUser[0].userName),
  });
  res.send(JSON.stringify(data));
};

export const addProducts = async (req: Request, res: Response) => {
  const sessionUser = await db
    .selectDistinct({
      userName: UserSessions.user,
    })
    .from(UserSessions)
    .where(eq(UserSessions.cookie, req.cookies.sessionCookie))
    .limit(1);
  const productToAdd = JSON.parse(req.body.productDetails);
  if (productObjectValidator(productToAdd)) {
    const productDataFinal: Product = {
      ...productToAdd,
      owner: sessionUser[0].userName,
    };
    await db.insert(ProductsRegistered).values(productDataFinal);
    res.json({
      productAdditionStatus: true,
      productAdded: productDataFinal,
    });
  } else {
    res.json({
      productAdditionStatus: false,
      error: "Invalid data received",
    });
  }
};
