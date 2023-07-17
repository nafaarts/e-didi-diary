import { View, Text, KeyboardAvoidingView, Alert } from "react-native";
import React, { useEffect, useState } from "react";

import { Button, TextInput, useTheme } from "react-native-paper";
import { createTables, destroyDatabase } from "../database/database";
import { addUser, getUser } from "../database/user";
import Layout from "../components/Layout";

export default function RegistrationScreen({ navigation }) {
  const theme = useTheme();
  const [input, setInput] = useState({
    name: "",
    age: "",
    ageOfPregnant: "",
    address: "",
    babyName: "",
  });

  const handleUserRegistration = () => {
    if (
      !input.name ||
      !input.age ||
      !input.ageOfPregnant ||
      !input.address ||
      !input.babyName
    ) {
      Alert.alert("Data tidak boleh ada yang kosong!");
      return;
    }

    addUser(input)
      .then((userId) => {
        if (userId) {
          navigation.navigate("BerandaScreen");
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    // destroyDatabase();
    createTables();

    getUser()
      .then((data) => {
        console.log(data);
        if (data.length > 0) {
          navigation.navigate("BerandaScreen");
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Layout>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
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
              fontSize: 30,
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
            Diary Diit Nutrisi Ibu Hamil
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 400,
              marginBottom: 50,
            }}
          >
            Masukan data diri anda
          </Text>

          <TextInput
            label="Nama"
            mode="flat"
            underlineColor="transparent"
            value={input.name}
            onChangeText={(text) =>
              setInput({
                ...input,
                name: text,
              })
            }
            style={{
              width: "100%",
              backgroundColor: theme.colors.input,
              color: "#FFF",
              marginBottom: 10,
            }}
          />
          <TextInput
            label="Usia"
            mode="flat"
            underlineColor="transparent"
            value={input.age}
            onChangeText={(text) =>
              setInput({
                ...input,
                age: text,
              })
            }
            style={{
              width: "100%",
              backgroundColor: theme.colors.input,
              color: "#FFF",
              marginBottom: 10,
            }}
          />
          <TextInput
            label="Usia Kehamilan"
            mode="flat"
            underlineColor="transparent"
            value={input.ageOfPregnant}
            onChangeText={(text) =>
              setInput({
                ...input,
                ageOfPregnant: text,
              })
            }
            style={{
              width: "100%",
              backgroundColor: theme.colors.input,
              color: "#FFF",
              marginBottom: 10,
            }}
          />
          <TextInput
            label="Alamat"
            mode="flat"
            underlineColor="transparent"
            value={input.address}
            onChangeText={(text) =>
              setInput({
                ...input,
                address: text,
              })
            }
            style={{
              width: "100%",
              backgroundColor: theme.colors.input,
              color: "#FFF",
              marginBottom: 10,
            }}
          />
          <TextInput
            label="Nama Calon Bayi"
            mode="flat"
            underlineColor="transparent"
            value={input.babyName}
            onChangeText={(text) =>
              setInput({
                ...input,
                babyName: text,
              })
            }
            style={{
              width: "100%",
              backgroundColor: theme.colors.input,
              color: "#FFF",
              marginBottom: 20,
            }}
          />

          <Button
            mode="contained"
            onPress={handleUserRegistration}
            buttonColor={theme.colors.primary}
            style={{ width: "100%", borderRadius: 5, padding: 3 }}
            labelStyle={{ fontSize: 18 }}
          >
            Lanjutkan
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
}
