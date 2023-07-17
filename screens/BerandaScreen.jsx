import React from "react";
import { View, Text, Image } from "react-native";
import { Button, useTheme } from "react-native-paper";
import Layout from "../components/Layout";

const BerandaScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 30,
        }}
      >
        <Text
          style={{
            fontSize: 36,
            fontWeight: 800,
            marginBottom: 10,
            color: theme.colors.primary,
          }}
        >
          e-DiDi
        </Text>
        <Text
          style={{
            fontSize: 23,
            fontWeight: 500,
            marginBottom: 30,
            color: theme.colors.primary,
          }}
        >
          Diary Nutrisi Ibu Hamil
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 400,
            marginBottom: 15,
          }}
        >
          Assalamualaikum, dear mom!
        </Text>

        <Text
          style={{
            textAlign: "center",
            marginBottom: 100,
          }}
        >
          Selamat datang di e-DiDi (Electronic Dietary Diary) yang dirancang
          khusus untuk membantu ibu dalam memenuhi kebutuhan gizi selama
          kehamilan.
        </Text>

        <Button
          mode="contained"
          onPress={() => navigation.push("DiaryScreen")}
          buttonColor={theme.colors.primary}
          style={{
            width: "100%",
            marginBottom: 15,
            borderRadius: 5,
            padding: 3,
          }}
          labelStyle={{ fontSize: 14 }}
        >
          Diary Ibu Hamil
        </Button>

        <Button
          mode="contained"
          onPress={() => navigation.push("ArtikelScreen")}
          buttonColor={theme.colors.primary}
          style={{
            width: "100%",
            marginBottom: 15,
            borderRadius: 5,
            padding: 3,
          }}
          labelStyle={{ fontSize: 14 }}
        >
          Informasi Ibu Hamil
        </Button>

        <Button
          mode="contained"
          onPress={() => navigation.push("ManfaatScreen")}
          buttonColor={theme.colors.primary}
          style={{ width: "100%", borderRadius: 5, padding: 3 }}
          labelStyle={{ fontSize: 14 }}
        >
          Manfaat Aplikasi
        </Button>
      </View>
    </Layout>
  );
};

export default BerandaScreen;
