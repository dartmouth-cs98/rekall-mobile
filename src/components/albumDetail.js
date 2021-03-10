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
            curMediaID: null,
            friends: null,
            sharedWith: [],
            isSharedAlbum: false,
            isUploading: false,
            albumType: null,
            url: null,
            isModalVisible: false,
            itemModalVisible: false,
            isTrashModalVisible: false,
            countries: ['uk'],
            refresh: true,
            animatedValue: null,
            deletelink: null,
            deletealbum: null
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
                isUploading: false,
                isSharedAlbum: true,
                albumType: "Shared",
                url: `${API}/album/addMediaToShared`,
                deletelink: `${API}/album/deleteSharedMedia`,
                deletealbum: `${API}/album/deleteShared`
            });
            let sharedAlbum = sharedAlbums.find( album => album['albumName'] === albumName );
            this.setState({
                sharedWith: sharedAlbum.sharedWith,
            });
        }
        else{
            this.setState({
                isUploading: false,
                isSharedAlbum: false,
                albumType: "User",
                url: `${API}/album/addMediaToAlbum`,
                deletelink: `${API}/album/deleteAlbumMedia`,
                deletealbum: `${API}/album/deleteAlbum`
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
            this.setState({isUploading: true});
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


    toggleTrashModal(){
        console.log("In toggleTrashModal")
        if (this.state.isTrashModalVisible){
            this.setState({isTrashModalVisible: false});
            //console.log(this.state.isModalVisible)
        }
        else{
            this.setState({isTrashModalVisible: true})
            //console.log(this.state.isModalVisible)
        }
    }

    toggleTrashItem(_id){
        console.log("In toggleTrashItem")
        if (this.state.itemModalVisible){
            this.setState({itemModalVisible: false});
            this.setState({curMediaID: _id});
            //console.log(this.state.isModalVisible)
        }
        else{
            this.setState({itemModalVisible: true})
            this.setState({curMediaID: _id});
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

    renderTrashModal(){
        //console.log("In renderModal")
        if (this.state.isTrashModalVisible){
            return(
                <View style={{flex:1}}>
                    <Modal isVisible={this.state.isTrashModalVisible}>
                        <View>
                            <View style={styles.trashModalContainer}>
                                <View style={styles.trashModal}>
                                    <Text style={styles.trashModalText}>Are you sure you want to delete this album?</Text>
                                    <View style={styles.trashModalButtonBox}>
                                        <Button mode='text' onPress={() => this.toggleTrashModal()} color="#3B3B3B">Cancel</Button>
                                        <Button mode='text' onPress={() => this.deleteAlbum().then(() => {
                                            console.log("Deleted!");
                                            this.loadData().then(() => {
                                                this.props.navigation.goBack();});
                                            })} color="#3B3B3B">Delete</Button>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            )
        }
        if (this.state.itemModalVisible){
            return(
                <View style={{flex:1}}>
                    <Modal isVisible={this.state.itemModalVisible}>
                        <View>
                            <View style={styles.trashModalContainer}>
                                <View style={styles.trashModal}>
                                    <Text style={styles.trashModalText}>Are you sure you want to delete this item?</Text>
                                    <View style={styles.trashModalButtonBox}>
                                        <Button mode='text' onPress={() => this.toggleTrashItem()} color="#3B3B3B">Cancel</Button>
                                        <Button mode='text' onPress={()=> { 
                                                 this.deleteMedia(this.state.curMediaID).then(() => {
                                                     console.log("Deleted!")
                                                     this.loadData().then(() => {
                                                        this.props.navigation.goBack()})})}}
                                                        color="#3B3B3B">Delete</Button>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            )
        }
        
    }


    

    renderFriend( {item} ){
        console.log("In renderFriend");
        var sharedFriends = this.state.sharedWith;
        if (sharedFriends.includes(item.uid)) {
            // console.log("TRUE");
            return(
                <View style={styles.container}>
                    <View style={styles.rowContainer}>
                        <View style={styles.profilePicBox}>
                            <Image style={styles.profileCircle} source={item.profilePic ? {uri: item.profilePic} : null}></Image>
                        </View>
                       
                        <View style={styles.friendNameBox}>
                            <TouchableOpacity underlayColor="#ffffff0"  onPress={() => console.log("Friend pressed")}>
                                <Text style={styles.friendName}>{item.title}</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.friendShareButtonBox}>
                            <TouchableOpacity onPress={() => this.addSharedWith(this.state.albumID, item.email, this.props.user.uid)}>
                                <View style={styles.friendSharedButton}>
                                    <Text style={styles.friendShareLabel}>Shared</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
            )
        }else{
            // console.log("FALSE AS HELL");
            return(
                <View style={styles.container}>
                    <View style={styles.rowContainer}>
                        <View style={styles.profilePicBox}>
                            <Image style={styles.profileCircle} source={item.profilePic ? {uri: item.profilePic} : null}></Image>
                        </View>
                        
                        <View style={styles.friendNameBox}>
                            <TouchableOpacity underlayColor="#ffffff0"  onPress={() => console.log("Friend pressed")}>
                                <Text style={styles.friendName}>{item.title}</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.friendShareButtonBox}>
                            <TouchableOpacity onPress={() => this.addSharedWith(this.state.albumID, item.email, this.props.user.uid)}>
                                <View style={styles.friendShareButton}>
                                    <Text style={styles.friendShareLabel}>Share</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
        
        );}

    }

    renderSharingModal(){
        return(
                
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
                    <View>
                        <FlatList
                            data={this.props.user.friends}
                            renderItem={({item}) => this.renderFriend({item})}
                            keyExtractor={item => item.id}
                        ></FlatList>
                    </View>   

                    <Button title="Hide modal" onPress={() => this.toggleModal()} />
                </Modal>

            </View>
        )
    }



    
    renderBottomContainer(){
        if (this.state.isSharedAlbum){
            return(
                <View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.buttonBox}>
                            <Icon name="trash" size={70} type='evilicon' color='#686868'
                            onPress={()=> this.toggleTrashModal()}/>
                            <Icon style={styles.plusIcon} name='plus' size={70} type='evilicon' color='#686868'
                            onPress={this._pickVideo}></Icon>
                            <Icon name='person-add-outline' size={50} type='ionicon' color='#686868'
                            onPress={()=> this.toggleModal()}></Icon>
                        </View>
                    </View>
                    <View>{this.renderSharingModal()}</View>
                    <View>{this.renderTrashModal()}</View>
                </View>
            )
        }else{
            return(
                <View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.buttonBoxNoShare}>
                            <Icon name="trash" size={70} type='evilicon' color='#686868'
                            onPress={()=> this.toggleTrashModal()} />
                            <Icon style={styles.plusIcon} name='plus' size={70} type='evilicon' color='#686868'
                            onPress={this._pickVideo}></Icon>
                        </View>
                    </View>
                    <View>{this.renderTrashModal()}</View>
                </View>
            )
        }
    }

    deleteMedia = async (mediaID) => {
        axios.post(this.state.deletelink,
            { 
                "aid": this.state.albumID,
                "mid": mediaID,
            }).catch((e) => {
                console.log(`Error deleting media: ${e}`);
            });
    }

    deleteAlbum = async () => {
        axios.post(this.state.deletealbum,
            { 
                "aid": this.state.albumID,
            }).catch((e) => {
                console.log(`Error deleting album: ${e}`);
            });
    }

    _mediafilter = (url) => {
        for (let i = 0; i < this.state.albumMedia.length; i++) {
            if (this.state.albumMedia[i].uri == url) {
                return (this.state.albumMedia[i].id)
            }
        }
    }

    

    _renderPageHeader =(item, index, onClose) => {
        let _id = this._mediafilter(item.uri)
        
        return(
            <View style={styles.imageContainer}>
                {/* <View style={styles.imageBox}>
                    <Image source={image}></Image>
                </View> */}
                <View style={styles.optionsBox}>
                    <TouchableOpacity onPress={()=> {onClose();}}>
                        <Icon name="close" size={60} type='evilicon' color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.toggleTrashItem(_id)}>
                        <Icon name="trash" size={60} type='evilicon' color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderGallery(){
        if (this.state.isUploading){
            return(
                <View style={styles.preloader}>
                  <ActivityIndicator size="large" color="#9E9E9E"/>
                </View>
            )
        }
        else{
            return(
                <CameraRollGallery
                        enableCameraRoll={false} // default true
                        assetType={"All"}
                        renderPageHeader={this._renderPageHeader}
                        onGetData={(fetchParams, resolve) => {
                            resolve({
                                assets: this.state.albumMedia,
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
            )
        }
    }

    render(){
        return(
        <LinearGradient
        colors={['#FFFFFF', '#D9D9D9']}
        style={{flex: 1}}>
            <View style={styles.container}>
                <View style={styles.firstContainer}>
                    <View style={styles.menuContainer}>
                        <View style={styles.menuBox}>
                            <View style={styles.backIconBox}>
                                <Icon  name="chevron-left" size={60} type='evilicon' color="#686868"
                                onPress={()=> this.props.navigation.goBack()}/>
                            </View>
                            <View style={styles.headerTextBox}>
                                <Text style={styles.headerText}>{this.state.albumName}</Text>
                            </View>
                            <View style={styles.spaceBox}
                            ></View>
                        </View>

                    </View>
                    
                </View>
                <View style={styles.secondContainer}>
                    {this.renderGallery()}
                    {/* <CameraRollGallery
                        enableCameraRoll={false} // default true
                        assetType={"All"}
                        renderPageHeader={this._renderPageHeader}
                        onGetData={(fetchParams, resolve) => {
                            resolve({
                                assets: this.state.albumMedia,
                                pageInfo: {
                                    hasNextPage: false
                                }
                            });
                        }}
                        // height={800}
                        enableScale={true}
                        enableVerticalExit={false}
                        resizeMode="contain"
                        
                    /> */}
                </View>
                <View>{this.renderBottomContainer()}</View>
            </View>
        </LinearGradient>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      //justifyContent: 'space-evenly',
      backgroundColor: '#F2F1F1',
    },
    firstContainer: {
        justifyContent: 'flex-end',
        alignSelf: 'center',
        height: '10%',
        width: '100%',
        //backgroundColor: 'green',
        //flexDirection: 'row',
    },
    menuContainer:{
        //backgroundColor: 'purple',
        flexDirection: 'row',
        justifyContent: 'center',
        //alignSelf: 'flex-start',
        //alignItems: 'flex-end',
        
    },
    menuBox:{
        //height: 100,
        width: '100%',
        //width: 380,
        //backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignSelf: 'flex-start',
        alignItems: 'flex-end',
    },
    spaceBox: {
        width: 50,
        backgroundColor: 'blue',
    },
    headerTextBox: {
        justifyContent: 'center',
        
        //backgroundColor: 'green',
    },
    menuButton:{
        alignSelf: 'flex-start',
    },
    secondContainer: {
        flex: 2,
    },
    image:{
        height: 60,
        width: 50,
        alignSelf: 'center',
    },
    headerText:{
        alignSelf: 'flex-end',
        fontFamily: 'AppleSDGothicNeo-Regular',
        color: '#2C2C2C',
        fontSize: 35,
        // paddingBottom: 5,
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
        width: '95%',
        //backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonBoxNoShare: {
        height: 60,
        width: '95%',
        //width: 400,
        //backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
    },
    modalContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'green',
        // width: '100%',
        //height: '100%',
        
      },
      exitButtonBox:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      shareListBox:{
          flex: 0,
      },
      shareTextBox: {
        //flex: 1,
        //height: 80,
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
          justifyContent: 'space-evenly',
          //marginVertical: 10,
      }, 
      friendNameBox: {
          //backgroundColor: 'grey',
          width: '40%',
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
        width: '30%',
        height: 80,
        //backgroundColor: 'lightgreen',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        alignItems: 'center',
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
      },
      trashModalContainer: {
        // display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // width: 400,
        // height: 800,
    },
    trashModal: {
        borderRadius: 10,
        justifyContent: 'space-around',
        // alignContent: 'center',
        backgroundColor: 'white',
        width: 250,
        height: 200,
    },
    trashModalButtonBox:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    trashModalText:{
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'AppleSDGothicNeo-Bold',
    },
    preloader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },


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