import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { register } from '../services/api';

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Registration Failed', 'Passwords do not match');
      return;
    }
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
        placeholderTextColor="#B0B3B8"
      />
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
        style={styles.input}
        placeholderTextColor="#B0B3B8"
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#B0B3B8"
      />
      <TextInput
        placeholder="Confirm Password"
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#B0B3B8"
      />
      <TextInput
        placeholder="Contact Number"
        onChangeText={setContactNumber}
        style={styles.input}
        placeholderTextColor="#B0B3B8"
        keyboardType="phone-pad"
      />
      <Text style={styles.warn}>
        Please remember your username. You cannot change it after your registration.
      </Text>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Already have an account? <Text style={styles.loginText}>Log in</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2C',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#2C2C3A',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#3A3A4B',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  registerButton: {
    marginTop: 20,
    backgroundColor: '#4F63AC',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    color: '#9DA3B4',
    textAlign: 'center',
    fontSize: 16,
  },
  warn: {
    marginTop: 20,
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
  loginText: {
    color: '#4F63AC',
    fontWeight: '600',
  },
});
