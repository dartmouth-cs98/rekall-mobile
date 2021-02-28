import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchUserInfo } from '../actions/userActions';
import { addUserAlbum, addSharedAlbum, getAlbums, getSharedAlbums } from '../actions/albumActions';
//import FontAwesome from 'FontAwesome';
// import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, ActivityIndicator,
    PanResponder, Alert, ActionSheetIOS} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import { Icon } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import { LinearTextGradient } from 'react-native-text-gradient';
import { NavigationContainer } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { RNS3 } from 'react-native-aws3';
import axios from 'axios';


class MyAlbumDetail extends Component {
    constructor(props){
        super(props);
        this.state={
            dummyName: 'GrOOvy',
            albumContents: [],
            friends: null,
        }
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        await this.props.fetchUserInfo(this.props.user.uid).then(() => {
            this.setState({
                friends: this.props.user.friends,
            });
        });
    }

    addMedia = async (userID, s3Key, mediaType, albumID, albumType) => {
        if (albumType == "User") {
            const url = `${API}/album/addMediaToAlbum`
        }
        else {
            const url = `${API}/album/addMediaToShared`
        }
        axios.put(`${API}/album/addMediaToLibrary`,
            { 
                "_id": userID,
                "s3Key": s3Key,
                "mediaType": mediaType
            }).then((res) => {
                axios.put(url,
                    { 
                        "album": {
                            "_id": albumID,
                        },
                        "media": {
                            "_id": res._id,
                        },
                    },
                ).then((res) => {
                    this.loadData();
                })
            }).catch((e) => {
                console.log(`Error putting media: ${e}`);
            });
    }

    /*
    Function to allow picking a video from camera roll and uploading it
    */
    _pickVideo = async (name, albumID, albumType) => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        });
        
        if (!result.cancelled) {
            const file = {
                uri: result.uri,
                name: `${name}.mov`,
                type: "video/quicktime"
            };
            
            const options = {
                // keyPrefix: this.props.user.uid + "/media/",
                keyPrefix: this.props.user.uid + "/media/",
                bucket: "rekall-storage",
                region: "us-east-1",
                accessKey: "AKIAQWWJHNTC6ZC2JFH3",
                secretKey: "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",
                // accessKey: AWS_ACCESS_KEY_ID,
                // secretKey: AWS_SECRET_ACCESS_KEY,
                successActionStatus: 201
            };

            return RNS3.put(file, options)
            .then(response => {
                if (response.status !== 201) {
                    throw new Error("Failed to upload video to S3");
                }
                else {
                    console.log(
                        "Successfully uploaded video to s3. s3 bucket url: ",
                        response.body.postResponse.location
                    );
                    this.addMedia(this.props.user.uid, response.body.postResponse.location, "mov", albumID, albumType)
                    .then(() => {
                        this.loadData();
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
        console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    // renderSharingOptions(){

    // }

    render(){
        return(
        <LinearGradient
        colors={['#FFFFFF', '#D9D9D9']}
        style={{flex: 1}}>
            <View style={styles.container}>
                <View style={styles.firstContainer}>
                    <View style={styles.menuBox}>
                        <Text style={styles.headerText}>{this.state.dummyName}</Text>
                        <TouchableOpacity style={styles.menuButton} onPress={()=> this.props.navigation.toggleDrawer()}>
                            <Image style={styles.image}
                                source={require('../assets/navbutton.png')}
                            />
                        </TouchableOpacity> 
                    </View>
                </View>
                
                <View style={styles.bottomContainer}>
                    <View style={styles.buttonBox}>
                        <Icon name='arrow-left' size={60} type='evilicon' color='#686868'
                        onPress={()=> console.log("GO back to gallery")}></Icon>
                        <Icon name='share-apple' size={60} type='evilicon' color='#686868'
                        onPress={()=> console.log("Share")}></Icon>
                        <Icon style={styles.plusIcon} name='plus' size={60} type='evilicon' color='#686868'
                        onPress={this._pickVideo}></Icon>
                    </View>
                </View>
            </View>
        </LinearGradient>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
    },
    firstContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        height: 150,
        //backgroundColor: 'green',
        alignContent: 'flex-end',
    },
    menuBox:{
        height: 100,
        width: 380,
        //backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    
    menuButton:{
        alignSelf: 'center',
    },
    image:{
        height: 60,
        width: 50,
        alignSelf: 'center',
    },
    headerText:{
        alignSelf: 'center',
        fontFamily: 'AppleSDGothicNeo-Bold',
        color: '#2C2C2C',
        fontSize: 22,
        paddingBottom: 5,
        fontWeight: "bold",
        textShadowColor: 'grey',
        textShadowOffset: { width: 1, height: 4},
        textShadowRadius: 5,
    },
    bottomContainer: {
        height:  150,
        //backgroundColor: '#C4C4C4',
        alignContent: 'center',
        justifyContent: 'center',
        //opacity: 0.6,
        //paddingRight: 20,
    },
    buttonBox: {
        height: 60,
        width: 400,
        //backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
    },
    plusIcon:{
        height: 50,
        width: 60,
        //backgroundColor: 'red',
    }

});


const mapStateToProps = (state) => {
    return {
      user: state.user,
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        UpdateUserAlbums: (user, useralbum) => dispatch(addUserAlbum(user, useralbum)),
        UpdateSharedAlbums: (user, sharedalbum, sharedwith) => dispatch(addSharedAlbum(user, sharedalbum, sharedwith)),
        fetchUserInfo: (userID) => dispatch(fetchUserInfo(userID)),
        getAlbums: (userID) => dispatch(getAlbums(userID)),
        getSharedAlbums: (userID) => dispatch(getSharedAlbums(userID))
    };
};

//export default MyAlbumDetail;
export default connect(mapStateToProps, mapDispatchToProps)(MyAlbumDetail);