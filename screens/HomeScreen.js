import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, TextInput } from 'react-native'
import React, { useEffect , useState } from 'react'
import * as Location from 'expo-location'
import { Ionicons } from '@expo/vector-icons';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import DressItem from '../components/DressItem';

const HomeScreen = () => {

    const [displayCurrentAdress, setDisplayCurrentAdress] = useState("We are loading you current location...");
    const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);

    useEffect(() => {
    //    checkIfLocationEnabled();
    //    getCurrentLocation(); 
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
        if (coords) {
            const { latitude, longitude } = coords;
            let response = await Location.reverseGeocodeAsync({ latitude, longitude });
            for (let item of response) {
                let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
                setDisplayCurrentAdress(address);
                break;
            }
        }
    }
    const services = [
        {
            id: "0",
            image: "https://img.icons8.com/?size=512&id=30213&format=png",
            name: "Washing Machine",
        },
        {
            id: "1",
            image: "https://img.icons8.com/?size=512&id=122653&format=png",
            name: "Laundry Bag",
        },
        {
            id: "2",
            image: "https://img.icons8.com/?size=512&id=0yEi6sT2uvKv&format=png",
            name: "Dryer Machine",
        },
    ];


  return (
    <SafeAreaView style={{backgroundColor:"#F0F0F0",flex:1}}>
        {/* Location and Profile */}
        <View style={{flexDirection:"row", alignItems:"center", padding:10, paddingTop:50}}>
            <Ionicons name="location-sharp" size={24} color="#fd5c63" />
            <View>
                <Text style={{fontSize:18, fontWeight:"600"}}>Home</Text>
                <Text>{displayCurrentAdress}</Text>
            </View>

            <Pressable style={{marginLeft:"auto", marginRight:7}}>
                <Image 
                style={{ width  :50, height:50,borderRadius:25}} 
                source={{
                    uri: "https://i.pinimg.com/564x/e0/e2/8a/e0e28acf97e84b001e858e19c10bf3a9--spongebob-memes-spongebob-squarepants.jpg",
                }} 
                />
            </Pressable>
        </View>

        {/* Search Bar */}
        <View style={{padding:10, flexDirection:"row", alignItems:"center", backgroundColor:"#eee", marginHorizontal:20, borderRadius:7}}>
            <Ionicons name="search" size={20} color="#fd5c63" />
            <TextInput placeholder="Search for items" style={{fontSize:15, fontWeight:"60", marginLeft:10}}></TextInput>
        </View>

        {/* Carousel */}
        <Carousel />

        {/* Services */}
        <Services />

        {/* Render all the products */}
        {services.map((service, index) => (
            <DressItem item={item} key={index} />    
        ))}

    </SafeAreaView>
  )
}


export default HomeScreen

const styles = StyleSheet.create({})