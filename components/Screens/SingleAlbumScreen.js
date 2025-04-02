import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function SingleAlbumScreen({ route, navigation }) {
  const { object: initialAlbum } = route.params;
  const [album, setAlbum] = useState(initialAlbum);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initialAlbum.collectionId) {
      fetchAlbumDetails(initialAlbum.collectionId);
    }
  }, [initialAlbum]);

  const fetchAlbumDetails = async (collectionId) => {
    try {
      const response = await fetch(
        `https://itunes.apple.com/lookup?id=${collectionId}&entity=song`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        setAlbum(data.results[0]);
        setSongs(data.results.slice(1));
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'album :", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!album) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Aucun album trouvé</Text>
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
