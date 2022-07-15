// In App.js in a new project

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PokemonDetail from './screens/PokemonDetail';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {store, persistor} from './store/store';
import {PersistGate} from 'redux-persist/integration/react';
import HomeScreen from './screens/HomeScreen';
import SearchPokemon from './screens/SearchPokemon';
import FavoritePokemon from './screens/FavoritePokemon';
import PokemonTypeScreen from './screens/PokemonTypeScreen';
const Stack = createNativeStackNavigator();

function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={'HomeScreen'}
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="MyTabs" component={HomeScreen} />
            <Stack.Screen name="PokemonDetail" component={PokemonDetail} />
            <Stack.Screen name="SearchPokemon" component={SearchPokemon} />
            <Stack.Screen name="FavoritePokemon" component={FavoritePokemon} />
            <Stack.Screen
              name="PokemonTypeScreen"
              component={PokemonTypeScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
