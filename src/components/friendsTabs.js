import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { LinearGradient } from 'expo-linear-gradient';
import FriendRequestScreen from './friendRequests';
import FollowersScreen from './followersScreen';


const FirstRoute = () => (
    <LinearGradient
    colors={['#FFFFFF', '#D9D9D9']}
    style={{flex: 1}}/>
);
 
const SecondRoute = () => (
    <LinearGradient
    colors={['#FFFFFF', '#D9D9D9']}
    style={{flex: 1}}/>
);
 

const ThirdRoute = () => (
    <LinearGradient
    colors={['#FFFFFF', '#D9D9D9']}
    style={{flex: 1}}/>
);
 
const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'black'}}
      style={{ backgroundColor: '#E5E5E5'}}
      activeColor='black'
      inactiveColor='#838484'
      labelStyle={{fontFamily: 'AppleSDGothicNeo-Bold'}}
    />
);
  
const initialLayout = { width: Dimensions.get('window').width };
 
const TabViewExample =() => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Requests' },
    { key: 'second', title: 'Followers' },
  ]);
 
  const renderScene = SceneMap({
    first: FriendRequestScreen,
    second: FollowersScreen,
  });
 
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}
 
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

export default TabViewExample;