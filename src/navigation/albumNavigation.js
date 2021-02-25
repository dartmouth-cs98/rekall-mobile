import * as React from 'react';
import {StyleSheet, View, Text, Button } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import GalleryScreen from '../components/galleryscreen.js';
import AlbumDetail from '../components/albumDetail.js';

const AlbumStack = createStackNavigator()

function GalleryStackNav() {
    return (
        <AlbumStack.Navigator screenOptions={{headerShown: false}}>
          <AlbumStack.Screen name='AlbumDetail' component={AlbumDetail} />
        </AlbumStack.Navigator>
    )
  }
  
export default GalleryStackNav;