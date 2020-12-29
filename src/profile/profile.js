import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import styles from './styles.js';
import { SvgUri } from 'react-native-svg';
import BgSvg from './svg/acc_bg.svg'
import MailSvg from './svg/mail.svg';
import Swiper from './swiper.js';

const dp = { uri: "https://instagram.fhkg4-2.fna.fbcdn.net/v/t51.2885-19/s150x150/46853264_2207226759604484_2017266248244527104_n.jpg?_nc_ht=instagram.fhkg4-2.fna.fbcdn.net&_nc_ohc=GrVcpz_laSUAX946mbe&tp=1&oh=63b1081997818194544de4e6379da0df&oe=600A4075"};

export default function App() {
  return (
    <View style={styles.container}>
      {/* profile photo */}
      <BgSvg style={styles.bg} />
      <Image source={dp} style={styles.logo}></Image>
      
      {/* name and email */}
      <Text style={styles.name}>Ashley Francisco</Text>
      <View style={styles.mail}>
        <MailSvg height={10} width={20} />
        <Text>sanfrancisco.21@dartmouth.edu</Text>
      </View>

      {/* friends */}
      <Text style={styles.friends}>Friends</Text>
      <Swiper />
      <Text style={styles.name}>Update Profile</Text>

    </View>
  );
}