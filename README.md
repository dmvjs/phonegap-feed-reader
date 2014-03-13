phonegap-feed-reader
====================

a PhoneGap Feed Reader (only iOS & Android so far but this will support FFOS, Windows and BBOS if all goes well)

This feed reader application displays RSSish xml feeds by converting them to JSON objects which are stored locally on a users device using the PhoneGap File API. Feeds are comprised of stories which have titles, text, images, etc. The images for each feed are stored locally as well for offline viewing. Some images are used across feeds so this feed reader only downloads images once and uses JS promises to check if they exist already before downloading again. 

This feed reader uses PhoneGap's InAppBrowser plugin (compatible with iOS and Android only) which could use some UI work on the iOS toolbar as the default UI looks rather wizzeak. The socialsharing plugin is also used which is pretty badass and works for both iOS and Android (also WP8 but I have not implemented yet). Respect! https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin

Currently iOS and Android are supported but Android needs skinning (as of 2014-03-13).

Future changes include:
FFOS, Windows and Blackberry versions
Ability to add feeds to a favorite feed list that will persist
Ability to receive JSON feeds
Ability to show videos and other embedded content
Improved mobile table support when tables appear within stories
Ability to get updates and have them append to current story list

Little things soon to come:
A better spinner graphic for iOS (or a native one)
Perfect icons and start screens (currently not perfect)
Improved header show/hide UI
Android skinning (assets are eady to go)
Swipe gesture support for stories
Ability to delete a story from a feed (mark as deleted, remove image and content)
Ability to add preferences including:
• font size
• auto get new posts
• post max limit (50 stories in the story list?)

