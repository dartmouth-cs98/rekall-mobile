import React, {Component} from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, ActivityIndicator,
    TouchableWithoutFeedback, ImageBackground, PanResponder, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { TabView, SceneMap } from 'react-native-tab-view';
import TabViewExample from './friendsTabs';
import { addFriend } from '../actions/friendActions';
import { fetchUserInfo } from '../actions/userActions';
import Modal from 'react-native-modal';

// const uid = "6010a60b2903ce360163ca10"

class FriendsScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            friends: null,
            isModalVisible: false,
            friendEmail: ""
        }
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        await this.props.fetchUserInfo(this.props.user.uid).then(() => {
            this.setState({
                friends: this.props.user.friends,
            });
        });
    }

    toggleModal(){
        console.log("In toggleModal")
        if (this.state.isModalVisible){
            this.setState({isModalVisible: false});
            console.log(this.state.isModalVisible)
            // console.log(this.state.newAlbumName)
        }
        else{
            this.setState({isModalVisible: true})
            console.log(this.state.isModalVisible)
            // console.log(this.state.newAlbumName)
        }
    }

    async addFriend(e){
        e.preventDefault();
        const friendEmail = this.state.friendEmail.toLowerCase();

        this.toggleModal()
        await this.props.addFriend(this.props.user.uid, friendEmail).then(() => {
            this.props.fetchUserInfo(this.props.user.uid).then(() => {
                this.setState({
                    friends: this.props.user.friends,
                    friendEmail: ""
                });
            });
        });
    }

    renderModal(){
        //console.log("In renderModal")
        if (this.state.isModalVisible){
            return(
                <View>
                    <Modal isVisible={this.state.isModalVisible} onSwipeComplete={()=> this.toggleModal()} swipeDirection="up">
                        <View>
                            <View style={styles.modalContainer}>
                                <View style={styles.modal}>
                                    <Text style={styles.modalText}>Add new friend's email</Text>
                                    <TextInput label="Enter friend email...." mode='flat'  value={this.state.friendEmail} onChangeText={(text) => this.setState({friendEmail: text})}></TextInput>
                                    <View style={styles.modalButtonBox}>
                                        <Button mode='text' onPress={(e)=> this.addFriend(e)} color="#3B3B3B">Add Friend</Button>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            )
        }
        
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
                    <View style={styles.firstContainer}>
                        <View style={styles.menuBox}>
                            <Text style={styles.headerText}>FRIENDS</Text>
                            <TouchableOpacity style={styles.menuButton} onPress={()=> this.props.navigation.toggleDrawer()}>
                                <Image style={styles.image}
                                    source={require('../assets/navbutton.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.addFriendContainer}>
                        <Icon style={styles.addFriendIcon} name='plus' size={50} type='feather' color='#838484' 
                        onPress={()=> this.toggleModal()}>
                        </Icon>
                    </View>
                    <View>{this.renderModal()}</View>
                    <View style={styles.secondContainer}>
                        <TabViewExample key={this.state.friends} />
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
    firstContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        height: 150,
        //backgroundColor: 'green',
        alignContent: 'flex-end',
    },
    menuBox:{
        display: 'flex',
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
    addFriendContainer: {
        height: 50,
        //backgroundColor: 'green',
    },
    scene:{
        flex: 1,
    },
    addFriendIcon:{
        alignSelf: 'flex-end',
        paddingRight: 10,
    },
    secondContainer: {
        paddingTop: 30,
        height: 730,
        //backgroundColor: 'red',
    },
    modalContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 400,
        height: 800,
    },
    modal: {
        borderRadius: 10,
        justifyContent: 'space-around',
        // alignContent: 'center',
        backgroundColor: 'white',
        width: 300,
        height: 250,
    },
    modalButtonBox:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    modalText:{
        textAlign: 'center',
        fontSize: 20,
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
        addFriend: (uid, friendEmail) => dispatch(addFriend(uid, friendEmail))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen);