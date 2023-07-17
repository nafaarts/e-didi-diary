import { useFocusEffect } from "@react-navigation/native";
import { useAssets } from "expo-asset";
import { readAsStringAsync } from "expo-file-system";
import React, { useEffect, useState } from "react";
import WebView from "react-native-webview";

export default function ArtikelScreen() {
  const [index, indexLoadingError] = useAssets([
    require("../assets/artikel.html"),
  ]);

  const [html, setHtml] = useState("");

  if (index) {
    readAsStringAsync(index[0].localUri).then((data) => {
      setHtml(data);
    });
  }

  return <WebView source={{ html }} useWebKit={true} allowsZooming={false} />;
}
