interface product {
  name: string;
  brand: string;
  type: productType;
  warrantyPeriod: bigint;
  warrantyStartDate: Date;
  price: number;
  outOfStock: boolean;
}

export enum productType {
  "Appliance",
  "Service",
  "Sales",
  "IT",
  "N/A",
}

export default product;
