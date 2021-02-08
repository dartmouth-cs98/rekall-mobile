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
import ExploreScreen from '../components/explorescreen.js';
import GalleryScreen from '../components/galleryscreen.js';
import ProfileScreen from '../components/profilescreen.js';
import FriendsScreen from '../components/friendsscreen.js';
import LoginScreen from '../components/loginScreen.js';
import Signup from '../components/signup.js';
import Login from '../components/login.js';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MyDrawer = () => {
    return(
        <Drawer.Navigator 
        drawerStyle={styles.drawer} 
        drawerContentOptions={{
            activeTintColor: '#3E3E3E',
            itemStyle: {marginVertical: 15},
            labelStyle: {justifyContent: 'center',
            fontFamily: 'AppleSDGothicNeo-Bold',
            color: '#2C2C2C',
            fontSize: 26,
            paddingBottom: 5,
            fontWeight: "bold",
            textShadowColor: 'grey',
            textShadowOffset: { width: 1, height: 2},
            textShadowRadius: 5}
        }}
        >
            <Drawer.Screen name="EXPLORE" component={ExploreScreen} />
            <Drawer.Screen name="GALLERY" component={GalleryScreen} />
            <Drawer.Screen name="FRIENDS" component={FriendsScreen}/>
            <Drawer.Screen name="MY PROFILE" component={ProfileScreen}/>
        </Drawer.Navigator>
    );
  }

function MyNav() {
    const isLargeScreen = useWindowDimensions();
    
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Entry" component={LoginScreen} />
                <Stack.Screen name="Drawer" component={MyDrawer} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    drawer: {
        backgroundColor: '#E5E5E5',
        width: 430,
    },
});


export default MyNav;