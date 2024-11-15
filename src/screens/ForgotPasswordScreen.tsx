import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { resetPassword } from '../services/api'; // API call for password reset

export default function ForgotPasswordScreen({ navigation }: any) {
  const [username, setUsername] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      await resetPassword(username, newPassword);
      Alert.alert('Success', 'Password has been reset', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'), // Redirect to login screen
        },
      ]);
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'Could not reset password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
        style={styles.input}
        placeholderTextColor="#B0B3B8"
      />
      <TextInput
        placeholder="New Password"
        onChangeText={setNewPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#B0B3B8"
      />
      <TextInput
        placeholder="Confirm New Password"
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#B0B3B8"
      />
      <TouchableOpacity style={styles.resetButton} onPress={handlePasswordReset}>
        <Text style={styles.resetButtonText}>Reset Password</Text>
      </TouchableOpacity>
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
  resetButton: {
    backgroundColor: '#4F63AC',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
