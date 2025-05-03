import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addMusic, updateRating } from "../../store/MusicSlice";
import Rating from "./shared/Rating";

export default function SingleSongScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const music = useSelector((state) => state.music);
  const { object: song, origin } = route.params;

  const isSongInStore = music.some(
    (storedSong) => storedSong.trackId === song.trackId
  );

  const existingSong = music.find(
    (storedSong) => storedSong.trackId === song.trackId
  );
  const [rating, setRating] = useState(existingSong ? existingSong.rating : 0);

  const addToPlaylist = () => {
    if (isSongInStore) {
      Alert.alert(
        "Chanson déjà dans la playlist",
        "Cette chanson est déjà dans votre playlist.",
        [{ text: "OK" }]
      );
    } else {
      dispatch(addMusic(song));
    }
  };

  const rateSong = (newRating) => {
    setRating(newRating);
    dispatch(updateRating({ trackId: song.trackId, rating: newRating }));
  };

  if (!song) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Aucune chanson trouvée</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: song.artworkUrl100 }} style={styles.image} />

      <Text style={styles.trackName}>{song.trackName}</Text>
      <Text style={styles.artistName}>{song.artistName}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log("b:musique")}
      >
        <Text style={styles.buttonText}>🎧 Écouter un extrait</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          song.collectionId &&
          navigation.navigate("SingleAlbumScreen", {
            object: {
              collectionId: song.collectionId,
              collectionName: song.collectionName,
            },
          })
        }
      >
        <Text style={styles.buttonText}>📀 Voir l'album</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          song.artistId &&
          navigation.navigate("SingleArtistScreen", {
            object: {
              artistId: song.artistId,
              artistName: song.artistName,
            },
          })
        }
      >
        <Text style={styles.buttonText}>👤 Voir l'artiste</Text>
      </TouchableOpacity>

      {origin !== "playlist" && (
        <TouchableOpacity style={styles.button} onPress={addToPlaylist}>
          <Text style={styles.buttonText}>➕ Ajouter à la playlist</Text>
        </TouchableOpacity>
      )}

      {origin === "playlist" && (
        <View style={{ marginTop: 30 }}>
          <Text style={[styles.text, { marginBottom: 10 }]}>
            ⭐ Évaluez cette chanson :
          </Text>
          <Rating currentRating={rating} onRate={rateSong} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    padding: 30,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 12,
    marginBottom: 25,
  },
  trackName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 4,
  },
  artistName: {
    fontSize: 16,
    color: "#94a3b8",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1e40af",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
