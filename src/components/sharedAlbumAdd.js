import React, {Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, ActivityIndicator,
    TouchableWithoutFeedback, ImageBackground, PanResponder, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import { requestFriend } from '../actions/friendActions';
import { fetchUserInfo } from '../actions/userActions';
import {Button} from 'react-native-paper';
import axios from 'axios';

const API = 'https://rekall-server.herokuapp.com';

class SharedAlbumRoute extends Component{
    constructor(props){
        super(props);
        this.state = {
            albumList: [],
            sharedAlbumObjs: [],
            updateAlbums: [],
        }
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        await this.props.fetchUserInfo(this.props.user.uid).then(() => {
            this.setState({
                friends: this.props.user.friends,
                albumList: this.props.user.sharedAlbums,
            });
        });
        this.getCurrentAlbums();
    }

    addToGallery = async () => {
        console.log(this.state.updateAlbums);
        var url = `${API}/album/addMediaToShared`
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
                    this.props.navigation.navigate('Drawer', { screen: 'EXPLORE' });
                })
            }).catch((e) => {
                console.log(`Error putting media: ` + JSON.stringify(e));
            });
    }

    getCurrentAlbums(){
        var sharedAlbumList = this.state.albumList;
        var sharedAlbumObjs = [];
        
        for (var i=0; i < sharedAlbumList.length; i++){
            var sharedAlbumObj = {};
            sharedAlbumObj["label"] = sharedAlbumList[i].albumName;
            sharedAlbumObj["value"] = sharedAlbumList[i]._id;
            sharedAlbumObjs.push(sharedAlbumObj);
        }

        this.setState({
            sharedAlbumObjs: sharedAlbumObjs,
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
                    <View style={styles.secondContainer}>
                        <View style={styles.addToGalleryContainter}>
                                <DropDownPicker
                                            items={this.state.sharedAlbumObjs}

                                            multiple={true}
                                            multipleText="%d albums have been selected."
                                            min={0}
                                            max={15}
                                            placeholder={"Select from shared albums"}

                                            defaultValue={this.state.updateAlbums}
                                            containerStyle={{height: 50}}
                                            itemStyle={{
                                                justifyContent: 'flex-start'
                                            }}
                                            labelStyle={{fontFamily: 'AppleSDGothicNeo-Regular'}}
                                            onChangeItem={item => this.setState({
                                                updateAlbums: item // an array of the selected items
                                            })}
                                />              
                        </View>
                    </View>
                    <View style={styles.addButtonBox}>
                        <Button mode='contained'  color="#F2F1F1" labelStyle={styles.buttonText} onPress={() => this.addToGallery('User')} >
                            Add to Gallery
                        </Button>
                    </View>  
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      display:'flex',
    },
    secondContainer: {
        paddingTop: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    },
    addToGalleryContainter: {
        height: 350,
    },
    addButtonBox: {
        width: '50%',
        alignSelf: 'center',
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
        requestFriend: (uid, friendEmail) => dispatch(requestFriend(uid, friendEmail))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(SharedAlbumRoute);