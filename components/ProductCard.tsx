import product from "@/interfaces/product";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { Text, View } from "react-native";

export default function ProductCard({ data }: { data: product }) {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  return (
    <View>
      <View>
        <View>
          <Text>{data.name}</Text>
          <Text>{data.brand}</Text>
        </View>
        <View>
          {showOptions && <OptionsMenu />}
          <FontAwesome.Button
            name="ellipsis-v"
            onPress={() => setShowOptions((prev_state) => !prev_state)}
          />
        </View>
      </View>
      <View>
        <Text>
          <Text>Type of Product : </Text>
          {data.type}
        </Text>
        <Text>
          <Text>Warranty Period : </Text>
          {formatDuration(Number(data.warrantyPeriod))}
        </Text>
        <Text>
          <Text>Warranty Start Date : </Text>
          {data.warrantyStartDate.toLocaleDateString()}
        </Text>
        <Text>
          <Text>Price : </Text>
          INR {data.price}
        </Text>
        <Text>
          <Text>Availability : </Text>
          {data.outOfStock ? "In - Stock" : "Out of Stock"}
        </Text>
      </View>
    </View>
  );
}

function formatDuration(milliseconds: number) {
  const seconds = milliseconds / 1000;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const formattedDuration = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  return formattedDuration;
}

function OptionsMenu() {
  return <View></View>;
}
