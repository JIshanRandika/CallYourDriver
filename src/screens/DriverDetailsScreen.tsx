import React, { useEffect, useState } from 'react';
import { View, Text, Button, Linking, StyleSheet } from 'react-native';
import { suggestDriver } from '../services/api';

export default function DriverDetailsScreen({ route }: any) {
  const { parkName, category } = route.params;
  const [driver, setDriver] = useState<any>(null);

  useEffect(() => {
    const fetchDriver = async () => {
      const response = await suggestDriver(parkName, category);
      setDriver(response.data);
    };
    fetchDriver();
  }, []);

  if (!driver) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Details</Text>
      <Text>Name: {driver.driver.name}</Text>
      <Text>Contact: {driver.driver.contactNumber}</Text>
      <Text>Vehicle: {driver.driver.vehicleNumber}</Text>
      <Button
        title="Call Driver"
        onPress={() => Linking.openURL(`tel:${driver.driver.contactNumber}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
