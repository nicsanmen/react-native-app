import { View, Text, ScrollView, Pressable, Image } from 'react-native'
import React from 'react'

const Services = () => {

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
      <View style={{padding:10}}>
        <Text>Services availables</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Services.map((service, index) => (
            <Pressable style={{margin:10, alignItems:'center'}} key={index}>
              <Image source={{uri: service.image}} style={{width:70, height:70}}/>
              <Text style={{ fontSize:12, fontWeight:500, color:'#A43434' }}>{service.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
  )
}


export default Services
