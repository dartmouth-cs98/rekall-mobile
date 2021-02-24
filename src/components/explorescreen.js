import React, {Component} from 'react';
//import FontAwesome from 'FontAwesome';
// import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground, FlatList, PanResponder, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import { Icon } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import { LinearTextGradient } from 'react-native-text-gradient';
import { NavigationContainer } from '@react-navigation/native';
import youtubeSearch from './youtube_api.js';
import axios from 'axios';
import { connect } from 'react-redux';
import { addUserAlbum, addSharedAlbum, getAlbums, getSharedAlbums } from '../actions/albumActions';

const API = 'https://rekall-server.herokuapp.com';

class ExploreScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            querySearch: " ",
            isLoading: false,
            modalVisible: false,
            activeIndex:0,
            videos: [],
            pics: [],
        }
        this.renderVideoCard = this.renderVideoCard.bind(this);
    }

    fetchVideoData(query) {
        youtubeSearch(query)
          .then((responseData) => {
            this.setState({
              videos: responseData,
              isLoading: false,
            });
          }).catch((error) => {
            console.log(error);
          });
          //console.log(this.state.videos)
    }

    fetchPictureData(query) {
        youtubeSearch(query)
          .then((responseData) => {
            this.setState({
              pics: responseData,
              isLoading: false,
            });
          }).catch((error) => {
            console.log(error);
          });
    }

    componentDidMount(){
        this.fetchVideoData("360 Video");
        this.fetchPictureData("360 Picture");
    }

    renderLoadingView() {
        return (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
    }

    toggleSearch(){
        if (this.state.modalVisible){
            this.setState({modalVisible: false});
            this.setState({querySearch: " "});
        }
        else{
            this.setState({modalVisible: true})
            this.setState({querySearch: " "});
        }
    }

    searchVideos(){
        if (this.state.querySearch !== " "){
            var search = this.state.querySearch;
            var finalQuery = search.concat("360 Video");

            this.fetchVideoData(finalQuery);
            this.toggleSearch();
        }
    }

    searchPictures(){
        if (this.state.querySearch !== " "){
            var search = this.state.querySearch;
            var finalQuery = search.concat("360 Picture");
            
            this.fetchPictureData(finalQuery);
            this.toggleSearch();
        }
    }

    renderModal(){
        //console.log("In renderModal")
        if (this.state.modalVisible){
            return(
                <View>
                    <Modal isVisible={this.state.modalVisible} onSwipeComplete={()=> this.toggleSearch()} swipeDirection="up">
                        <View>
                            <View style={styles.modalContainer}>
                                <View style={styles.modal}>
                                    <Text style={styles.modalText}>Search 360 videos or pictures</Text>
                                    <TextInput style={styles.searchBox} label="Search..." mode='outline' value={this.state.querySearch} onChangeText={(text) => this.setState({ querySearch: text})}></TextInput>
                                    <View style={styles.modalButtonBox}>
                                        <Button mode='text' onPress={() => this.searchPictures()} color="#3B3B3B">Pictures</Button>
                                        <Button mode='text' onPress={() => this.searchVideos()} color="#3B3B3B">Videos</Button>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            )
        }
        
    }

    renderVideoCard({item,index}){
        // console.log(index);
        // console.log(item);
        if (item.title !== null){
          return (
            <View style={styles.videoContainer}>
              <View style={styles.videoImage}>
                <Image
                    source={{ uri: item.snippet.thumbnails.high.url }}
                    style={styles.videoImage}
                />
              </View>
              {/* <Text style={{fontSize: 30}}>{item.userName}</Text>
              <Text>{item.text}</Text> */}
              <View style={styles.videoCardBottom} >
                <View style={styles.videoTextBox}>
                    <Text style={styles.videoNameText}>{item.snippet.title}</Text>
                </View>
                <View style={styles.plusIconBox}>
                    <Icon style={styles.plusIcon} name='plus' size={40} type='evilicon' color='#686868'
                        onPress={()=> console.log("Item added to Gallery")}></Icon>
                </View>
              </View>
            </View>
  
          );
        }
    }


    get360Pictures(){
        return(
            <View style={styles.video360Container}>
                <View style={styles.video360HeaderBox}>
                    <Text style={styles.videoTitle}>360 Pictures</Text>
                </View>
                <View style={styles.video360ListBox}>
                    <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                        <Carousel
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={this.state.pics}
                            sliderWidth={300}
                            itemWidth={250}
                            renderItem={this.renderVideoCard}
                            onSnapToItem = { index => this.setState({activeIndex:index}) } />
                    </View>
                </View>
            </View>
        )
    }

    get360videos(){
        return(
            <View style={styles.video360Container}>
                <View style={styles.video360HeaderBox}>
                    <Text style={styles.videoTitle}>360 Videos</Text>
                </View>
                <View style={styles.video360ListBox}>
                    <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                        <Carousel
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={this.state.videos}
                            sliderWidth={300}
                            itemWidth={250}
                            renderItem={this.renderVideoCard}
                            onSnapToItem = { index => this.setState({activeIndex:index}) } />
                    </View>
                </View>
            </View>
        )
    }

    async loadData() {
        await this.props.getAlbums(this.props.user.uid);
        await this.props.getSharedAlbums(this.props.user.uid);
    }

    addMedia = async (userID, s3Key, mediaType, albumID, albumType) => {
        if (albumType == "User") {
            const url = `${API}/album/addMediaToAlbum`
        }
        else {
            const url = `${API}/album/addMediaToShared`
        }
        axios.put(`${API}/album/addMediaToLibrary`,
            { 
                "_id": userID,
                "s3Key": s3Key,
                "mediaType": mediaType
            }).then((res) => {
                axios.put(url,
                    { 
                        "album": {
                            "_id": albumID,
                        },
                        "media": {
                            "_id": res._id,
                        },
                    },
                ).then((res) => {
                    this.loadData();
                })
            }).catch((e) => {
                console.log(`Error putting media: ${e}`);
            });
    }

    render(){
        if (this.state.isLoading) {
            return this.renderLoadingView();
        }
        return(
            <LinearGradient
            colors={['#FFFFFF', '#D9D9D9']}
            style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.firstContainer}>
                        <View style={styles.menuBox}>
                            <Text style={styles.headerText}>EXPLORE</Text>
                            <TouchableOpacity style={styles.menuButton} onPress={()=> this.props.navigation.toggleDrawer()}>
                                <Image style={styles.image}
                                    source={require('../assets/navbutton.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {this.get360videos()}
                    {this.get360Pictures()}
                    <View style={styles.bottomContainer}>
                        <View style={styles.searchCircle}>
                            <Icon style={styles.searchIcon} name='search' size={50} type='material-icons' color='#686868'
                            onPress={() => this.toggleSearch()}></Icon>
                        </View>
                    </View>
                </View>
                <View>{this.renderModal()}</View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    // video360Container:{
    //     paddingTop: 20,
    //     height: 350,
    //     //backgroundColor: 'teal',
    // }, 
    video360HeaderBox:{
        height: 50,
        //backgroundColor: 'lightblue',
        justifyContent: 'flex-start',
    },
    // video360Container: {
    //     //height: 350,
    //     //backgroundColor: 'teal',
    // },
    videoTitle:{
        fontFamily: 'AppleSDGothicNeo-SemiBold',
        fontSize: 15,
        paddingLeft: 15,
    },
    video360Container:{
        paddingTop: 20,
        height: 350,
        //backgroundColor: 'lightblue'
    },
    videoTitle:{
        fontFamily: 'AppleSDGothicNeo-Bold',
        fontSize: 20,
        paddingLeft: 15,
    },
    video360ListBox:{
        height: 300,
        //backgroundColor: 'darkgreen',
    },
    videoContainer:{
        display: 'flex',
        backgroundColor:'#F8F5F5',
        //backgroundColor: '#BABABB',
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
    videoImage:{
        height: 180,
        backgroundColor: '#BABABB',
        borderRadius: 2,
    },
    videoCardBottom:{
        height: 70,
        flexDirection: 'row',
        //backgroundColor :'red',
        justifyContent: 'space-between',
    },
    videoNameText:{
        fontFamily: 'AppleSDGothicNeo-Regular',
        color: '#4F4F4F',
        //textAlign: "left",
        fontSize: 15,
        justifyContent: 'flex-end',
        paddingLeft: 5,
        paddingTop: 10,
    },
    bottomContainer: {
        height:  40,
        //backgroundColor: '#C4C4C4',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        //opacity: 0.6,
        paddingRight: 20,
    },
    searchCircle: {
        height: 55,
        width: 55,
        backgroundColor: '#F2F1F1',
        borderRadius: 40,
        shadowOffset:{width: 1, height: 1},
        shadowColor: 'black',
        shadowOpacity: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchIcon:{
        height: 50,
        width: 60,
        alignSelf: 'flex-end',
        //backgroundColor: 'red',
    },
    plusIcon: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    plusIconBox:{
        //backgroundColor: 'green',
        justifyContent: 'center',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoTextBox:{
        width: 200,
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
        height: 200,
    },
    modalButtonBox:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    modalText:{//
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'AppleSDGothicNeo-Bold',
    },
    searchBox: {
        backgroundColor: '#F2F1F1',
        height: 50,
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
        getAlbums: (userID) => dispatch(getAlbums(userID)),
        getSharedAlbums: (userID) => dispatch(getSharedAlbums(userID))
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen);
