import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import MyAlbumRoute from './myAlbumAdd.js';
import SharedAlbumRoute from './sharedAlbumAdd.js';

 
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
 
const VideoDetailTabs =(videoId, nav) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', navigation: nav, title: 'My Albums', videoId: videoId},
    { key: 'second', navigation: nav, title: 'Shared Albums', videoId: videoId},
  ]);

  const renderScene = SceneMap({
    first: MyAlbumRoute,
    second: SharedAlbumRoute,
  });

  // const renderScene = ({ route }) => {
  //   switch (route.key) {
  //     case 'first':
  //       return <MyAlbumRoute video={props.videoid} />;
  //     case 'second':
  //       return <SharedAlbumRoute video={props.videoid} />;
  //     default:
  //       return null;
  //   }
  

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