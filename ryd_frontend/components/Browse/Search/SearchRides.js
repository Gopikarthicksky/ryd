import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native-web';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

const SearchRide = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  const handleCreateRide = () => {
    // Here you would typically make a request to your backend to create the ride
    console.log(`Creating ride from ${source} to ${destination}`);
  };

  return (
    <View style={styles.container}>
      <Text>Source:</Text>
      <TextInput
        style={styles.input}
        value={source}
        onChangeText={setSource}
      />
      <Text>Destination:</Text>
      <TextInput
        style={styles.input}
        value={destination}
        onChangeText={setDestination}
      />
      <Button title="Create Ride" onPress={handleCreateRide} />
    </View>
  );
};

export default SearchRide;