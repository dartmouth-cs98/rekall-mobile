import React, {Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, ActivityIndicator,
    TouchableWithoutFeedback, ImageBackground, PanResponder, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import { requestFriend } from '../actions/friendActions';
import { fetchUserInfo } from '../actions/userActions';



class MyAlbumRoute extends Component{
    constructor(props){
        super(props);
        this.state = {
            albumList: [],
            updateAlbums: [],
            myAlbumObjs: [],
        }
    }

    componentDidMount() {
        this.loadData();
        
    }

    async loadData() {
        await this.props.fetchUserInfo(this.props.user.uid).then(() => {
            this.setState({
                friends: this.props.user.friends,
                albumList: this.props.user.userAlbums,
            });
        });
        this.getCurrentAlbums();
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
  
export default connect(mapStateToProps, mapDispatchToProps)(MyAlbumRoute);