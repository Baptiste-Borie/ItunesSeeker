import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./store/store";

import SearchBarScreen from "./components/Screens/SearchBarScreen";
import SingleSongScreen from "./components/Screens/SingleSongScreen";
import PlaylistScreen from "./components/Screens/PlaylistScreen";
import SingleAlbumScreen from "./components/Screens/SingleAlbumScreen";
import SingleArtistScreen from "./components/Screens/SingleArtistScreen";

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function HomeTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="SearchBar"
          component={SearchBarScreen}
          options={{ title: "Recherche" }}
        />
        <Tab.Screen
          name="PlaylistScreen"
          component={PlaylistScreen}
          options={{ title: "Playlist" }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SingleSongScreen"
            component={SingleSongScreen}
            options={{ title: "Détails de la chanson" }}
          />
          <Stack.Screen
            name="SingleAlbumScreen"
            component={SingleAlbumScreen}
            options={{ title: "Détails de l'album" }}
          />
          <Stack.Screen
            name="SingleArtistScreen"
            component={SingleArtistScreen}
            options={{ title: "Détails de l'artiste" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
