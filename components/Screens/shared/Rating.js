import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

export default function Rating({ currentRating, onRate }) {
  return (
    <View
      style={{ flexDirection: "row", marginTop: 10, justifyContent: "center" }}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => onRate(star)}>
          <Text
            style={{
              fontSize: 30,
              color: star <= currentRating ? "#FFD700" : "#ccc",
            }}
          >
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
