import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { parks, categories } from '../data/data';

export default function HomeScreen({ navigation }: any) {
  const [parkName, setParkName] = useState<string>('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Park</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={parkName}
          onValueChange={setParkName}
          style={styles.picker}
        >
          {parks.map((park) => (
            <Picker.Item label={park} value={park} key={park} />
          ))}
        </Picker>
      </View>

      <Text style={styles.title}>Select Category</Text>
      <View style={styles.categories}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={styles.categoryButton}
            onPress={() =>
              navigation.navigate('DriverDetails', { parkName, category })
            }
          >
            <Text style={styles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2C', // Dark background for a modern look
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  pickerContainer: {
    backgroundColor: '#2C2C3A',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#3A3A4B',
  },
  picker: {
    color: '#FFFFFF',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    backgroundColor: '#4F63AC', // Primary color for buttons
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
    width: '48%', // Set width for consistent button size
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});
