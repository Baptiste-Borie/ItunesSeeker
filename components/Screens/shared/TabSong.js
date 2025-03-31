import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";

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

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#ccc",
      }}
      onPress={() =>
        navigation.navigate("SingleSongScreen", {
          song: object,
          origin: origin,
        })
      }
    >
      {(filter === "song" || filter === "album") && (
        <Image
          source={{ uri: object.artworkUrl100 }}
          style={{
            width: 50,
            height: 50,
            marginRight: 10,
            borderRadius: 5,
          }}
        />
      )}

      <Text
        style={{
          fontSize: 16,
          marginLeft: filter === "musicArtist" ? 0 : 10,
        }}
      >
        {renderText()}
      </Text>
    </TouchableOpacity>
  );
}
