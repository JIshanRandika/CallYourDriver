import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getParks, getCategories } from '../services/api';

export default function HomeScreen({ navigation }: any) {
  const [parkName, setParkName] = useState<string>('');
  const [parks, setParks] = useState<string[]>([]);
  const [categories, setCategories] = useState<{ name: string; isDisabled: boolean }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parkData = await getParks();
        const categoryData = await getCategories();
        setParks(parkData.data.map((park: any) => park.name));
        setCategories(categoryData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategorySelection = (category: string) => {
    if (!parkName) {
      Alert.alert('Select Park', 'Please select a park before choosing a category.', [{ text: 'OK' }], { cancelable: true });
    } else {
      navigation.navigate('DriverDetails', { parkName, category });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F63AC" />
        <Text style={styles.loadingText}>Loading parks and categories...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Park</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={parkName} onValueChange={setParkName} style={styles.picker}>
          <Picker.Item label="Select a park" value="" />
          {parks.map((park) => (
            <Picker.Item label={park} value={park} key={park} />
          ))}
        </Picker>
      </View>

      <Text style={styles.title}>Select Category</Text>
      <View style={styles.categories}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.name}
            style={[styles.categoryButton, category.isDisabled && styles.disabledButton]}
            onPress={() => handleCategorySelection(category.name)}
            disabled={category.isDisabled}
          >
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E2C', padding: 20 },
  title: { fontSize: 24, fontWeight: '600', color: '#FFFFFF', marginBottom: 15, textAlign: 'center' },
  pickerContainer: { backgroundColor: '#2C2C3A', borderRadius: 10, overflow: 'hidden', marginBottom: 30, borderWidth: 1, borderColor: '#3A3A4B' },
  picker: { color: '#FFFFFF', fontSize: 16, paddingHorizontal: 10, paddingVertical: 10 },
  categories: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  categoryButton: { backgroundColor: '#4F63AC', paddingVertical: 15, paddingHorizontal: 20, borderRadius: 10, marginVertical: 8, alignItems: 'center', width: '48%' },
  categoryText: { color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
  disabledButton: { backgroundColor: '#A5A5A5' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1E1E2C' },
  loadingText: { marginTop: 10, color: '#B0B3B8', fontSize: 16 },
});
