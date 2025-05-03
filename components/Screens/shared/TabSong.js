import React from "react";
import { Text, Image, TouchableOpacity, View, StyleSheet } from "react-native";

export default function TabSong({ object, navigation, origin, filter }) {
  const renderText = () => {
    switch (filter) {
      case "song":
        return `${object.trackName} - ${object.artistName}`;
      case "album":
        return `${object.collectionName} - ${object.artistName}`;
      case "musicArtist":
        return object.artistName;
      default:
        return `${object.trackName} - ${object.artistName}`;
    }
  };

  const navigateToScreen = () => {
    if (filter === "album") {
      navigation.navigate("SingleAlbumScreen", { object, origin });
    } else if (filter === "musicArtist") {
      navigation.navigate("SingleArtistScreen", { object, origin });
    } else {
      navigation.navigate("SingleSongScreen", { object, origin });
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={navigateToScreen}>
      {filter !== "musicArtist" && (
        <Image source={{ uri: object.artworkUrl100 }} style={styles.image} />
      )}

      <View style={styles.textContainer}>
        <Text numberOfLines={2} style={styles.text}>
          {renderText()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
    backgroundColor: "#1e293b",
    borderRadius: 8,
    marginBottom: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flexShrink: 1,
  },
  text: {
    fontSize: 16,
    color: "#f1f5f9",
    fontWeight: "500",
  },
});
