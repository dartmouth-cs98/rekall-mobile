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
import { addUserAlbum, addSharedAlbum, getAlbums, getSharedAlbums } from '../actions/albumActions';


class VideoDetail extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate.goBack()} >
                <View style={styles.container}><Text style={styles.dummyText}>Video Detail!</Text></View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 800,
        backgroundColor: 'green',
        justifyContent: 'center',
    },
    dummyText: {
        textAlign: 'center',
    }
})



export default VideoDetail;


    