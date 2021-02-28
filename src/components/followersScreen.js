import React, {Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList, ActivityIndicator,
    TouchableWithoutFeedback, ImageBackground, PanResponder, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { fetchUserInfo } from '../actions/userActions';
import { removeFriend } from '../actions/friendActions';

// const uid = "6010a60b2903ce360163ca10"

class FollowersScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            testRows: null
            }
        }  
        
        componentDidMount() {
            this.props.fetchUserInfo(this.props.user.uid);
            // var friends = [];

            // for (var i = 0; i < this.props.user.friends.length; i++) {
            //     friends.push({
            //         id: i.toString(),
            //         title: this.props.user.friends[i].firstname + ' ' + this.props.user.friends[i].lastname,
            //         email: this.props.user.friends[i].email
            //     });
            // }
            this.setState({
                testRows: this.props.user.friends,
            });
            console.log(this.props.user.friends)
        }

        renderFriendRequest( {item} ){
            return(
                    <View>
                        <View style={styles.rowContainer}>
                            <View style={styles.profilePicBox}>
                                <Image style={styles.profileCircle} source={item.profilePic ? {uri: item.profilePic} : null}></Image>
                            </View>
                            <TouchableHighlight underlayColor="#ffffff0"  onPress={() => console.log("Friend pressed")}>
                                <View style={styles.friendNameBox}>
                                    <Text style={styles.friendName}>{item.title}</Text>
                                </View>
                            </TouchableHighlight>
                            <View style={styles.removeButtonBox}>
                                <TouchableHighlight underlayColor="#ffffff0" onPress={() => this.props.removeFriend(this.props.user.uid, item.email).then(() => {
                                    this.props.fetchUserInfo(this.props.user.uid).then(() => {
                                        this.setState({
                                            testRows: this.props.user.friends
                                        });
                                    });
                                })}>
                                    <View style={styles.removeButton}>
                                        <Text style={styles.removeLabel}>Remove</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                        {/* <View style={styles.separator} /> */}
                    </View>
            );
        }

        render() {
            if (this.state.testRows == null) {
                return(
                    <View style={styles.preloader}>
                      <ActivityIndicator size="large" color="#9E9E9E"/>
                    </View>
                )
            }

            return(
                <FlatList
                data={this.props.user.friends}
                renderItem={({item}) => this.renderFriendRequest({item})}
                keyExtractor={item => item.id}
                ></FlatList>
            )
        }
}

const styles = StyleSheet.create({
    container: {
      display:'flex',
    },
    rowContainer:{
        height: 80,
        //backgroundColor: 'lightblue',
        display: 'flex',
        flexDirection: 'row',
        //marginVertical: 10,
    }, 
    friendNameBox: {
        width: 230,
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
    buttonBox:{
        width: 200,
        height: 100,
        //backgroundColor: 'green',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        alignContent: 'space-between',
        paddingRight: 15,
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
    separator: {
        height: 1,
        backgroundColor: 'darkgrey',
        opacity: 2,
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
    removeButtonBox: {
        //paddingTop: 5,
        width: 100,
        height: 80,
        //backgroundColor: 'lightgreen',
        justifyContent: 'center',
    },
    removeButton: {
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
    removeLabel: {
        textAlign: 'center',
        fontFamily: 'AppleSDGothicNeo-Bold',
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
        removeFriend: (userID, email) => dispatch(removeFriend(userID, email))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(FollowersScreen);
