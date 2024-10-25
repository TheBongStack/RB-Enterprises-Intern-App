import product from "@/interfaces/product";
import { useEffect, useState } from "react";
import axios from "axios";
import { FlatList, View } from "react-native";
import ProductCard from "@/components/ProductCard";

export default function ProductList() {
  const [productList, setProductList] = useState<product[]>([]);
  useEffect(() => {
    (async () => {
      const data: any = await axios.get(
        (process.env.API_BASE_URL as string) + "/products"
      );
      try {
      } catch (e) {
        console.log(
          "Invalid data from the backend. Check console logs for error."
        );
      }
      setProductList(data);
    })();
  });
  return (
    <View>
      <FlatList>
        {productList.map((datapoint) => (
          <ProductCard data={datapoint} />
        ))}
      </FlatList>
    </View>
  );
}
