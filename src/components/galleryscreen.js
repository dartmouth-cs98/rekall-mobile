import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchUserInfo } from '../actions/userActions';
import { addUserAlbum, addSharedAlbum } from '../actions/albumActions';
//import FontAwesome from 'FontAwesome';
// import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, PanResponder, Alert, ActionSheetIOS} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import { Icon } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import { LinearTextGradient } from 'react-native-text-gradient';
import { NavigationContainer } from '@react-navigation/native';

const uid = "5fb47383de4e8ebf1d79d3b4"

class GalleryScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            myAlbums: [],
            sharedAlbums: [],
            isModalVisible: false,
            newAlbumName: "",
        }
    }

    componentDidMount() {
        this.props.fetchUserInfo(uid);
        this.setState({
            myAlbums: this.props.user.userAlbums,
            sharedAlbums: this.props.user.sharedAlbums,
        });
    }

    componentWillMount = () => {
        this.setState({
            myAlbums: this.props.user.userAlbums,
            sharedAlbums: this.props.user.sharedAlbums,
        });
    }

    toggleModal(){
        console.log("In toggleModal")
        if (this.state.isModalVisible){
            this.setState({isModalVisible: false});
            console.log(this.state.isModalVisible)
            console.log(this.state.newAlbumName)
        }
        else{
            this.setState({isModalVisible: true})
            console.log(this.state.isModalVisible)
            console.log(this.state.newAlbumName)
        }
    }

    addMyAlbum(e){
        e.preventDefault();
        const newAlbumName = this.state.newAlbumName;
        const obj = {'albumName': newAlbumName}
        this.setState({
            myAlbums: [...this.state.myAlbums, newAlbumName]
        });
        console.log(this.state.myAlbums)
        this.toggleModal()
        this.setState({
            newAlbumName: ""
        });
        this.props.UpdateUserAlbums(uid, newAlbumName);
    }

    addSharedAlbum(e){
        e.preventDefault();
        const newAlbumName = this.state.newAlbumName;
        const obj = {'albumName': newAlbumName}
        this.setState({
            sharedAlbums: [...this.state.sharedAlbums, newAlbumName]
        });
        console.log(this.state.sharedAlbums)
        this.toggleModal()
        this.setState({
            newAlbumName: ""
        });
        this.props.UpdateSharedAlbums(uid, newAlbumName);
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
                                    <Text style={styles.modalText}>Create new album and select album group</Text>
                                    <TextInput label="Enter Album Name...." mode='flat'  value={this.state.newAlbumName} onChangeText={(text) => this.setState({newAlbumName: text})}></TextInput>
                                    <View style={styles.modalButtonBox}>
                                        <Button mode='text' onPress={(e)=> this.addSharedAlbum(e)} color="#3B3B3B">Shared Albums</Button>
                                        <Button mode='text' onPress={(e)=> this.addMyAlbum(e)} color="#3B3B3B">My Albums</Button>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            )
        }
        
    }
  

    renderAlbumCard({item,index}){
        return (
          <View style={styles.friendContainer}>
            <View style={styles.friendImage}>

            </View>
            {/* <Text style={{fontSize: 30}}>{item.userName}</Text>
            <Text>{item.text}</Text> */}
            <Text style={styles.friendNameText}>{item}</Text>
          </View>

        )
    }

    // addAlbums(){

    // }

    render(){
        return(
            <LinearGradient
            colors={['#FFFFFF', '#D9D9D9']}
            style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.firstContainer}>
                        <View style={styles.menuBox}>
                            <Text style={styles.headerText}>GALLERY</Text>
                            <TouchableOpacity style={styles.menuButton} onPress={()=> this.props.navigation.toggleDrawer()}>
                                <Image style={styles.image}
                                    source={require('../assets/navbutton.png')}
                                />
                            </TouchableOpacity> 
                        </View>
                    </View>
                    <View style={styles.myAlbumsContainer}>
                        <View style={styles.albumHeaderBox}>
                            <Text style={styles.albumTitle}>My Albums</Text>
                        </View>
                        <View style={styles.albumsContainer}>
                            <View style={styles.friendsListBox}>
                                <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                                    <Carousel
                                    layout={"default"}
                                    ref={ref => this.carousel = ref}
                                    data={this.state.myAlbums}
                                    sliderWidth={300}
                                    itemWidth={250}
                                    renderItem={this.renderAlbumCard}
                                    onSnapToItem = { index => this.setState({activeIndex:index}) } />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.sharedAlbumsContainer}>
                        <View style={styles.albumHeaderBox}>
                            <Text style={styles.albumTitle}>Shared Albums</Text>
                        </View>
                        <View style={styles.friendsListBox}>
                            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                                <Carousel
                                    layout={"default"}
                                    ref={ref => this.carousel = ref}
                                    data={this.state.sharedAlbums}
                                    sliderWidth={300}
                                    itemWidth={250}
                                    renderItem={this.renderAlbumCard}
                                    onSnapToItem = { index => this.setState({activeIndex:index}) } />
                            </View>
                        </View>
                    </View>
                    
                    <View style={styles.bottomContainer}>
                        <Icon style={styles.plusIcon} name='plus' size={60} type='evilicon' color='#686868'
                        onPress={()=> this.toggleModal()}></Icon>
                    </View>
                </View>
                <View>{this.renderModal()}</View>
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
    albumsContainer: {
        height: 300,
        //backgroundColor: 'teal',
    },
    bottomContainer: {
        height:  400,
        backgroundColor: '#838484',
        opacity: 0.6,
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
    bottomContainer: {
        height:  40,
        //backgroundColor: '#C4C4C4',
        justifyContent: 'flex-end',
        //opacity: 0.6,
        paddingRight: 20,
    },
    plusIcon:{
        height: 50,
        width: 60,
        alignSelf: 'flex-end',
        //backgroundColor: 'red',
    },
    myAlbumsContainer:{
        paddingTop: 20,
        height: 350,
        //backgroundColor: 'teal',
    },
    albumHeaderBox:{
        height: 50,
        //backgroundColor: 'lightblue',
        justifyContent: 'flex-start',
    },
    albumsContainer: {
        //height: 350,
        //backgroundColor: 'teal',
    },
    albumTitle:{
        fontFamily: 'AppleSDGothicNeo-SemiBold',
        fontSize: 20,
        paddingLeft: 15,
    },
    sharedAlbumsContainer:{
        paddingTop: 20,
        height: 350,
        //backgroundColor: 'lightblue'
    },
    friendTitle:{
        fontFamily: 'AppleSDGothicNeo-Bold',
        fontSize: 20,
        paddingLeft: 15,
    },
    friendsListBox:{
        height: 300,
        //backgroundColor: 'darkgreen',
    },
    friendContainer:{
        display: 'flex',
        //backgroundColor:'floralwhite',
        backgroundColor: '#BABABB',
        borderRadius: 10,
        height: 250,
        // padding: 50,
        // marginLeft: 25,
        // marginRight: 25,
        flexDirection: 'column',
        shadowOffset:{  height: 1},
        shadowColor: 'black',
        shadowOpacity: 0.8,
    },
    friendImage:{
        height: 200,
        backgroundColor: '#BABABB',
        borderRadius: 10,
    },
    friendNameText:{
        fontFamily: 'AppleSDGothicNeo-Bold',
        color: '#FFFFFF',
        textAlign: "left",
        fontSize: 25,
        paddingLeft: 20,
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
        UpdateUserAlbums: (user, useralbum) => dispatch(addUserAlbum(user, useralbum)),
        UpdateSharedAlbums: (user, sharedalbum) => dispatch(addSharedAlbum(user, sharedalbum)),
        fetchUserInfo: fetchUserInfo
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(GalleryScreen);