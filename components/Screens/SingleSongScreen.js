import React from "react";
import { View, Text, Image, Button, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addMusic, updateRating } from "../../store/MusicSlice";
import { useState } from "react";
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Aucune chanson trouvée</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", padding: 50 }}>
      <Image
        source={{ uri: song.artworkUrl100 }}
        style={{ width: 150, height: 150, marginBottom: 20 }}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{song.trackName}</Text>
      <Text style={{ fontSize: 16, color: "gray" }}>{song.artistName}</Text>

      <Button
        title="Écouter un extrait"
        onPress={() => console.log("b:musique")}
      />

      <Button
        title="Voir l'album"
        onPress={() =>
          song.collectionId &&
          navigation.navigate("SingleAlbumScreen", {
            object: {
              collectionId: song.collectionId,
              collectionName: song.collectionName,
            },
          })
        }
      />

      <Button
        title="Voir l'artiste"
        onPress={() =>
          song.artistId &&
          navigation.navigate("SingleArtistScreen", {
            object: { artistId: song.artistId, artistName: song.artistName },
          })
        }
      />

      {origin !== "playlist" && (
        <Button title="Ajouter à la playlist" onPress={addToPlaylist} />
      )}

      {origin === "playlist" && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>Évaluez cette chanson :</Text>
          <Rating currentRating={rating} onRate={rateSong} />
        </View>
      )}
    </View>
  );
}
