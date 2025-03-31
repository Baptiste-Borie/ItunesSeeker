import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";

export default function SingleAlbumScreen({ route, navigation }) {
  const { object: album } = route.params;
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (album && album.collectionId) {
      fetchSongs(album.collectionId);
    }
  }, [album]);

  const fetchSongs = async (collectionId) => {
    try {
      const response = await fetch(
        `https://itunes.apple.com/lookup?id=${collectionId}&entity=song`
      );
      const data = await response.json();
      setSongs(data.results.filter((item) => item.wrapperType === "track"));
    } catch (error) {
      console.error("Erreur lors de la récupération des chansons :", error);
    }
  };

  if (!album) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Aucune chanson trouvée</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
      <Image
        source={{ uri: album.artworkUrl100 }}
        style={{
          width: 250,
          height: 250,
          borderRadius: 5,
          marginBottom: 20,
        }}
      />

      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        {album.collectionName}
      </Text>
      <Text style={{ fontSize: 18, color: "gray" }}>{album.artistName}</Text>

      <FlatList
        data={songs}
        keyExtractor={(item) => item.trackId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SingleSongScreen", {
                object: item,
                origin: "album",
              })
            }
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                borderBottomWidth: 1,
                borderColor: "#ccc",
              }}
            >
              <Text style={{ fontSize: 16 }}>
                {item.trackName} - {item.artistName}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
