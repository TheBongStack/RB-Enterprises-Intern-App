import z, { ZodSchema } from "zod";

const validatorConstructorFunction = (
  input: any,
  schema: ZodSchema<any>
): boolean => {
  try {
    schema.parse(input);
  } catch (e) {
    if (e instanceof z.ZodError) {
      console.log("Input object is invalid, cannot validate product object.");
    } else {
      console.log("Unexpected error occurred : ", e);
    }
    return false;
  }
  return true;
};

export enum productType {
  Appliance,
  Service,
  Sales,
  IT,
  NA,
};
const productSchema = z.object({
  name: z.string().max(255).min(1),
  brand: z.string().max(255).min(1),
  type: z.nativeEnum(productType),
  warrantyPeriod: z.bigint().min(BigInt(1000)),
  warrantyStartDate: z.date(),
  price: z.number().min(0),
  outOfStock: z.boolean(),
});
export type Product = z.infer<typeof productSchema>;
export const productObjectValidator = (input: Object): boolean => validatorConstructorFunction(input, productSchema);

const loginSchema = z.object({
  email: z.string().email().max(250).toLowerCase(),
  password: z.string().min(8).max(25),
  keepUserSignedIn: z.boolean().default(false)
});
export type LoginParams = z.infer<typeof loginSchema>;
export const loginObjectValidator = (input: Object): boolean => validatorConstructorFunction(input, loginSchema);


const userSchema = z.object({
  userName: z.string().trim().min(5).max(20),
  email: z.string().trim().email().min(3).max(255),
  passwordHash: z.string().trim().max(255).min(255),
  createdAt: z.date(),
  updatedAt: z.date().min(new Date()),
});
export type User = z.infer<typeof userSchema>;
export const userObjectValidator = (input: any): boolean => validatorConstructorFunction(input, userSchema);


const profileSchema = z.object({
  owner: userSchema.
});
export type Profile = z.infer<typeof profileSchema>;
export const profileObjectValidator = (input: any): boolean => validatorConstructorFunction(input, profileSchema);