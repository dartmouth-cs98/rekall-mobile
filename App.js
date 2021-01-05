import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LogoScreen from './src/components/logoscreen.js';
import WelcomeScreen from './src/components/welcomescreen.js';
import ExploreScreen from './src/components/explorescreen.js';
import Swiper from 'react-native-swiper';
import NavModal from './src/navigation/navmodal.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      showMain: false,
    }
    this.showMainApp = this.showMainApp.bind(this);
  }
  
  showMainApp (value){
    this.setState({ showMain: value })
    //console.log(this.state.showMain)
  }

  render(){
    if (this.state.showMain){
      return (
        //<ExploreScreen />
        <NavModal />
      );
    }
    else{
      return(
        <Swiper
          loop={false}
          horizontal={true}>
          <LogoScreen />
          <WelcomeScreen onMainApp={this.showMainApp} />
        </Swiper>
      )
    }
  }
}

// class App extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       showMain: false,
//     }
//     this.showMainApp = this.showMainApp.bind(this);
//   }
  
//   showMainApp (value){
//     this.setState({ showMain: value })
//     //console.log(this.state.showMain)
//   }

//   render(){
//     return(
//       //<ExploreScreen />
      
//     )

//   //   if (this.state.showMain){
//   //     return (
//   //       <ExploreScreen />
//   //     );
//   //   }
//   //   else{
//   //     return(
//   //       <Swiper
//   //         loop={false}
//   //         horizontal={true}>
//   //         <LogoScreen />
//   //         <WelcomeScreen onMainApp={this.showMainApp} />
//   //       </Swiper>
//   //     )
//   //   }
//   // }
//   }
// }

export default App;