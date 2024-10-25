import { Link, router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function LandingPage() {
  return (
    <View>
      <View>
        <Text>Lorem ipsum dolor sit amet.</Text>
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui cumque
          sed nobis ea, sint optio illo velit repellat! Labore, cupiditate!
        </Text>
      </View>
      <View>
        <Link href={"/(tabs)/login"}>Log In</Link>
        <Link href={"/(tabs)/signup"}>Sign Up</Link>
        <Pressable
          onPress={() => {
            router.push("/showProducts");
          }}
        >
          <Text>Continue as {"Guest"}</Text>
        </Pressable>
      </View>
    </View>
  );
}
