import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchUserInfo } from '../actions/userActions';
import { addUserAlbum, addSharedAlbum, getAlbums, getSharedAlbums } from '../actions/albumActions';
import { banVideo } from '../actions/friendActions';
//import FontAwesome from 'FontAwesome';
// import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList, Animated, ImageBackground, ActivityIndicator,
    PanResponder, Alert, ActionSheetIOS} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
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
import * as VideoThumbnails from 'expo-video-thumbnails';
import SmartGallery from "react-native-smart-gallery";
// import ImageLayout from "react-native-image-layout";
import { arrayOf } from 'prop-types';

const API = 'https://rekall-server.herokuapp.com';

class MyAlbumDetail extends Component {
    constructor(props){
        super(props);
        this.state={
            albumName: this.props.route.params.albumName,
            albumMedia: this.props.route.params.albumMedia,
            albumID: this.props.route.params.albumID,
            useralbums: this.props.route.params.useralbums,
            sharedalbums: this.props.route.params.sharedalbums,
            friends: null,
            sharedWith: [],
            isSharedAlbum: false,
            albumType: null,
            url: null,
            isModalVisible: false,
            countries: ['uk'],
            refresh: true,
            animatedValue: null,
        }
    }

    componentDidMount() {
        // console.log("HEREHEHEHRHEHEHR");
        // console.log(this.props);
        this.loadData();
        // console.log(this.state.isSharedAlbum)
    }


    async loadData() {
        await this.props.fetchUserInfo(this.props.user.uid).then(() => {
            this.setState({
                friends: this.props.user.friends,
            });
        });
        await this.props.getAlbums(this.props.user.uid);
        await this.props.getSharedAlbums(this.props.user.uid);
        var sharedAlbums = this.props.user.sharedAlbums;
        var albumName = this.props.route.params.albumName;
        if (sharedAlbums.some(e => e.albumName === albumName)) {
            this.setState({
                isSharedAlbum: true,
                albumType: "Shared",
                url: `${API}/album/addMediaToShared`
            });
            let sharedAlbum = sharedAlbums.find( album => album['albumName'] === albumName );
            this.setState({
                sharedWith: sharedAlbum.sharedWith,
            });
        }
        else{
            this.setState({
                isSharedAlbum: false,
                albumType: "User",
                url: `${API}/album/addMediaToAlbum`
            });
        };
    }

    addMedia = async (userID, mediaURL, mediaType, albumID, albumType) => {
        axios.put(`${API}/album/addMediaToLibrary`,
            { 
                "userID": userID,
                "mediaURL": mediaURL,
                "mediaType": mediaType
            }).then((res) => {
                axios.put(this.state.url,
                    { 
                        "album": {
                            "_id": albumID,
                        },
                        "media": {
                            "_id": res.data._id,
                        },
                    },
                ).then((res) => {
                    this.loadData().then(() => {
                        this.props.navigation.goBack();
                    });
                })
            }).catch((e) => {
                console.log(`Error putting media: ${e}`);
            });
    }

    /*
    Function to allow picking a video from camera roll and uploading it
    */
    _pickVideo = async () => {
        let name = new Date().getTime();

        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        });
        
        if (!result.cancelled) {
            let temp_thumbnail = await VideoThumbnails.getThumbnailAsync(result.uri, { time: 3000, });
            const file = {
                uri: result.uri,
                name: `${name}.mov`,
                type: "video/quicktime"
            };

            const thumbnail = {
                uri: temp_thumbnail.uri,
                name: `${name}.png`,
                type: "image/png"
            };
            
            const fileoptions = {
                keyPrefix: this.props.user.uid + "/media/",
                bucket: "rekall-storage",
                region: "us-east-1",
                accessKey: "AKIAQWWJHNTC6ZC2JFH3",
                secretKey: "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",
                // accessKey: AWS_ACCESS_KEY_ID,
                // secretKey: AWS_SECRET_ACCESS_KEY,
                successActionStatus: 201
            };

            const thumbnailoptions = {
                keyPrefix: this.props.user.uid + "/Thumbnails/",
                bucket: "rekall-storage",
                region: "us-east-1",
                accessKey: "AKIAQWWJHNTC6ZC2JFH3",
                secretKey: "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",
                // accessKey: AWS_ACCESS_KEY_ID,
                // secretKey: AWS_SECRET_ACCESS_KEY,
                successActionStatus: 201
            };

            return RNS3.put(file, fileoptions)
            .then(response => {
                if (response.status !== 201) {
                    throw new Error("Failed to upload video to S3");
                }
                else {
                    console.log(
                        "Successfully uploaded video to s3. s3 bucket url: ",
                        response.body.postResponse.location
                    );
                    let videobucket = response.body.postResponse.location;
                    return RNS3.put(thumbnail, thumbnailoptions)
                    .then(response => {
                        if (response.status !== 201) {
                            throw new Error("Failed to upload thumbnail to S3");
                        }
                        else {
                            console.log(
                                "Successfully uploaded thumbnail to s3. s3 bucket url: ",
                                response.body.postResponse.location
                            );
                            this.addMedia(this.props.user.uid, videobucket, "mov", this.state.albumID, this.state.albumType).then(() => {
                                this.loadData();
                            });
                        }
                    })
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
        // console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    toggleModal(){
        console.log("In toggleModal")
        if (this.state.isModalVisible){
            this.setState({isModalVisible: false});
            //console.log(this.state.isModalVisible)
        }
        else{
            this.setState({isModalVisible: true})
            //console.log(this.state.isModalVisible)
        }
    }

    addSharedWith = async (albumID, friendEmail, userID) => {
        axios.put(`${API}/album/addSharedWith`,
            { 
                "albumID": albumID,
                "friendEmail": friendEmail,
                "userID": userID
            }).then(() => {
                this.loadData();
            });
    }

    renderFriend( {item} ){
        console.log("In renderFriend");
        var sharedFriends = this.state.sharedWith;
        if (sharedFriends.includes(item.uid)) {
            // console.log("TRUE");
            return(
                <View>
                    <View style={styles.rowContainer}>
                        <View style={styles.profilePicBox}>
                            <Image style={styles.profileCircle} source={item.profilePic ? {uri: item.profilePic} : null}></Image>
                        </View>
                        <TouchableOpacity underlayColor="#ffffff0"  onPress={() => console.log("Friend pressed")}>
                            <View style={styles.friendNameBox}>
                                <Text style={styles.friendName}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.friendShareButtonBox}>
                            <TouchableOpacity onPress={() => this.addSharedWith(this.state.albumID, item.email, this.props.user.uid)}>
                                <View style={styles.friendSharedButton}>
                                    <Text style={styles.friendShareLabel}>Shared</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* <View style={styles.separator} /> */}
                </View>
            )
        }else{
            // console.log("FALSE AS HELL");
            return(
                <View>
                    <View style={styles.rowContainer}>
                        <View style={styles.profilePicBox}>
                            <Image style={styles.profileCircle} source={item.profilePic ? {uri: item.profilePic} : null}></Image>
                        </View>
                        <TouchableOpacity underlayColor="#ffffff0"  onPress={() => console.log("Friend pressed")}>
                            <View style={styles.friendNameBox}>
                                <Text style={styles.friendName}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.friendShareButtonBox}>
                            <TouchableOpacity onPress={() => this.addSharedWith(this.state.albumID, item.email, this.props.user.uid)}>
                                <View style={styles.friendShareButton}>
                                    <Text style={styles.friendShareLabel}>Share</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* <View style={styles.separator} /> */}
                </View>
        
        );}

    }

    renderSharingModal(){
        return(
            <View style={{flex: 1}}>
                <View style={styles.modalContainer}>
                    <Modal isVisible={this.state.isModalVisible}
                    backdropColor="#F2F1F1"
                    backdropOpacity={1} 
                    swipeDirection="down">
                        <View style={styles.exitButtonBox}>
                            <Icon name='close' size={50} type='evilicon' color='#686868'
                                onPress={()=> this.toggleModal()}></Icon>
                        </View>
                        <View style={styles.shareTextBox}>
                            <Text style={styles.shareText}>Share Album</Text>
                        </View>
                        <View style={styles.shareListBox}>
                            <FlatList
                                data={this.props.user.friends}
                                renderItem={({item}) => this.renderFriend({item})}
                                keyExtractor={item => item.id}
                            ></FlatList>
                        </View>   

                        {/* <DropDownPicker
                            items={[
                                {label: 'UK', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900" />},
                                {label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" />},
                            ]}

                            multiple={true}
                            multipleText="%d items have been selected."
                            min={0}
                            max={10}

                            defaultValue={this.state.countries}
                            containerStyle={{height: 40}}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            onChangeItem={item => this.setState({
                                countries: item // an array of the selected items
                            })}
                        />                */}

                        <Button title="Hide modal" onPress={() => this.toggleModal()} />
                    </Modal>

                </View>
                
            </View>
        )
    }
    // renderSharingOptions(){

    // }
    renderBottomContainer(){
        if (this.state.isSharedAlbum){
            return(
                <View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.buttonBox}>
                            <Icon name='arrow-left' size={70} type='evilicon' color='#686868'
                            onPress={()=> this.props.navigation.goBack()}></Icon>
                            <Icon style={styles.plusIcon} name='plus' size={70} type='evilicon' color='#686868'
                            onPress={this._pickVideo}></Icon>
                            <Icon name='person-add-outline' size={50} type='ionicon' color='#686868'
                            onPress={()=> this.toggleModal()}></Icon>
                        </View>
                    </View>
                    <View>{this.renderSharingModal()}</View>
                </View>
            )
        }else{
            return(
                <View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.buttonBoxNoShare}>
                            <Icon name='arrow-left' size={70} type='evilicon' color='#686868'
                            onPress={()=> this.props.navigation.goBack()}></Icon>
                            <Icon style={styles.plusIcon} name='plus' size={70} type='evilicon' color='#686868'
                            onPress={this._pickVideo}></Icon>
                        </View>
                    </View>
                </View>
            )
        }
    }


    _renderPageFooter =(item, index, onClose) => {
        return(
            <View style={styles.imageContainer}>
                {/* <View style={styles.imageBox}>
                    <Image source={image}></Image>
                </View> */}
                <View style={styles.optionsBox}>
                    <TouchableOpacity onPress={()=> {onClose();}}>
                        <Icon name="close" size={60} type='evilicon' color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> {onClose();}}>
                        <Icon name="trash" size={60} type='evilicon' color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render(){
        return(
        <LinearGradient
        colors={['#FFFFFF', '#D9D9D9']}
        style={{flex: 1}}>
            <View style={styles.container}>
                <View style={styles.firstContainer}>
                    <View style={styles.menuBox}>
                        <Text style={styles.headerText}>{this.state.albumName}</Text>
                    </View>
                </View>
                {/* <SmartGallery
                    images={this.state.albumMedia}
                    resizeMode="center"
                /> */}
                <CameraRollGallery
                    enableCameraRoll={false} // default true
                    assetType={"All"}
                    renderPageHeader={this._renderPageFooter}
                    // Get data logic goes here.
                    // This will get trigger initially
                    // and when it reached the end
                    // if there is more.
                    onGetData={(fetchParams, resolve) => {
                        resolve({
                            assets: this.state.albumMedia,
                            // [
                            //     // NOTE THIS IS WHERE YOU WOULD PUT THE MEDIA THAT NEEDS TO BE RENDERED. SO ALBUM MEDIA GOES HERE
                            //     // Can be used with different image object fieldnames.
                            //     // Ex. source, source.uri, uri, URI, url, URL
                            //     { uri: "https://i.pinimg.com/originals/b2/ca/43/b2ca43656248156bb421f54594c397dc.jpg" },
                            //     // { source: require("yourApp/image.png"),
                            //     //     // IMPORTANT: It is REQUIRED for LOCAL IMAGES
                            //     //     // to include a dimensions field with the
                            //     //     // actual width and height of the image or
                            //     //     // it will throw an error.
                            //     //     dimensions: { width: 1080, height: 1920 } },
                            //     { source: { uri: "https://www.wearethemighty.com/app/uploads/legacy/assets.rbl.ms/23229881/origin.png" } },
                            //     { uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.melbournechildpsychology.com.au%2Fblog%2F5-productive-ways-for-parents-to-help-with-school-work%2F&psig=AOvVaw2Oa9U5l_2ZvmSIZm34Jhc_&ust=1614572481247000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIjhx6zdi-8CFQAAAAAdAAAAABAD" },
                            //     { URI: "https://cdn.vox-cdn.com/thumbor/9WQdjWjSF0bB0KYyBPcRXOZ1tL0=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/16204669/sb1.jpg" },
                            //     { url: "https://www.vive.com/media/filer_public/vive/product-listing/hero-vive-cosmos.png" },
                            //     { URL: "https://i.ytimg.com/vi/Kd0uT_0t3s4/maxresdefault.jpg" },
                            // ],
                            pageInfo: {
                                hasNextPage: false
                            }
                        });
                    }}
                    // height={800}
                    enableScale={true}
                    enableVerticalExit={false}
                    resizeMode="contain"
                    
                />
                <View>{this.renderBottomContainer()}</View>
            </View>
        </LinearGradient>
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
        justifyContent: 'center',
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
        fontFamily: 'AppleSDGothicNeo-Regular',
        color: '#2C2C2C',
        fontSize: 35,
        paddingBottom: 5,
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
    buttonBoxNoShare: {
        height: 60,
        width: 400,
        //backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    },
    modalContainer: {
        display:'flex',
        flexDirection: 'column',
        backgroundColor: 'green',
        width: '100%',
        height: '100%',
      },
      exitButtonBox:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      shareListBox:{
          height: 600,
      },
      shareTextBox: {
        height: 80,
        //backgroundColor: 'lightblue',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      shareText: {
        fontFamily: 'AppleSDGothicNeo-Regular',
        fontSize: 25,
      },
      rowContainer:{
          height: 80,
          //backgroundColor: 'lightblue',
          display: 'flex',
          flexDirection: 'row',
          //marginVertical: 10,
      }, 
      friendNameBox: {
          width: 200,
          //backgroundColor: 'grey',
          height: 80,
          justifyContent: 'center',
      },
      friendName:{
          fontFamily: 'AppleSDGothicNeo-Bold',
          fontSize: 20,
          flexWrap: 'wrap',
          paddingLeft: 15,
          color: '#4F4F4F',
          //color: '#6A6A6A',
      },
      buttonBackground:{
          width: 50,
          height: 60,
          backgroundColor: '#BABABB',
          borderRadius: 20,
          shadowOffset:{  height: 1},
          shadowColor: 'black',
          shadowOpacity: 0.8,
          justifyContent: 'center',
      },
      profilePicBox: {
          display: 'flex',
          height: 80,
          width: 80,
          //backgroundColor: 'red',
          // opacity: 0.1,
          justifyContent: 'center',
      },
      profileCircle:{
          height: 50,
          width: 50,
          backgroundColor: '#E8E8E8',
          borderRadius: 100,
          borderWidth: 0.3,
          alignSelf: 'center',
      },
      friendShareButtonBox: {
          //paddingTop: 5,
          width: 100,
          height: 80,
          //backgroundColor: 'lightgreen',
          justifyContent: 'center',
      },
      friendShareButton: {
          width: 80,
          height: 40,
          //backgroundColor: 'white',
          backgroundColor: '#F2F1F1',
          borderRadius: 15,
          alignSelf: 'center',
          justifyContent: 'center',
          shadowOffset:{  height: 1},
          shadowColor: 'black',
          shadowOpacity: 0.2,
          //borderColor: 'darkgrey',
          //borderWidth: 2,
      },
      friendSharedButton: {
        width: 80,
        height: 40,
        //backgroundColor: 'white',
        backgroundColor: '#C4C4C4',
        borderRadius: 15,
        alignSelf: 'center',
        justifyContent: 'center',
        shadowOffset:{  height: 1},
        shadowColor: 'black',
        shadowOpacity: 0.2,
        //borderColor: 'darkgrey',
        //borderWidth: 2,
    },
      friendShareLabel: {
          textAlign: 'center',
          fontFamily: 'AppleSDGothicNeo-Bold',
      },
      imageContainer:{
          //backgroundColor: 'white',
          //height: 100,
          justifyContent: 'center',
      },
      optionsBox:{
          paddingTop: 10,
          backgroundColor: 'black',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
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