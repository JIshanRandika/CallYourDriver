import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { register } from '../services/api';

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');

  const handleRegister = async () => {
    try {
      await register(name, username, password, contactNumber);
      Alert.alert('Registration Successful', 'Please log in');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Registration Failed', 'Please try again');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        placeholder="Name"
        onChangeText={setName}
        style={styles.input}
      />
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
      <TextInput
        placeholder="Contact Number"
        onChangeText={setContactNumber}
        style={styles.input}
      />
      <Button title="Register" onPress={handleRegister} />
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
});
