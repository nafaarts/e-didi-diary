import { View, Text, FlatList, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const data = [
  { id: "1", text: "Sebagai sumber informasi tentang gizi" },
  { id: "2", text: "Memudahkan pemilihan jenis makanan sesuai kebutuhan" },
  { id: "3", text: "Membantu ibu menkonsumsi jumlah makanan yang tepat" },
  { id: "4", text: "Sebagai catatan harian ibu selama hamil" },
  { id: "5", text: "Langkah utama pencegahan stunting" },
];

const ManfaatScreen = () => {
  const theme = useTheme();
  const renderListItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.bullet}>{"\u2022"}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        padding: 20,
        backgroundColor: theme.colors.background,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          marginBottom: 20,
          fontWeight: 600,
          color: theme.colors.primary,
        }}
      >
        Manfaat e-DiDi untuk ibu hamil adalah :
      </Text>
      <FlatList
        scrollEnabled={false}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderListItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  bullet: {
    fontSize: 10,
    marginRight: 8,
  },
});

export default ManfaatScreen;
