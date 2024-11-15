import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import DriverDetailsScreen from './src/screens/DriverDetailsScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';


const Stack = createStackNavigator();

const App = () => {
  const handleLogout = async (navigation: any) => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  const LogoutButton = ({ navigation }: { navigation: any }) => (
    <TouchableOpacity
      onPress={() => handleLogout(navigation)}
      style={{
        backgroundColor: '#4F63AC',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginRight: 10,
      }}
    >
      <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '500' }}>Logout</Text>
    </TouchableOpacity>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1E1E2C',
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Select Options',
            headerRight: () => <LogoutButton navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="DriverDetails"
          component={DriverDetailsScreen}
          options={({ navigation }) => ({
            title: 'Driver Details',
            headerRight: () => <LogoutButton navigation={navigation} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
