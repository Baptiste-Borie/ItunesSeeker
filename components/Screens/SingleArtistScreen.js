import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function SingleArtistScreen({ route, navigation }) {
  const { object: artist } = route.params;
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (artist && artist.artistId) {
      fetchArtistData(artist.artistId);
    }
  }, [artist]);

  const fetchArtistData = async (artistId) => {
    try {
      const responseAlbums = await fetch(
        `https://itunes.apple.com/lookup?id=${artistId}&entity=album`
      );
      const responseSongs = await fetch(
        `https://itunes.apple.com/lookup?id=${artistId}&entity=song`
      );

      const dataAlbums = await responseAlbums.json();
      const dataSongs = await responseSongs.json();

      setAlbums(
        dataAlbums.results.filter((item) => item.wrapperType === "collection")
      );
      setSongs(
        dataSongs.results
          .filter((item) => item.wrapperType === "track")
          .slice(0, 6)
      );
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données de l'artiste :",
        error
      );
    }
  };

  if (!artist) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Aucun artiste trouvé</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.artistName}>{artist.artistName}</Text>

      <Text style={styles.sectionTitle}>🎵 Meilleurs Titres</Text>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.trackId.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SingleSongScreen", {
                object: item,
                origin: "artist",
              })
            }
            style={styles.row}
          >
            <Text style={styles.songText}>{item.trackName}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.sectionTitle}>📀 Meilleurs Albums</Text>
      <FlatList
        data={albums}
        keyExtractor={(item) => item.collectionId.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SingleAlbumScreen", { object: item })
            }
            style={styles.row}
          >
            <Image
              source={{ uri: item.artworkUrl60 }}
              style={styles.albumImage}
            />
            <Text style={styles.songText}>{item.collectionName}</Text>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
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
  artistName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#38bdf8",
    marginTop: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#334155",
  },
  songText: {
    fontSize: 16,
    color: "#f1f5f9",
  },
  albumImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
});
