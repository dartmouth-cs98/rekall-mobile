import * as React from 'react';
import {StyleSheet, View, Text, Button } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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

const Drawer = createDrawerNavigator();

function MyDrawer() {
    const isLargeScreen = useWindowDimensions();
    return (
        <NavigationContainer>
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
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    drawer: {
        backgroundColor: '#E5E5E5',
        width: 430,
    },
});


export default MyDrawer;