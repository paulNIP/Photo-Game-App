# Photo-Game-App
A simple mobile application allows users to upload pictures that other users can vote up or vote down. The current winner is the one whose pictures have been both viewed the most and up-voted the most, and least down-voted.

This mobile app client and its server side together provide the functionality below:
1. User sign up (unique username and email address)
2. Login with username
3. Log out
4. Picture capture via the phone camera
5. Picture and picture attributes (see #9) upload to remote API endpoint
6. Up-voting a picture of another user
7. Down-voting a picture of another user
8. Browsing/viewing pictures either by latest or highest scoring (the score is based
on number of views and up/down votes)
9. Pictures can be assigned the following attributes:
a. Caption/title (mandatory)
b. Description
c. Category (The list of picture categories is: People, Nature, City Life, Love,
Sports, and Family)
d. Owner (the user who took the picture with their phone camera and
uploaded it)
e. Location (Address detail of your choice)
f. Time and date the photo was taken
10. Offline storage for pictures (and data) for upload later
11.The application may be packaged for production or test, and the app theme and
server side API URL will be different for each
12. After capturing the image and collecting the required information, the API call will
have to be in the background and the user should be able to perform regular
