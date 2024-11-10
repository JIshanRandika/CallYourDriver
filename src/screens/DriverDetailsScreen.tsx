import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, ActivityIndicator } from 'react-native';
import { suggestDriver } from '../services/api';

export default function DriverDetailsScreen({ route }: any) {
  const { parkName, category } = route.params;
  const [driver, setDriver] = useState<any>(null);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const response = await suggestDriver(parkName, category);
        if (response.data && response.data.driver) {
          setDriver(response.data);
        } else {
          setDriver(null);  // If no driver is available
        }
      } catch (error) {
        console.error("Error fetching driver:", error);
        setDriver(null);  // If there's an error, set driver to null
      }
    };
    fetchDriver();
  }, [parkName, category]);

  if (driver === null) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Drivers currently not available</Text>
      </View>
    );
  }

  if (!driver) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F63AC" />
        <Text style={styles.loadingText}>Fetching driver details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Details</Text>
      <View style={styles.driverCard}>
        <Text style={styles.detailText}>Name: <Text style={styles.detailValue}>{driver.driver.name}</Text></Text>
        <Text style={styles.detailText}>Contact: <Text style={styles.detailValue}>{driver.driver.contactNumber}</Text></Text>
        <Text style={styles.detailText}>Vehicle: <Text style={styles.detailValue}>{driver.driver.vehicleNumber}</Text></Text>
      </View>
      <TouchableOpacity
        style={styles.callButton}
        onPress={() => Linking.openURL(`tel:${driver.driver.contactNumber}`)}
      >
        <Text style={styles.callButtonText}>Call Driver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2C',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  driverCard: {
    backgroundColor: '#2C2C3A',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  detailText: {
    fontSize: 18,
    color: '#B0B3B8',
    marginBottom: 10,
  },
  detailValue: {
    fontWeight: '500',
    color: '#FFFFFF',
  },
  callButton: {
    backgroundColor: '#4F63AC',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E2C',
  },
  loadingText: {
    marginTop: 10,
    color: '#B0B3B8',
    fontSize: 16,
  },
});
