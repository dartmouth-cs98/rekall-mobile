import React, {Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, ActivityIndicator,
    TouchableWithoutFeedback, ImageBackground, PanResponder, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import { requestFriend } from '../actions/friendActions';
import { fetchUserInfo } from '../actions/userActions';
import { getAlbums, getSharedAlbums } from '../actions/albumActions';
import {Button} from 'react-native-paper';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(["Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method."]); // Ignore log notification by message

const API = 'https://rekall-server.herokuapp.com';

class MyAlbumRoute extends Component{
    _isMounted = false
    constructor(props){
        super(props);
        this.state = {
            albumList: [],
            updateAlbums: [],
            myAlbumObjs: [],
        }
    }

    componentDidMount() {
        this._isMounted = true
        this.loadData();
        console.log("hello");
        console.log(this.props.route);
    }

    async loadData() {
        await this.props.fetchUserInfo(this.props.user.uid).then(() => {
            if (this._isMounted) {
                this.setState({
                    friends: this.props.user.friends,
                    albumList: this.props.user.userAlbums,
                });
            }
        });
        await this.props.getAlbums(this.props.user.uid);
        await this.props.getSharedAlbums(this.props.user.uid);
        this.getCurrentAlbums();
    }

    addToGallery = async () => {
        var url = `${API}/album/addMediaToAlbum`
        let promises = [];
        
        axios.put(`${API}/album/addMediaToLibrary`,
            { 
                "_id": this.props.user.uid,
                "mediaURL": 'https://www.youtube.com/watch?v=' + this.props.video,
                "mediaType": 'YouTube'
            }).then((res) => {
                let mediaid = res.data._id;

                for(let i = 0; i < this.state.updateAlbums.length; i++) {
                    promises.push(axios.put(url,
                        { 
                            "album": {
                                "_id": this.state.updateAlbums[i].toString(),
                            },
                            "media": {
                                "_id": mediaid,
                            },
                        },
                    ));
                }
                Promise.all(promises).then(() => {
                    this.loadData();
                    this.props.navigation.goBack();
                })
            }).catch((e) => {
                console.log(`Error putting media: ` + JSON.stringify(e));
            });
    }

    getCurrentAlbums(){
        var albumList = this.state.albumList;
        var myAlbumObjs = [];
        
        for (var i=0; i < albumList.length; i++){
            var albumObj = {};
            albumObj["label"] = albumList[i].albumName;
            albumObj["value"] = albumList[i]._id;
            myAlbumObjs.push(albumObj);
        }

        this.setState({
            myAlbumObjs: myAlbumObjs,
        });
    }

    addToGallery = async () => {
        console.log(this.state.updateAlbums);
        var url = `${API}/album/addMediaToAlbum`
        let promises = [];
        
        axios.put(`${API}/album/addMediaToLibrary`,
            { 
                "_id": this.props.user.uid,
                "mediaURL": 'https://www.youtube.com/watch?v=' + this.props.route.videoId.videoId,
                "mediaType": 'YouTube'
            }).then((res) => {
                let mediaid = res.data._id;

                for(let i = 0; i < this.state.updateAlbums.length; i++) {
                    promises.push(axios.put(url,
                        { 
                            "album": {
                                "_id": this.state.updateAlbums[i].toString(),
                            },
                            "media": {
                                "_id": mediaid,
                            },
                        },
                    ));
                }
                Promise.all(promises).then(() => {
                    this.loadData();
                    this.props.route.videoId.navigation.goBack();
                })
            }).catch((e) => {
                console.log(`Error putting media: ${e}`);
            });
    }

    
    render(){
        if (this.state.friends == null) {
            return(
                <View style={styles.preloader}>
                  <ActivityIndicator size="large" color="#9E9E9E"/>
                </View>
            )
        }

        return(
            <LinearGradient
            colors={['#FFFFFF', '#D9D9D9']}
            style={{flex: 1}}>
                <View style={styles.container}>
                    {/* <View style={styles.secondContainer}> */}
                        <View style={styles.addToGalleryContainter}>
                            <DropDownPicker
                                        items={this.state.myAlbumObjs}

                                        multiple={true}
                                        multipleText="%d albums have been selected."
                                        min={0}
                                        max={15}
                                        placeholder={"Select from my albums"}

                                        defaultValue={this.state.updateAlbums}
                                        
                                        containerStyle={{height: 50}}
                                        labelStyle={{fontFamily: 'AppleSDGothicNeo-Regular'}}
                                        itemStyle={{
                                            justifyContent: 'flex-start',
                                        }}
                                        onChangeItem={item => this.setState({
                                            updateAlbums: item // an array of the selected items
                                        })}
                            />            
                        </View>
                        <View style={styles.addButtonBox}>
                            <Button mode='contained'  color="#F2F1F1" labelStyle={styles.buttonText} onPress={() => this.addToGallery("User")} >
                                Add to Gallery
                            </Button>
                        </View>  

                        
                    </View>
                {/* </View> */}
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    secondContainer: {
        // paddingTop: 0,
        flex:0,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    addToGalleryContainter: {
        //height: 350,
        flex: 1,
    },
    addButtonBox: {
        //width: '50%',
        flex: 0,
        alignSelf: 'center',
        height: '20%',
    },
});

const mapStateToProps = (state) => {
    return {
      user: state.user,
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserInfo: (userID) => dispatch(fetchUserInfo(userID)),
        requestFriend: (uid, friendEmail) => dispatch(requestFriend(uid, friendEmail)),
        getAlbums: (userID) => dispatch(getAlbums(userID)),
        getSharedAlbums: (userID) => dispatch(getSharedAlbums(userID))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(MyAlbumRoute);