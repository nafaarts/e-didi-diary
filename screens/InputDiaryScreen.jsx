import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useState, useCallback } from "react";

import { TimePickerModal } from "react-native-paper-dates";
import { Button, TextInput, useTheme } from "react-native-paper";
import { getJudul } from "../utils/judul";
import { getTodayDiary, inputDiaries, setTodayDiary } from "../database/diary";
import Layout from "../components/Layout";

import RNPickerSelect from "react-native-picker-select";

const CustomPickerSelect = ({
  placeholder,
  selectedValue,
  onValueChange,
  items,
}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.colors.input,
        borderRadius: 4,
        marginBottom: 20,
        width: "100%",
      }}
    >
      <RNPickerSelect
        placeholder={{
          label: placeholder,
          value: null,
          color: "#000",
        }}
        value={selectedValue}
        onValueChange={onValueChange}
        items={items}
        style={pickerSelectStyles}
      />
    </View>
  );
};

const items = [
  { label: "Karbohidrat", value: "Karbohidrat" },
  { label: "Protein", value: "Protein" },
  { label: "Lemak", value: "Lemak" },
  { label: "Sayur/buah", value: "Sayur/buah" },
  { label: "Air", value: "Air" },
  { label: "Suplemen vitamin/obat lain", value: "Suplemen vitamin/obat lain" },
  { label: "Lainnya", value: "Lainnya" },
];

export default function InputDiaryScreen({ route, navigation }) {
  const { params } = route;
  const theme = useTheme();

  const [input, setInput] = useState({
    makanan: "",
    kategori: "",
    jam: "",
  });

  const [selectedValue, setSelectedValue] = React.useState("");

  const handleValueChange = (value) => {
    setInput({
      ...input,
      kategori: value,
    });
    setSelectedValue(value);
  };

  const [visible, setVisible] = useState(false);
  const onDismiss = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
      setInput({
        ...input,
        jam: `${hours}:${minutes} WIB`,
      });
    },
    [setVisible]
  );

  const onSubmit = async () => {
    if (!input.jam || !input.kategori || !input.makanan) {
      Alert.alert("Data tidak boleh kosong!");
      return;
    }

    try {
      const todayData = await getTodayDiary();
      let _id = todayData[0]?.id;

      if (!_id) {
        const todayId = await setTodayDiary();
        _id = todayId;
      }

      const data = {
        diaryId: _id,
        type: params.type,
        key: input.kategori,
        value: input.makanan,
        time: input.jam,
      };

      const insertData = await inputDiaries(data);

      if (insertData) {
        navigation.navigate("DiaryCategoryScreen", {
          type: params.type,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

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

          <TouchableOpacity
            style={{ width: "100%" }}
            onPress={() => {
              setVisible(true);
            }}
          >
            <View
              style={{
                padding: 20,
                backgroundColor: "#f0f0f0",
                width: "100%",
                backgroundColor: theme.colors.input,
                color: "#FFF",
                marginBottom: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ fontSize: 16 }}>{input.jam || "Masukan Jam"}</Text>
            </View>
          </TouchableOpacity>

          <TimePickerModal
            locale="id"
            label="Masukan jam"
            visible={visible}
            onDismiss={onDismiss}
            onConfirm={onConfirm}
            hours={12}
            minutes={14}
          />

          <TextInput
            label="Masukan Nama Makanan"
            mode="flat"
            underlineColor="transparent"
            value={input.makanan}
            onChangeText={(text) =>
              setInput({
                ...input,
                makanan: text,
              })
            }
            style={{
              width: "100%",
              backgroundColor: theme.colors.input,
              color: "#FFF",
              marginBottom: 10,
              borderRadius: 5,
            }}
          />

          {/* <TextInput
            label="Masukan Kategori Makanan (Vitamin, Buah, Sayur, dsb.)"
            mode="flat"
            underlineColor="transparent"
            value={input.kategori}
            onChangeText={(text) =>
              setInput({
                ...input,
                kategori: text,
              })
            }
            style={{
              width: "100%",
              backgroundColor: theme.colors.input,
              color: "#FFF",
              marginBottom: 10,
              borderRadius: 5,
            }}
          /> */}

          <CustomPickerSelect
            placeholder="Pilih kategori makanan"
            selectedValue={selectedValue}
            onValueChange={handleValueChange}
            items={items}
          />

          <Button
            mode="contained"
            onPress={onSubmit}
            buttonColor={theme.colors.primary}
            style={{
              width: "100%",
              borderRadius: 5,
              padding: 3,
              marginBottom: 15,
            }}
            labelStyle={{ fontSize: 14 }}
          >
            Simpan Catatan
          </Button>
          <Button
            mode="contained"
            onPress={() =>
              navigation.navigate("DiaryCategoryScreen", {
                type: params.type,
              })
            }
            buttonColor={theme.colors.tertiary}
            style={{ width: "100%", borderRadius: 5, padding: 3 }}
            labelStyle={{ fontSize: 14 }}
          >
            Kembali
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 19,
    paddingHorizontal: 13,
    borderWidth: 0,
    color: "black",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
