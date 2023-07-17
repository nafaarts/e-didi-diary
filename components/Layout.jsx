import { View, Text, Image } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

const Layout = ({ children }) => {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        position: "relative",
        backgroundColor: theme.colors.background,
      }}
    >
      <Image
        style={{
          position: "absolute",
          bottom: 0,
          right: -150,
          width: 500,
          height: 500,
          opacity: 0.2,
        }}
        source={require("../assets/icon.png")}
      />
      <View
        style={{
          flex: 1,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default Layout;
