import React, {Component} from 'react';
import { StyleSheet, Image, ImageBackground, Text, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import BgSvg from '../assets/svg/acc_bg.svg'
import MailSvg from '../assets/svg/mail.svg';
import Swiper from 'react-native-swiper'
//import Swiper from 'swiper.js';

const dp = { uri: "https://instagram.fhkg4-2.fna.fbcdn.net/v/t51.2885-19/s150x150/46853264_2207226759604484_2017266248244527104_n.jpg?_nc_ht=instagram.fhkg4-2.fna.fbcdn.net&_nc_ohc=GrVcpz_laSUAX946mbe&tp=1&oh=63b1081997818194544de4e6379da0df&oe=600A4075"};


class ProfileScreen extends Component{
  render(){
    return (
      // <Swiper
      //   loop={false}
      //   horizontal={true}>
        <View style={styles.container}>
          {/* profile photo */}
          {/* <BgSvg style={styles.bg} /> */}
          <Image source={dp} style={styles.logo}></Image>
          
          {/* name and email */}
          <Text style={styles.name}>Ashley Francisco</Text>
          <View style={styles.mail}>
            {/* <MailSvg height={10} width={20} /> */}
            <Text>sanfrancisco.21@dartmouth.edu</Text>
          </View>
    
          {/* friends */}
          <Text style={styles.friends}>Friends</Text>
          
          <Text style={styles.name}>Update Profile</Text>
    
        </View>
      //</Swiper>
    );
  }
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Open Sans'
    },
    bg: {
      position: 'absolute',
      // flex: 1,
      // resizeMode: 'cover',
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0,
    },
    name: {
      color: '#000', 
      fontSize: 18, 
      fontWeight: "bold"
    },
    friends: {
      color: '#000', 
      fontSize: 18, 
      fontWeight: "bold", 
      alignSelf: 'flex-start',
      paddingHorizontal: 10
    },
    mail: {
      paddingVertical: 15,
      paddingHorizontal: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: 16
    },
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
})