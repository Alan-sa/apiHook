import React from 'react';
import {View, Text} from 'react-native';
import useApi from './useApi';

const WeatherScreen = () => {
  const {query} = useApi('/weather', 'get', null, 'my-token');

  if (query.isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (query.isError) {
    return (
      <View>
        <Text>Error: {query.error.message}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Temperature: {query.data.temp}°C</Text>
      <Text>Humidity: {query.data.humidity}%</Text>
    </View>
  );
};

export default WeatherScreen;
