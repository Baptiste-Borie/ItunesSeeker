import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";

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
        dataSongs.results.filter((item) => item.wrapperType === "track")
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Aucun artiste trouvé</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        {artist.artistName}
      </Text>

      <Text style={{ fontSize: 20, marginTop: 20, fontWeight: "bold" }}>
        Meilleurs Titres
      </Text>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.trackId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SingleSongScreen", {
                object: item,
                origin: "artist",
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
              <Text style={{ fontSize: 16 }}>{item.trackName}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Text style={{ fontSize: 20, marginTop: 20, fontWeight: "bold" }}>
        Meilleurs Albums
      </Text>
      <FlatList
        data={albums}
        keyExtractor={(item) => item.collectionId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SingleAlbumScreen", { object: item })
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
              <Image
                source={{ uri: item.artworkUrl60 }}
                style={{ width: 50, height: 50, marginRight: 10 }}
              />
              <Text style={{ fontSize: 16 }}>{item.collectionName}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
