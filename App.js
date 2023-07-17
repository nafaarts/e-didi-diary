import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

import ManfaatScreen from "./screens/ManfaatScreen";
import BerandaScreen from "./screens/BerandaScreen";
import ArtikelScreen from "./screens/ArtikelScreen";
import DiaryScreen from "./screens/DiaryScreen";
import DiaryCategoryScreen from "./screens/DiaryCategoryScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import InputDiaryScreen from "./screens/InputDiaryScreen";

import { registerTranslation } from "react-native-paper-dates";
registerTranslation("id", {
  save: "Simpan",
  selectSingle: "Pilih tanggal",
  selectMultiple: "Pilih beberapa tanggal",
  selectRange: "Pilih periode",
  notAccordingToDateFormat: (inputFormat) =>
    `Format tanggal harus seperti ${inputFormat}`,
  mustBeHigherThan: (date) => `Harus setelah ${date}`,
  mustBeLowerThan: (date) => `Harus sebelum ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Harus diantara ${startDate} - ${endDate}`,
  dateIsDisabled: "Hari tidak diperbolehkan",
  previous: "Sebelumnya",
  next: "Selanjutnya",
  typeInDate: "Tulis tanggal",
  pickDateFromCalendar: "Pilih tanggal dari kalender",
  close: "Tutup",
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#E75480",
    secondary: "#f1c40f",
    tertiary: "#FCBACB",
    background: "#FFD1DC",
    input: "#FFFFFF",
    light: "#FFE1E8",
  },
};

const Stack = createNativeStackNavigator();

function App() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: theme.colors.primary,
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
          }}
        >
          <Stack.Screen
            name="RegistrationScreen"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BerandaScreen"
            component={BerandaScreen}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="ManfaatScreen"
            component={ManfaatScreen}
            options={{
              title: "Manfaat Aplikasi",
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="ArtikelScreen"
            component={ArtikelScreen}
            options={{
              title: "Informasi Ibu Hamil",
            }}
          />
          <Stack.Group
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="DiaryScreen" component={DiaryScreen} />
            <Stack.Screen
              name="DiaryCategoryScreen"
              component={DiaryCategoryScreen}
            />
            <Stack.Screen
              name="InputDiaryScreen"
              component={InputDiaryScreen}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
