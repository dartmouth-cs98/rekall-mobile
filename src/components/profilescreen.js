import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchUserInfo, newProfilePic } from '../actions/userActions';
//import FontAwesome from 'FontAwesome';
// import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Image, Text, TextInput, ActivityIndicator, TouchableOpacity, 
    TouchableWithoutFeedback, ImageBackground, PanResponder, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import { Icon } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import { LinearTextGradient } from 'react-native-text-gradient';
import { NavigationContainer } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { RNS3 } from 'react-native-aws3';
import axios from 'axios';

// import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from '@env';

// const uid = "6010a60b2903ce360163ca10"
const API = 'https://rekall-server.herokuapp.com';

class ProfileScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            profileName: null,
            email: "",
            profilePic: "",
            activeIndex:0,
            isEditing: false,
            editText: "Update Profile",
            // friendsList: [],
            uid: this.props.user.uid,
            image: null,
            vrcode: null,
        };
    }

    async componentDidMount() {
        this.loadData();

        // Ask for album access when first using app
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }

    async loadData() {
        await this.props.fetchUserInfo(this.props.user.uid).then(() => {

            // let friends = this.props.user.friends.map(a => a.title);

            this.setState({
                uid: this.props.user.uid,
                profileName: this.props.user.firstname + ' ' + this.props.user.lastname,
                email: this.props.user.email,
                profilePic: this.props.user.profilePic,
                vrcode: this.props.user.vrcode
                // friendsList: friends,
            });
        });
    }


    // toggleUpdateButton(){
    //     if (this.state.isEditing) {
    //         this.setState({ isEditing: false });
    //     } else {
    //         this.setState({ isEditing: true });
    //       }
    //     }
    //}

    // updateProfile(){
    //     if (this.state.isEditing){
    //         return(

    //         )
    //     }
    // }

    /*
    Function to allow picking an image from camera roll and holding it in base64
    */
    _pickImage = async () => {
        try {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });
        if (!result.cancelled) {
            const file = {
                uri: result.uri,
                name: `profile${new Date().getTime()}.jpg`,
                type: "image/jpg"
              };
            const options = {
                // keyPrefix: this.props.user.uid + "/media/",
                keyPrefix: this.props.user.uid + "/media/",
                bucket: "rekall-storage",
                region: "us-east-1",
                accessKey: "AKIAQWWJHNTC6ZC2JFH3",
                secretKey: "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",
                // accessKey: AWS_ACCESS_KEY_ID,
                // secretKey: AWS_SECRET_ACCESS_KEY,
                successActionStatus: 201
            };
            return RNS3.put(file, options)
            .then(response => {
                if (response.status !== 201) {
                    throw new Error("Failed to upload image to S3");
                }
                else {
                console.log(
                    "Successfully uploaded image to s3. s3 bucket url: ",
                    response.body.postResponse.location
                );
                this.props.newProfilePic(this.props.user.uid, response.body.postResponse.location)
                .then(() => {
                    this.loadData();
                });
                }
            })
            .catch(error => {
                console.log(error);
            });
        }

        console.log(result);
        } catch (E) {
        console.log(E);
        }
    };

    _renderItem({item,index}){
        return (
          <View style={styles.friendContainer}>
            {/* <View style={styles.friendImage}> */}
            <Image style={styles.friendImage} source={item.profilePic ? {uri: item.profilePic} : null}></Image>
            {/* </View> */}
            {/* <Text style={{fontSize: 30}}>{item.userName}</Text>
            <Text>{item.text}</Text> */}
            <Text style={styles.friendNameText}>{item.title}</Text>
          </View>

        )
    }

    toggleEditing(){
        if (this.state.isEditing){
            this.setState({isEditing: false});
            this.setState({editText: "Update Profile"});
            console.log(this.state.isEditing)
        }
        else{
            this.setState({isEditing: true})
            this.setState({editText: "Done"});
            console.log(this.state.isEditing)
        }
    }

    updateUser = async () => {
        if (this.state.isEditing){
            const name = this.state.profileName.split(" ", 5);
            var firstname = "";
            if (name.length > 1) {
                for (var i = 0; i < name.length-1; i++) {
                    if (i != name.length-2) {
                        firstname = firstname.concat(name[i] + " ");
                    }
                    else {
                        firstname = firstname.concat(name[i]);
                    }
                };

                await axios.post(`${API}/user/updateUserInfo`, {
                    "uid": this.props.user.uid,
                    "newUserInfo": {
                        "firstname": firstname,
                        "lastname": name[name.length-1]
                    }});
                }
            else {
                this.setState({
                    profileName: this.props.user.firstname + ' ' + this.props.user.lastname
                });
                console.log("Error: Name input too short, please input a first and last name.")
            }

            this.props.fetchUserInfo(this.props.user.uid);
        };
    }

    renderProfileInfo(){
        if (this.state.isEditing){
            return(
                <View>
                    <View style={styles.profilePicBox}>
                        <TouchableOpacity onPress={this._pickImage}>
                            <View style={styles.profileCircle}>
                                <Image uri={this.state.profilePic}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.profileInfoBox}>
                        <TextInput style={styles.profileName} onChangeText={(text) => {this.setState({ profileName: text});}} value={this.state.profileName} />
                        <View style={styles.emailBox}>
                            <Text style={styles.email}>{this.state.email}</Text>
                            <View style={styles.emailIcon}><Icon name='envelope' type='font-awesome' color='#8D8D8D'></Icon></View>
                        </View>
                    </View>
                </View>
            )
        }
        else{
            return(
                <View>
                    <View style={styles.profilePicBox}>
                        <Image source={this.state.profilePic ? {uri: this.state.profilePic} : null} style={styles.profileCircle}></Image>
                    </View>
                    <View style={styles.profileInfoBox}>
                        <Text style={styles.profileName}>{this.props.user.firstname + ' ' + this.props.user.lastname}</Text>
                        <View style={styles.emailBox}>
                            <Text style={styles.email}>{this.state.email}</Text>
                            <View style={styles.emailIcon}><Icon name='envelope' type='font-awesome' color='#8D8D8D'></Icon></View>
                        </View>
                    </View>
                </View>
            )

        }
    }

    getFriendsCarousel() {

        // let friends = this.props.user.friends.map(a => a.title);
        
      return (
        <View style={styles.thirdContainer}>
            <View style={styles.friendsHeaderBox}>
                <Text style={styles.friendTitle}>Friends</Text>
            </View>
            <View style={styles.friendsListBox}>
                <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                    <Carousel
                    layout={"default"}
                    ref={ref => this.carousel = ref}
                    data={this.props.user.friends}
                    sliderWidth={300}
                    itemWidth={250}
                    renderItem={this._renderItem}
                    onSnapToItem = { index => this.setState({activeIndex:index}) } />
                </View>
            </View>
        </View>
      );
    }

    render() {
        // console.log(this.props.user.email)
        // console.log(this.props.user.profilePic)
        // console.log("HERE")
        // console.log("RETRY")
        // console.log(this.props.user.profilePic)
        // console.log(this.props.user.friends)
        // console.log(this.props.user.userAlbums)
    //   console.log(this.props.user.firstname);
        if (this.state.profileName == null) {
            return(
                <View style={styles.preloader}>
                  <ActivityIndicator size="large" color="#9E9E9E"/>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Image
                style={styles.image}
                source={require('../assets/acc_bg.png')} />
                <View style={styles.menuBox}>
                    <Text style={styles.headerText}>REKALL</Text>
                    <TouchableOpacity style={styles.menuButton} onPress={()=> this.props.navigation.toggleDrawer()}>
                        <Image style={styles.navimage}
                            source={require('../assets/navbutton.png')}
                        />
                    </TouchableOpacity> 
                </View>
                <View style={styles.secondContainer}>
                    {this.renderProfileInfo()}
                </View>
                <View style={styles.vrCodeLabel}><Text style={styles.vrLabel}>VR Code</Text></View>
                <View style={styles.vrCodeBox}>
                    <Text style={styles.vrCode}>{this.state.vrcode}</Text>
                </View>
                { this.getFriendsCarousel() }
                <View style={styles.fourthContainer}>
                    <TouchableOpacity onPress={()=> {
                            this.toggleEditing();
                            this.updateUser();
                        }}>
                        <Text style={styles.updateText}>{this.state.editText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
  }


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 10,
        //opacity: 0.3,
        width: '100%',
        height: '100%',
    },
    button: {
      height: 40,
      justifyContent: 'center',
      alignContent: 'center',
      borderRadius: 10,
    },
    menuBox:{
        display: 'flex',
        height: '15%',
        width: '95%',
        //backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    menuButton:{
        alignSelf: 'flex-end',
    },
    navimage:{
        height: 60,
        width: 50,
        alignSelf: 'flex-end',
    },
    headerText:{
        alignSelf: 'flex-end',
        fontFamily: 'AppleSDGothicNeo-Bold',
        color: '#2C2C2C',
        fontSize: 22,
        paddingBottom: 5,
        fontWeight: "bold",
        textShadowColor: 'grey',
        textShadowOffset: { width: 1, height: 4},
        textShadowRadius: 5,
    },
    secondContainer:{
        //height: 250,
        flex: 2,
        //backgroundColor: 'teal',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
    profilePicBox: {
        display: 'flex',
        //height: 130,
        width: 410,
        //backgroundColor: 'green',
        // opacity: 0.1,
        alignSelf: 'center',
    },
    profileCircle:{
        height: 140,
        width: 140,
        backgroundColor: '#E8E8E8',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 100,
        borderWidth: 0.3,
    },
    profileInfoBox:{
        width: '100%',
        //height: 150,
        //backgroundColor: 'lightblue',
        alignSelf: 'center',
        //opacity: 0.3,
        justifyContent: 'flex-end',
        flexDirection: 'column',
    },
    profileName:{
        fontFamily: 'AppleSDGothicNeo-Bold',
        fontSize: 20,
        textAlign: 'center',
    },
    emailBox:{
        height: 50,
        //backgroundColor: 'blue',
        flexDirection: 'row-reverse',
        justifyContent: 'center',
    },
    email:{
        alignSelf: 'center',
        paddingLeft: 10,
        fontFamily: 'AppleSDGothicNeo-Thin',
        fontSize: 20,
    },
    emailIcon:{
        alignSelf: 'center',
        //paddingBottom: 10,
    },
    vrCodeBox:{
        width: 80,
        height: 50,
        backgroundColor: 'darkgrey',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    vrCodeLabel: {
        width: 80,
        height: 20,
        //backgroundColor: 'darkgrey',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    vrLabel: {
        fontFamily: 'AppleSDGothicNeo-Bold',
        fontSize: 15,
        textAlign: 'center',
        color: '#4A4A4B',
    },
    vrCode:{
        color: '#FFFFFF',
        fontFamily: 'AppleSDGothicNeo-Bold',
        fontSize: 25,
        textAlign: 'center',
    },
    thirdContainer:{
        //height: 300,
        //backgroundColor: 'pink',
        flex: 3,
        justifyContent: 'center',
    },
    fourthContainer: {
        //height: 100,
        flex: 1,
        //backgroundColor: 'lightgreen',
        justifyContent: 'center',
        
    },
    updateText:{
        fontSize: 20,
        fontFamily: 'AppleSDGothicNeo-Thin',
        textAlign: 'center',
    },
    friendsHeaderBox:{
        height: 50,
        //backgroundColor: 'lightblue',
        justifyContent: 'center',
    },
    friendTitle:{
        fontFamily: 'AppleSDGothicNeo-SemiBold',
        fontSize: 20,
        paddingLeft: 15,
    },
    friendsListBox:{
        height: 250,
        //backgroundColor: 'darkgreen',
    },
    friendContainer:{
        display: 'flex',
        backgroundColor:'floralwhite',
        borderRadius: 10,
        height: 250,
        // padding: 50,
        // marginLeft: 25,
        // marginRight: 25,
        flexDirection: 'column',
    },
    friendImage:{
        height: 200,
        backgroundColor: '#C4C4C4',
    },
    friendNameText:{
        fontFamily: 'AppleSDGothicNeo-Regular',
        color: '#4F4F4F',
        textAlign: 'center',
        fontSize: 25,
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
      }
});


const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
};

const mapDispatchToProps = (dispatch) => {
    return {
      fetchUserInfo: (userID) => dispatch(fetchUserInfo(userID)),
      newProfilePic: (userID, url) => dispatch(newProfilePic(userID, url)),
    //   updateUserInfo: (userID, userinfo) => dispatch(updateUserInfo(userID, userinfo))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
