import { View, Text, TextInput, Pressable } from "react-native";
import CheckBox from "expo-checkbox";
import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <View>
      <Text></Text>
      <Text></Text>
      <View>
        <Text>Username or E - Mail</Text>
        <TextInput textContentType="username" placeholder="John@example.com" />
        <Text>Password</Text>
        <View>
          <TextInput
            secureTextEntry={!showPassword}
            placeholder="*********"
          />
          {showPassword ? (
            <FontAwesome.Button
              name="eye"
              onPress={() => setShowPassword((prev_state) => !prev_state)}
            ></FontAwesome.Button>
          ) : (
            <FontAwesome.Button
              name="eye-slash"
              onPress={() => setShowPassword((prev_state) => !prev_state)}
            ></FontAwesome.Button>
          )}
        </View>
        <View>
          <CheckBox />
          <Text>Keep me Signed In</Text>
        </View>
      </View>
    </View>
  );
}
