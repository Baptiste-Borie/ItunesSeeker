import React from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { musicSelector } from "../../store/MusicSlice";
import TabSong from "./shared/TabSong";

export default function PlaylistScreen({ navigation }) {
  const music = useSelector(musicSelector);

  if (music.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Aucune musique dans la playlist</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={music}
        keyExtractor={(item) => Math.random().toString()}
        renderItem={({ item }) => (
          <TabSong object={item} navigation={navigation} origin={"playlist"} />
        )}
      />
    </View>
  );
}
