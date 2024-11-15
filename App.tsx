import React from 'react';
import { TouchableOpacity, Text, Linking, View, Alert } from 'react-native';
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

  const openWhatsApp = () => {
    const phoneNumber = '+94715757700'; // Replace with your support WhatsApp number
    const message = 'Hello, I need support with the app';
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Could not open WhatsApp');
    });
  };

  const SupportButton = () => (
    <TouchableOpacity onPress={openWhatsApp} style={{ marginRight: 10 }}>
      <Text style={{ color: '#FFF', fontSize: 25, fontWeight: '500' }}>👩‍✈</Text>
    </TouchableOpacity>
  );

  const LogoutButton = ({ navigation }: { navigation: any }) => (
    <TouchableOpacity
      onPress={() => handleLogout(navigation)}
      style={{
        backgroundColor: '#4F63AC',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
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
            headerRight: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <SupportButton />
                <LogoutButton navigation={navigation} />
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="DriverDetails"
          component={DriverDetailsScreen}
          options={({ navigation }) => ({
            title: 'Driver Details',
            headerRight: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <SupportButton />
                <LogoutButton navigation={navigation} />
              </View>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
