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




const Drawer = createDrawerNavigator();

function MyDrawer() {
    const isLargeScreen = useWindowDimensions();
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerType={styles.drawer} >
                <Drawer.Screen name="EXPLORE" component={ExploreScreen} />
                <Drawer.Screen name="GALLERY" component={GalleryScreen} />
                <Drawer.Screen name="FRIENDS" component={GalleryScreen}/>
                <Drawer.Screen name="MY PROFILE" component={GalleryScreen}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    drawer: {
        backgroundColor: '#E5E5E5',
    },
});


export default MyDrawer;