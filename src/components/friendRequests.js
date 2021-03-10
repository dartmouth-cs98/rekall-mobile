import React, {Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList, ActivityIndicator,
    TouchableWithoutFeedback, ImageBackground, PanResponder, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { fetchUserInfo } from '../actions/userActions';
import { addFriend, declineRequest, banFriend } from '../actions/friendActions';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableHighlightBase } from 'react-native';

class FriendRequests extends Component{
    constructor(props){
        super(props);
        this.state={
            testRows: null
            } 
        }

        componentDidMount() {
            this.loadData();
        }

        async loadData() {
            await this.props.fetchUserInfo(this.props.user.uid).then(() => {
                var requests = []
                for (let i=0; i < this.props.user.requests.length; i++) {
                    console.log(this.props.user.requests[i].id)
                    console.log(this.props.user.bannedfriends.indexOf(this.props.user.requests[i].id))
                    if (this.props.user.bannedfriends.indexOf(this.props.user.requests[i].id) < 0) {
                        requests.push(this.props.user.requests[i]);
                    }
                }
                this.setState({
                    testRows: requests,
                });
            });
        }

        renderFriendRequest( {item} ){
            return(
                    <View style={styles.container}>
                        <View style={styles.rowContainer}>
                            <View style={styles.profilePicBox}>
                                <Image style={styles.profileCircle} source={item.profilePic ? {uri: item.profilePic} : null}></Image>
                            </View>
                            <View style={styles.friendNameBox}>
                                <TouchableOpacity onPress={() => console.log("Friend pressed")}>
                                    <Text style={styles.friendName}>{item.title}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.buttonBox}>
                                <TouchableOpacity onPress={() => this.props.declineRequest(this.props.user.uid, item.email).then(() => {
                                    this.loadData();
                                })}>
                                    <View style={styles.buttonBackground}>
                                        <Text style={styles.buttonText}>Decline</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity  onPress={() => this.props.addFriend(this.props.user.uid, item.email).then(() => {
                                    this.loadData();
                                })}>
                                    <View style={styles.buttonBackground}>
                                        <Text style={styles.buttonText}>Accept</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
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
            console.log(this.state.testRows)
            return(
                <FlatList
                data={this.state.testRows}
                renderItem={({item}) => this.renderFriendRequest({item})}
                keyExtractor={item => item.id}
                ></FlatList>
            )
        }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    rowContainer:{
        height: 80,
        //backgroundColor: 'lightblue',
        // display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        //marginVertical: 10,
    }, 
    friendNameBox: {
        //width: 150,
        //backgroundColor: 'grey',
        width: '30%',
        height: 80,
        justifyContent: 'center',
    },
    friendName:{
        fontFamily: 'AppleSDGothicNeo-Bold',
        fontSize: 20,
        flexWrap: 'wrap',
        //paddingLeft: 15,
        color: '#4F4F4F',
        //color: '#6A6A6A',
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
    buttonBox: {
        //width: 200,
        width: '45%',
        height: 80,
        //backgroundColor: 'lightgreen',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    buttonBackground: {
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
    buttonText: {
        textAlign: 'center',
        fontFamily: 'AppleSDGothicNeo-Bold',
    },
    separator: {
        height: 1,
        backgroundColor: 'darkgrey',
        opacity: 2,
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
        addFriend: (userID, email) => dispatch(addFriend(userID, email)),
        declineRequest: (userID, email) => dispatch(declineRequest(userID, email)),
        banFriend: (userID, email) => dispatch(banFriend(userID, email))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(FriendRequests);