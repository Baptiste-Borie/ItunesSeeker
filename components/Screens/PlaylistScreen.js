import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { musicSelector } from "../../store/MusicSlice";
import TabSong from "./shared/TabSong";

export default function PlaylistScreen({ navigation }) {
  const music = useSelector(musicSelector);

  if (music.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>🎵 Aucune musique dans la playlist</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ma Playlist 🎶</Text>
      <FlatList
        data={music}
        keyExtractor={(item) =>
          item.trackId?.toString() || Math.random().toString()
        }
        renderItem={({ item }) => (
          <TabSong object={item} navigation={navigation} origin={"playlist"} />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    color: "#94a3b8",
    fontSize: 18,
    textAlign: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
});
