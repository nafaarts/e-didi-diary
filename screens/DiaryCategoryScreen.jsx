import { View, Text, KeyboardAvoidingView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import { Button, useTheme } from "react-native-paper";
import { getJudul } from "../utils/judul";
import { getTodayDiaries, getTodayDiary } from "../database/diary";
import { useFocusEffect } from "@react-navigation/native";
import Layout from "../components/Layout";

const Item = ({ title, category, timestamp }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        padding: 12,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 5,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          marginBottom: 5,
          fontStyle: "italic",
        }}
      >
        {category} - {timestamp}
      </Text>
      <Text style={{ fontSize: 14, fontWeight: 600 }}>{title}</Text>
    </View>
  );
};

export default function DiaryCategoryScreen({ route, navigation }) {
  const { params } = route;

  const theme = useTheme();

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = () => {
    getTodayDiary()
      .then((data) => {
        if (data.length > 0) {
          getTodayDiaries(data[0]?.id, params.type)
            .then((diaries) => {
              setData(diaries);
            })
            .catch((err) => console.error(err));
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
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
            Catatan Makan
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 400,
              marginBottom: 50,
            }}
          >
            {getJudul(params.type)}
          </Text>

          <View
            style={{
              height: 400,
              width: "100%",
              backgroundColor: theme.colors.light,
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={({ item }) => (
                <Item
                  title={item.value}
                  category={item.key}
                  timestamp={item.time}
                />
              )}
              ListEmptyComponent={
                <View
                  style={{
                    paddingTop: 40,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      fontStyle: "italic",
                      textAlign: "center",
                    }}
                  >
                    Tidak ada data....
                  </Text>
                </View>
              }
              keyExtractor={(item) => item.id}
            />
          </View>

          <Button
            mode="contained"
            onPress={() =>
              navigation.navigate("InputDiaryScreen", {
                type: params.type,
              })
            }
            buttonColor={theme.colors.primary}
            style={{
              width: "100%",
              borderRadius: 5,
              padding: 3,
              marginBottom: 15,
            }}
            labelStyle={{ fontSize: 14 }}
          >
            Tambah Catatan
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("DiaryScreen")}
            buttonColor={theme.colors.tertiary}
            style={{ width: "100%", borderRadius: 5, padding: 3 }}
            labelStyle={{ fontSize: 14 }}
          >
            Kembali
          </Button>
        </View>
      </Layout>
    </KeyboardAvoidingView>
  );
}
