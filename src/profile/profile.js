import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import styles from './styles.js';
import { SvgUri } from 'react-native-svg';
import BgSvg from './svg/acc_bg.svg'
import MailSvg from './svg/mail.svg';
// import { FRIENDS } from './src/profile/static_temp/friends';
// import Carousel, { Pagination } from 'react-native-snap-carousel';

// const { slider1ActiveSlide } = this.state;
const dp = { uri: "https://instagram.fhkg4-2.fna.fbcdn.net/v/t51.2885-19/s150x150/46853264_2207226759604484_2017266248244527104_n.jpg?_nc_ht=instagram.fhkg4-2.fna.fbcdn.net&_nc_ohc=GrVcpz_laSUAX946mbe&tp=1&oh=63b1081997818194544de4e6379da0df&oe=600A4075"};

export default function App() {
  return (
    <View style={styles.container}>
      {/* profile photo */}
      <BgSvg style={styles.bg} />
      {/* <SvgUri width="200" height="100" source={require("./src/profile/svg/acc_bg.svg")} /> */}
      <Image source={dp} style={styles.logo}></Image>
      
      {/* name and email */}
      <Text style={styles.name}>Ashley Francisco</Text>
      <View style={styles.mail}>
        <MailSvg height={10} width={20} />
        {/* <SvgUri width="100" height="100" viewBox = "0 0 1024 1024" svgXmlData={MailSvg} /> */}
        <Text>sanfrancisco.21@dartmouth.edu</Text>
      </View>

      {/* friends */}
      <Text style={styles.friends}>Friends</Text>
      {/* <Carousel
        ref={c => this._slider1Ref = c}
        data={ENTRIES1}
        renderItem={this._renderItemWithParallax}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        hasParallaxImages={true}
        firstItem={SLIDER_1_FIRST_ITEM}
        inactiveSlideScale={0.94}
        inactiveSlideOpacity={0.7}
        // inactiveSlideShift={20}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContentContainer}
        loop={true}
        loopClonesPerSide={2}
        autoplay={true}
        autoplayDelay={500}
        autoplayInterval={3000}
        onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
      />
      <Pagination
        dotsLength={FRIENDS.length}
        activeDotIndex={slider1ActiveSlide}
        containerStyle={styles.paginationContainer}
        dotColor={'rgba(255, 255, 255, 0.92)'}
        dotStyle={styles.paginationDot}
        inactiveDotColor={colors.black}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        carouselRef={this._slider1Ref}
        tappableDots={!!this._slider1Ref}
      /> */}
    </View>
  );
}
