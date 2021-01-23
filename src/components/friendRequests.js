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
                            <View style={styles.friendNameBox}>
                                <TouchableHighlight onPress={() => console.log("Friend pressed")}>
                                    <Text style={styles.friendName}>Ash Fran</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.buttonBox}>
                                <TouchableHighlight onPress={() => console.log("Rejected request")}>
                                    <View style={styles.buttonBackground}>
                                        <Icon style={styles.buttonIcon} name='close' type='materialicon' size={50} color='#FFFFFF'></Icon>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={() => console.log("Accepted request")}>
                                    <View style={styles.buttonBackground}>
                                        <Icon style={styles.buttonIcon} name='check' type='materialicon' size={50} color='#FFFFFF'></Icon>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={styles.separator} />
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
        height: 100,
        //backgroundColor: 'lightblue',
        display: 'flex',
        flexDirection: 'row',
        //marginVertical: 10,
    }, 
    friendNameBox: {
        width: 250,
        //backgroundColor: 'grey',
        height: 100,
        justifyContent: 'center',
    },
    friendName:{
        fontFamily: 'AppleSDGothicNeo-Regular',
        fontSize: 35,
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
});


export default FriendRequests;