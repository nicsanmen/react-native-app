import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useEffect , useState } from 'react'
import * as Location from 'expo-location'

const HomeScreen = () => {

    const [displayCurrentAdress, setDisplayCurrentAdress] = useState("We are loading you current location...");
    const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);

    useEffect(() => {
       checkIfLocationEnabled();
       getCurrentLocation(); 
    },[]);

    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
            setLocationServicesEnabled(enabled);
            Alert.alert(
                'Location Services Disabled',
                'Please enable location services for this app in your settings.',
                [{ text: 'OK' }],
                { cancelable: false }
            )
        } else {
            setLocationServicesEnabled(enabled);
        }
    }

    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Permission not granted',
                'Allow the app to use location service.',
                [{ text: 'OK' }],
                { cancelable: false }
            )
        }
        const { coords } = await Location.getCurrentPositionAsync();
        console.log(coords);
        if (coords) {
            const { latitude, longitude } = coords;
            let response = await Location.reverseGeocodeAsync({ latitude, longitude });
            console.log(response);
            for (let item of response) {
                let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
                setDisplayCurrentAdress(address);
                break;
            }
            console.log('Display: ' + displayCurrentAdress);
        }
    }


  return (
    <SafeAreaView>
        <View>
            <Text>{displayCurrentAdress}</Text>
        </View>
      <Text>Home Screen</Text>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})