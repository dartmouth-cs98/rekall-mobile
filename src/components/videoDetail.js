import React, {Component} from 'react';
//import FontAwesome from 'FontAwesome';
// import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground, FlatList, PanResponder, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import { Icon } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import { LinearTextGradient } from 'react-native-text-gradient';
import { NavigationContainer } from '@react-navigation/native';
import youtubeSearch from './youtube_api.js';
import axios from 'axios';
import { connect } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import { WebView } from 'react-native-webview';
import { addUserAlbum, addSharedAlbum, getAlbums, getSharedAlbums } from '../actions/albumActions';


class VideoDetail extends Component {
    constructor(props){
        super(props);
        this.state={
            video: this.props.route.params.video,
        }
    }

    renderLoadingView() {
        return (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
    }


    render(){
        const { videoId } = this.state.video.id
        return(
            <LinearGradient
            colors={['#FFFFFF', '#D9D9D9']}
            style={{flex: 1}}>
                <View style={styles.videoContainer}>
                    <WebView
                    source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
                    automaticallyAdjustContentInsets={false}
                    startInLoadingState={true}
                    renderLoading={() => this.renderLoadingView()}
                    containerStyle={{flex: 0, height: 200}}
                    />
                </View>
            </LinearGradient>
            
            // <TouchableOpacity onPress={() => this.props.navigation.navigate.goBack()} >
            //     <View style={styles.container}><Text style={styles.dummyText}>Video Detail!</Text></View>
            // </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    videoContainer: {
        flex: 1,
        //height: 500,
        //backgroundColor: 'green',
        justifyContent: 'center',
    },
    dummyText: {
        textAlign: 'center',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})



export default VideoDetail;    