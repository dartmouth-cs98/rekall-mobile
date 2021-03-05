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
 
const VideoDetailTabs =(props) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'My Albums'},//, updateAlbums: updateAlbums, albums: myalbumNames, video: videoid},
    { key: 'second', title: 'Shared Albums'}//, updateAlbums: updateAlbums, albums: sharedalbumNames, video: videoid},
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <MyAlbumRoute video={props.videoid} />;
      case 'second':
        return <SharedAlbumRoute video={props.videoid} />;
      default:
        return null;
    }
  };

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