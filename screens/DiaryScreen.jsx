import { View, Text } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { getTanggal } from "../utils/tanggal";
import Layout from "../components/Layout";

const DiaryScreen = ({ navigation, route }) => {
  const theme = useTheme();

  const { params } = route;

  const tanggal = getTanggal();

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
            fontSize: 27,
            fontWeight: 800,
            marginBottom: 30,
            color: theme.colors.primary,
          }}
        >
          Diary Hari Ini
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 400,
            marginBottom: 50,
          }}
        >
          {tanggal}
        </Text>

        <Button
          mode="contained"
          icon={params?.from === "PAGI" ? "check-circle" : ""}
          onPress={() =>
            navigation.push("DiaryCategoryScreen", {
              type: "PAGI",
            })
          }
          buttonColor={theme.colors.primary}
          style={{
            width: "100%",
            marginBottom: 15,
            borderRadius: 5,
            padding: 3,
          }}
          labelStyle={{ fontSize: 14 }}
        >
          Catat Makan Pagi
        </Button>

        <Button
          mode="contained"
          icon={params?.from === "SIANG" ? "check-circle" : ""}
          onPress={() =>
            navigation.push("DiaryCategoryScreen", {
              type: "SELINGAN_PAGI",
            })
          }
          buttonColor={theme.colors.primary}
          style={{
            width: "100%",
            marginBottom: 15,
            borderRadius: 5,
            padding: 3,
          }}
          labelStyle={{ fontSize: 14 }}
        >
          Catat Makan Selingan Pagi
        </Button>

        <Button
          mode="contained"
          icon={params?.from === "SIANG" ? "check-circle" : ""}
          onPress={() =>
            navigation.push("DiaryCategoryScreen", {
              type: "SIANG",
            })
          }
          buttonColor={theme.colors.primary}
          style={{
            width: "100%",
            marginBottom: 15,
            borderRadius: 5,
            padding: 3,
          }}
          labelStyle={{ fontSize: 14 }}
        >
          Catat Makan Siang
        </Button>

        <Button
          mode="contained"
          icon={params?.from === "SIANG" ? "check-circle" : ""}
          onPress={() =>
            navigation.push("DiaryCategoryScreen", {
              type: "SELINGAN_SIANG",
            })
          }
          buttonColor={theme.colors.primary}
          style={{
            width: "100%",
            marginBottom: 15,
            borderRadius: 5,
            padding: 3,
          }}
          labelStyle={{ fontSize: 14 }}
        >
          Catat Makan Selingan Siang / Sore
        </Button>

        <Button
          mode="contained"
          icon={params?.from === "MALAM" ? "check-circle" : ""}
          onPress={() =>
            navigation.push("DiaryCategoryScreen", {
              type: "MALAM",
            })
          }
          buttonColor={theme.colors.primary}
          style={{
            width: "100%",
            marginBottom: 15,
            borderRadius: 5,
            padding: 3,
          }}
          labelStyle={{ fontSize: 14 }}
        >
          Catat Makan Malam
        </Button>

        <Button
          mode="contained"
          icon={params?.from === "SELINGAN" ? "check-circle" : ""}
          onPress={() =>
            navigation.push("DiaryCategoryScreen", {
              type: "SELINGAN_MALAM",
            })
          }
          buttonColor={theme.colors.primary}
          style={{
            width: "100%",
            marginBottom: 15,
            borderRadius: 5,
            padding: 3,
          }}
          labelStyle={{ fontSize: 14 }}
        >
          Catat Makan Selingan Malam
        </Button>

        <Button
          mode="contained"
          onPress={() => navigation.navigate("BerandaScreen")}
          buttonColor={theme.colors.tertiary}
          style={{ width: "100%", borderRadius: 5, padding: 3 }}
          labelStyle={{ fontSize: 14 }}
        >
          Kembali
        </Button>
      </View>
    </Layout>
  );
};

export default DiaryScreen;
