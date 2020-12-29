import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LogoScreen from './src/components/logoscreen.js';
import WelcomeScreen from './src/components/welcomescreen.js';
import Swiper from 'react-native-swiper';



export default function App() {

  return (
    <Swiper
    loop={false}
    horizontal={true}>
      <LogoScreen />
      <WelcomeScreen />
    </Swiper>
    
  );
  
}
