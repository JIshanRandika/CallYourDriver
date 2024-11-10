import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { login } from '../services/api';

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Login Failed', 'Please check your credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        Don’t have an account? Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  link: {
    marginTop: 10,
    color: 'blue',
    textAlign: 'center',
  },
});
