import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import TabSong from "./shared/TabSong";

export default function SearchBarScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState([]);
  const [filter, setFilter] = useState("song");

  useEffect(() => {
    if (searchTerm.trim()) {
      searchMusic(searchTerm);
    }
  }, [filter, searchTerm]);

  const setFilterType = (type) => {
    setFilter(type);
  };

  const searchMusic = async (term) => {
    if (!term.trim()) return;

    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          term
        )}&media=music&limit=10&entity=${filter}`
      );
      const data = await response.json();
      setSongs(data.results);
    } catch (error) {
      console.error("Erreur lors de la récupération des musiques :", error);
    }
  };

  const filterButtonStyle = (currentFilter) => [
    styles.filterButton,
    filter === currentFilter && styles.filterButtonActive,
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ItunesSeeker 🎧</Text>

      <View style={styles.filters}>
        <TouchableOpacity
          onPress={() => setFilterType("song")}
          style={filterButtonStyle("song")}
        >
          <Text style={styles.filterText}>Chanson</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilterType("album")}
          style={filterButtonStyle("album")}
        >
          <Text style={styles.filterText}>Album</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilterType("musicArtist")}
          style={filterButtonStyle("musicArtist")}
        >
          <Text style={styles.filterText}>Artiste</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Cherchez une musique..."
        placeholderTextColor="#aaa"
        style={styles.input}
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        onSubmitEditing={() => searchMusic(searchTerm)}
      />

      <FlatList
        data={songs}
        keyExtractor={(item) =>
          item.trackId?.toString() || Math.random().toString()
        }
        renderItem={({ item }) => (
          <TabSong
            object={item}
            navigation={navigation}
            origin={"search"}
            filter={filter}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a", // bleu foncé
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#1e293b",
  },
  filterButtonActive: {
    borderColor: "#3b82f6",
    backgroundColor: "#2563eb",
  },
  filterText: {
    color: "#fff",
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#1e293b",
    borderRadius: 10,
    padding: 12,
    color: "#fff",
    borderColor: "#334155",
    borderWidth: 1,
    marginBottom: 20,
  },
});
