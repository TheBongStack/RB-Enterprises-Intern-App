import { View } from "react-native";

export default function ProductCard({ data }: { data: Product }) {
    return <View>

    </View>
}

export type Product = {
    name: string,
    price: number,
    outOfStock: boolean,
    brand: string,
    warrantyPeriod: Date,
    type: "Appliance" | "Service" | "Sales"
}