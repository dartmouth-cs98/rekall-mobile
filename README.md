# ReKall
#### Divya Kopale, Eileen Xia, Ashley Francisco, Chris Cheng, Ashley Song

![Team Photo](https://github.com/dartmouth-cs98/20f-facetim3d/blob/master/newTeamPhoto.jpg)

## Project Vision:
*ReKall* is a vision we have for a Virtual Reality application that takes "immersive experiences" to the next level. Currently, streaming 180/360 videos to the VR is limited to the few videos on Youtube, and some offered by Oculus app store. However, our team hopes to take it to the next level by creating an application that will allow a cohesive 180/360 video uploading, sharing, and viewing process. If possible, we'd like to enable a livestreaming feature.

With the current limitations imposed on us by the pandemic, we are inspired to create a way for people to watch concerts, sports events, or even family events through an immersive, interactive experience beyond the everyday 2D laptop/phone screen.

## Inspiration:
For the first iteration of our application, we use Apple's shared photo albums and Snapchat's "memories" feature as a source of inspiration. Our first goal is to create a user-facing VR app that helps people, in a sense, *re-live* some of their memories. This idea allowed us to expand our initial user group of just seniors to a much broader group of anyone who wants to relive a memory.

## Architecture
### Tech Stack
We are using React Native to create the mobile aspect of the VR experience, and it is compatible with React Native versions ^0.63.4. Rekall is developed for use on the Oculus Quest, but the user uploads and adds YouTube videos to their albums via our mobile app. The backend is comprised of an API hosted on heroku, as well as a MongoDB database.

1. AWS S3: video and image storage
2. Firebase: user access management

### Important Packages (Mobile)
* See [package.json](https://github.com/dartmouth-cs98/rekall-mobile/blob/master/package.json)

### Directory Structure
```
├──[rekall-mobile]/           	  # root directory
|  └──[src]/                      # contains core scripts, reducers, etc.
      └──[actions]                # contains main actions to facilitate interaction with backend
|     └──[assets]/                # contains assets for mobile frontend interface
|     └──[components]/            # contains the screens for the mobile app
|     └──[navigation]/            # contains navigation modals
|     └──[reducers]/              # contains the reducers for the mobile backend
|     └──[services]/              # contains Firebase login
```


## Setup
### Expo Go configuration
1. Download Expo Go on your mobile device
2. Login with user: rekall-cs98 pass: ashleysong0418
3. Click into Rekall and begin using!

### Pages
* Explore
    * This page has an assortment of 360º YouTube videos that you can browse through and add to your albums.
* Albums
    * This page shows your albums; you can tap into them and browse through your thumbnails. However, to view your videos, you have to enter your VR headset!
    * Once you tap into your albums, you can upload your own images and videos.
    * My Albums are YOUR personal albums for your viewing only. Shared Albums are albums that you can share with friends, who can also view your content!
* Friends
    * Send friend requests and manage your received friend requests here.
* Profile
    * This page has your VR CODE, which you will need to log into the ReKall VR app!
    * Upload a profile picture here, change your name, and see your friends!

## Detailed Documentation and Sources:
TODO

## Authors
Ashley Song, Ashley Francisco, Chris Cheng, Divya Kopalle, Eileen Xia

## Acknowledgments
Thank you to Tim Tregubov for all the mentorship and guidance throughout this project!
