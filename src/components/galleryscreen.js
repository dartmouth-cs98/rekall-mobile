import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchUserInfo } from '../actions/userActions';
import { addUserAlbum, addSharedAlbum, getAlbums, getSharedAlbums } from '../actions/albumActions';
//import FontAwesome from 'FontAwesome';
// import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground, ActivityIndicator,
    PanResponder, Alert, ActionSheetIOS} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import { Icon } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import { LinearTextGradient } from 'react-native-text-gradient';
import { NavigationContainer } from '@react-navigation/native';

// const uid = "6010a60b2903ce360163ca10"

class GalleryScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            myAlbums: null,
            sharedAlbums: [],
            isModalVisible: false,
            newAlbumName: "",
        }
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        await this.props.getAlbums(this.props.user.uid).then(() => {
            this.setState({
                myAlbums: this.props.user.userAlbums,
            });
        });

        await this.props.getSharedAlbums(this.props.user.uid).then(() => {
            this.setState({
                sharedAlbums: this.props.user.sharedAlbums,
            });
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

    async addMyAlbum(e){
        e.preventDefault();
        const newAlbumName = this.state.newAlbumName;
        // this.setState({
        //     myAlbums: [...this.state.myAlbums, newAlbumName]
        // });
        console.log(this.state.myAlbums)
        this.toggleModal()
        // this.setState({
        //     newAlbumName: ""
        // });
        await this.props.UpdateUserAlbums(this.props.user.uid, newAlbumName).then(() => {
            this.props.fetchUserInfo(this.props.user.uid).then(() => {
                this.setState({
                    myAlbums: this.props.user.userAlbums,
                });
            });
        });
    }

    async addSharedAlbum(e){
        e.preventDefault();
        const newAlbumName = this.state.newAlbumName;
        this.setState({
            sharedAlbums: [...this.state.sharedAlbums, newAlbumName]
        });
        console.log(this.state.sharedAlbums)
        this.toggleModal()
        // this.setState({
        //     newAlbumName: ""
        // });
        await this.props.UpdateSharedAlbums(this.props.user.uid, newAlbumName, []).then(() => {
            this.props.fetchUserInfo(this.props.user.uid).then(() => {
                this.setState({
                    sharedAlbums: this.props.user.sharedAlbums,
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
      if (item.albumName !== null){
        console.log(item)
        const video = item.albumMedia[0].s3Key.split('/', 5);
        const thumbnail = 'https://rekall-storage.s3.amazonaws.com/' + video[0] + '/Thumbnails/' + video[2].slice(0, -4) + '.png';
        console.log(thumbnail)

        return (
          <View style={styles.friendContainer}>
            <Image style={styles.friendImage} source={thumbnail ? {uri: thumbnail} : null}></Image>
            <Text style={styles.friendNameText}>{item.albumName}</Text>
          </View>

        );
      }
    }

    getAlbums() {
      const albums = this.state.myAlbums.map((name) => {
        if (name !== null || name !== ''){
          return name;
            // albumName: name,
            // text: "MyAlbum"
        //   };
        }
      });
      return (
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
                      data={albums}
                      sliderWidth={300}
                      itemWidth={250}
                      renderItem={this.renderAlbumCard}
                      onSnapToItem = { index => this.setState({activeIndex:index}) }
                      key = {this.state.myAlbums} />
                  </View>
                </View>
            </View>        
        </View>

      );
    }

    getSharedAlbums() {
      const sharedAlbums = this.state.sharedAlbums.map((name) => {
        if (name !== null || name !== ''){
          return name;
        //     albumName: name,
        //     text: "Shared"
        //   };
        }
      });
      return (
        <View style={styles.sharedAlbumsContainer}>
            <View style={styles.albumHeaderBox}>
                <Text style={styles.albumTitle}>Shared Albums</Text>
            </View>
            <View style={styles.friendsListBox}>
                <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                    <Carousel
                        layout={"default"}
                        ref={ref => this.carousel = ref}
                        data={sharedAlbums}
                        sliderWidth={300}
                        itemWidth={250}
                        renderItem={this.renderAlbumCard}
                        onSnapToItem = { index => this.setState({activeIndex:index}) } 
                        key = {this.state.sharedAlbums} />
                </View>
            </View>
        </View>
      );
    }

    render(){
        if (this.state.myAlbums == null) {
            return(
                <View style={styles.preloader}>
                  <ActivityIndicator size="large" color="#9E9E9E"/>
                </View>
            )
        }
        console.log(this.state.myAlbums)
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
                    { this.getAlbums() }
                    {this.getSharedAlbums()}
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
        UpdateSharedAlbums: (user, sharedalbum, sharedwith) => dispatch(addSharedAlbum(user, sharedalbum, sharedwith)),
        fetchUserInfo: (userID) => dispatch(fetchUserInfo(userID)),
        getAlbums: (userID) => dispatch(getAlbums(userID)),
        getSharedAlbums: (userID) => dispatch(getSharedAlbums(userID))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(GalleryScreen);