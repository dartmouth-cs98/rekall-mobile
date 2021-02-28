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
import CameraRollGallery from "react-native-camera-roll-gallery";
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { RNS3 } from 'react-native-aws3';
import axios from 'axios';


class MyAlbumDetail extends Component {
    constructor(props){
        super(props);
        this.state={
            albumName: this.props.route.params.albumName,
            albumMedia: [],
            friends: null,
            
        }
    }

    componentDidMount() {
        console.log("HEREHEHEHRHEHEHR");
        console.log(this.props);
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


    // renderSharingModal(){
    //     return(

    //     )
    // }
    // renderSharingOptions(){

    // }

    render(){
        return(
        // <LinearGradient
        // colors={['#FFFFFF', '#D9D9D9']}
        // style={{flex: 1}}>
            <View style={styles.container}>
                <View style={styles.firstContainer}>
                    <View style={styles.menuBox}>
                        <Text style={styles.headerText}>{this.state.albumName}</Text>
                        <TouchableOpacity style={styles.menuButton} onPress={()=> this.props.navigation.toggleDrawer()}>
                            <Image style={styles.image}
                                source={require('../assets/navbutton.png')}
                            />
                        </TouchableOpacity> 
                    </View>
                </View>
                <CameraRollGallery
                    enableCameraRoll={false} // default true
                    // Get data logic goes here.
                    // This will get trigger initially
                    // and when it reached the end
                    // if there is more.
                    onGetData={(fetchParams, resolve) => {
                        resolve({
                            assets: [
                                // NOTE THIS IS WHERE YOU WOULD PUT THE MEDIA THAT NEEDS TO BE RENDERED. SO ALBUM MEDIA GOES HERE
                                // Can be used with different image object fieldnames.
                                // Ex. source, source.uri, uri, URI, url, URL
                                { uri: "https://i.pinimg.com/originals/b2/ca/43/b2ca43656248156bb421f54594c397dc.jpg" },
                                // { source: require("yourApp/image.png"),
                                //     // IMPORTANT: It is REQUIRED for LOCAL IMAGES
                                //     // to include a dimensions field with the
                                //     // actual width and height of the image or
                                //     // it will throw an error.
                                //     dimensions: { width: 1080, height: 1920 } },
                                { source: { uri: "https://www.wearethemighty.com/app/uploads/legacy/assets.rbl.ms/23229881/origin.png" } },
                                { uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.melbournechildpsychology.com.au%2Fblog%2F5-productive-ways-for-parents-to-help-with-school-work%2F&psig=AOvVaw2Oa9U5l_2ZvmSIZm34Jhc_&ust=1614572481247000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIjhx6zdi-8CFQAAAAAdAAAAABAD" },
                                { URI: "https://cdn.vox-cdn.com/thumbor/9WQdjWjSF0bB0KYyBPcRXOZ1tL0=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/16204669/sb1.jpg" },
                                { url: "https://www.vive.com/media/filer_public/vive/product-listing/hero-vive-cosmos.png" },
                                { URL: "https://i.ytimg.com/vi/Kd0uT_0t3s4/maxresdefault.jpg" },
                            ],
                            pageInfo: {
                                hasNextPage: false
                            }
                        });
                    }}
                    height={800}
                />
                <View style={styles.bottomContainer}>
                    <View style={styles.buttonBox}>
                        <Icon name='arrow-left' size={70} type='evilicon' color='#686868'
                        onPress={()=> this.props.navigation.goBack()}></Icon>
                        <Icon style={styles.plusIcon} name='plus' size={80} type='evilicon' color='#686868'
                        onPress={this._pickVideo}></Icon>
                        <Icon name='person-add-outline' size={50} type='ionicon' color='#686868'
                        onPress={()=> console.log("Share")}></Icon>
                    </View>
                </View>
            </View>
        //</LinearGradient>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: '#F2F1F1',
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
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
    },
    plusIcon:{
        // height: 50,
        // width: 60,
        //backgroundColor: 'red',
        // alignSelf: 'center',
        // shadowOffset:{  width: 1, height: 4},
        // shadowColor: 'black',
        // shadowOpacity: 0.8,
        // shadowColor: 'grey',
        // shadowOffset: { width: 1, height: 4},
        // shadowRadius: 5,
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