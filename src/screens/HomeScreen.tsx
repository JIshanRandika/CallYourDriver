import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Updated import
import { parks, categories } from '../data/data';

export default function HomeScreen({ navigation }: any) {
  const [parkName, setParkName] = useState<string>('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Park</Text>
      <Picker
        selectedValue={parkName}
        onValueChange={setParkName}
        style={styles.picker}
      >
        {parks.map((park) => (
          <Picker.Item label={park} value={park} key={park} />
        ))}
      </Picker>
      <Text style={styles.title}>Select Category</Text>
      <View style={styles.categories}>
        {categories.map((category) => (
          <Button
            key={category}
            title={category}
            onPress={() =>
              navigation.navigate('DriverDetails', { parkName, category })
            }
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    marginBottom: 20,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
