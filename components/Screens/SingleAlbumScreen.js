import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

export default function SingleAlbumScreen({ route, navigation }) {
  const { object: initialAlbum } = route.params;
  const [album, setAlbum] = useState(initialAlbum);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Effect to fetch album details when the component mounts or when the initial album changes
  useEffect(() => {
    if (initialAlbum.collectionId) {
      fetchAlbumDetails(initialAlbum.collectionId);
    }
  }, [initialAlbum]);

  // Function to fetch album details from the iTunes API
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

  // Function to handle song selection
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  // Check if the album is empty
  if (!album) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Aucun album trouvé</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: album.artworkUrl100 }} style={styles.image} />
      <Text style={styles.albumName}>{album.collectionName}</Text>
      <Text style={styles.artistName}>{album.artistName}</Text>

      <FlatList
        data={songs}
        keyExtractor={(item) => item.trackId.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SingleSongScreen", {
                object: item,
                origin: "album",
              })
            }
            style={styles.songRow}
          >
            <Text style={styles.songText}>
              {item.trackName} - {item.artistName}
            </Text>
          </TouchableOpacity>
        )}
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
  },
  emptyText: {
    color: "#94a3b8",
    fontSize: 18,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 12,
    alignSelf: "center",
    marginBottom: 20,
  },
  albumName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  artistName: {
    fontSize: 16,
    color: "#94a3b8",
    marginBottom: 20,
    textAlign: "center",
  },
  songRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#334155",
  },
  songText: {
    fontSize: 16,
    color: "#f1f5f9",
  },
});
