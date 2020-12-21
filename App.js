import React from 'react';
import { StyleSheet, Button, Image, Icon, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      {/* profile photo */}
      <Image source={{ uri: "https://instagram.fhkg4-2.fna.fbcdn.net/v/t51.2885-19/s150x150/46853264_2207226759604484_2017266248244527104_n.jpg?_nc_ht=instagram.fhkg4-2.fna.fbcdn.net&_nc_ohc=GrVcpz_laSUAX946mbe&tp=1&oh=63b1081997818194544de4e6379da0df&oe=600A4075" }} style={styles.logo} />
      
      {/* name and email */}
      <Text style={{color: '#000', fontSize: 18, fontWeight: "bold"}}> 
        Ashley Francisco
      </Text>
      <View style={{
            paddingVertical: 15,
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <Image source={{ uri: "https://i.pinimg.com/originals/bb/18/bd/bb18bdbbef437b2d50518db5a8292c94.png" }} style={styles.icon} />
            <Text style={{
                    fontSize: 16,
                    color: "black"
                }}> ashfran.21@dartmouth.edu</Text>
      </View>
      <Text style={{color: '#000', fontSize: 18, fontWeight: "bold", alignSelf: 'flex-start'}}>           Friends</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // friends: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'flex-start',
  //   justifyContent: 'center',
  // },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 15,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  }, 
});