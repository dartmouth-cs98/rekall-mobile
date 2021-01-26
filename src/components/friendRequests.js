import React, {Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList,
    TouchableWithoutFeedback, ImageBackground, PanResponder, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableHighlight } from 'react-native-gesture-handler';


class FriendRequests extends Component{
    constructor(props){
        super(props);
        this.state={
            testRows: [
                {
                  id: '1',
                  title: 'First Item',
                },
                {
                  id: '2',
                  title: 'Second Item',
                },
                {
                  id: '3',
                  title: 'Third Item',
                }
              ],
            } 
        }   

        renderFriendRequest(){
            return(
                    <View>
                        <View style={styles.rowContainer}>
                            <View style={styles.profilePicBox}>
                                <Image style={styles.profileCircle}></Image>
                            </View>
                            <View style={styles.friendNameBox}>
                                <TouchableHighlight underlayColor="#ffffff0" onPress={() => console.log("Friend pressed")}>
                                    <Text style={styles.friendName}>Ash Fran</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.buttonBox}>
                                <TouchableHighlight underlayColor="#ffffff0" onPress={() => console.log("Rejected request")}>
                                    <View style={styles.buttonBackground}>
                                        <Text style={styles.buttonText}>Decline</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight underlayColor="#ffffff0"  onPress={() => console.log("Accepted request")}>
                                    <View style={styles.buttonBackground}>
                                        <Text style={styles.buttonText}>Accept</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
            );
        }

        render() {
            return(
                <FlatList
                data={this.state.testRows}
                renderItem={this.renderFriendRequest}
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
        width: 150,
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
    buttonBox: {
        width: 200,
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


export default FriendRequests;