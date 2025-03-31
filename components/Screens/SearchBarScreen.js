import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
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

  const filterButtonStyle = (currentFilter) => {
    return {
      borderWidth: 1,
      padding: 10,
      marginRight: 10,
      borderRadius: 5,
      borderColor: filter === currentFilter ? "blue" : "#ccc",
    };
  };

  return (
    <View style={{ flex: 1, margin: 50, padding: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => setFilterType("song")}
          style={filterButtonStyle("song")}
        >
          <Text>Chanson</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilterType("album")}
          style={filterButtonStyle("album")}
        >
          <Text>Album</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilterType("musicArtist")}
          style={filterButtonStyle("musicArtist")}
        >
          <Text>Artiste</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Cherchez une musique..."
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
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
