import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MyAlbumRoute from '../components/myAlbumAdd.js';
import SharedAlbumRoute from '../components/sharedAlbumAdd.js';

 
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
 
const VideoDetailTabs =(updateAlbums, albumNames) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'My Albums', updateAlbums: updateAlbums, albums: albumNames},
    { key: 'second', title: 'Shared Albums', updateAlbums: updateAlbums, albums: albumNames},
  ]);
 
  const renderScene = SceneMap({
    first: MyAlbumRoute,
    second: SharedAlbumRoute,
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

export default VideoDetailTabs;