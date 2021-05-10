# twit-media-gallery
Desktop app that fetch and display multiple Twitter user's media tweet images

 in a photo gallery style

currently a WIP

# How to use
### Setup
1. Enter the keys that you get from Twitter Developer Portal -> Projects 
2. Enter the @ of the user that you want. Get tweet count range is between 5-100 due to Twitter API limitation. 
For example, if "Get tweet count" is 100 and "Get Count Timeline" is pressed, then the program will fetch the most recent 100 tweets from the @user and display the attachments of those tweets (if there is any). If "Get All Timeline" is pressed, the program will attempt to fetch up to 3200 tweets (limited by Twitter API) and display all the attachments to those tweets (if there is any). 
Note: "Get All Timeline" may take some time because of call delays (Indicator to be added). 

### Delete Images
1. Tick the selection mode checkbox
2. Click on the images to select them and press delete selected when done. 

### Demo
![demo](https://user-images.githubusercontent.com/42505518/117599543-feac4900-b117-11eb-8a5c-8c6f7abb9cc8.gif)

Note: keys and data are stored in the twit-media-gallery folder in the AppData folder

# Planned Features/Changes
Error & Progress Notifications
Different Albums and move items between albums
Different image displaying layouts
Magnified view of images
Get Twitter user liked tweets
Convert project to use React (Possibly)

# Libraries Used
[SimpleBar](https://github.com/Grsmto/simplebar) (for nice looking scrollbar)
[Twit](https://github.com/ttezel/twit) (for signing into Twitter API and make calls with endpoints)
[Electron](https://www.electronjs.org/)
