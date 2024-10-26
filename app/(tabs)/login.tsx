import { View, Text, TextInput, Button, ActivityIndicator } from "react-native";
import CheckBox from "expo-checkbox";
import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [verificationInProgress, setVerificationStatus] = useState<
    0 | 1 | 2 | 3
  >(0);
  const attemptLogin = () => {
    setVerificationStatus(3);
  };
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
            autoComplete="off"
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
        {(() => {
          switch (verificationInProgress) {
            case 0: {
              return <Button onPress={attemptLogin} title="Log In" />;
            }
            case 1: {
              setTimeout(() => setVerificationStatus(0), 3000);
              return <Text>Login Succesfull! Welcome</Text>;
            }
            case 2: {
              setTimeout(() => setVerificationStatus(0), 3000);
              return <Text>Login Failed! Try Again</Text>;
            }
            case 3: {
              return <ActivityIndicator />;
            }
          }
        })()}
      </View>
    </View>
  );
}
