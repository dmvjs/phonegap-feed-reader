cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.dialogs/www/notification.js",
        "id": "org.apache.cordova.dialogs.notification",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.dialogs/www/blackberry10/beep.js",
        "id": "org.apache.cordova.dialogs.beep",
        "clobbers": [
            "window.navigator.notification.beep"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/DirectoryEntry.js",
        "id": "org.apache.cordova.file.DirectoryEntry",
        "clobbers": [
            "window.DirectoryEntry"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/DirectoryReader.js",
        "id": "org.apache.cordova.file.DirectoryReader",
        "clobbers": [
            "window.DirectoryReader"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/Entry.js",
        "id": "org.apache.cordova.file.Entry",
        "clobbers": [
            "window.Entry"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/File.js",
        "id": "org.apache.cordova.file.File",
        "clobbers": [
            "window.File"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/FileEntry.js",
        "id": "org.apache.cordova.file.FileEntry",
        "clobbers": [
            "window.FileEntry"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/FileError.js",
        "id": "org.apache.cordova.file.FileError",
        "clobbers": [
            "window.FileError"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/FileReader.js",
        "id": "org.apache.cordova.file.FileReader",
        "clobbers": [
            "window.FileReader"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/FileSystem.js",
        "id": "org.apache.cordova.file.FileSystem",
        "clobbers": [
            "window.FileSystem"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/FileUploadOptions.js",
        "id": "org.apache.cordova.file.FileUploadOptions",
        "clobbers": [
            "window.FileUploadOptions"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/FileUploadResult.js",
        "id": "org.apache.cordova.file.FileUploadResult",
        "clobbers": [
            "window.FileUploadResult"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/FileWriter.js",
        "id": "org.apache.cordova.file.FileWriter",
        "clobbers": [
            "window.FileWriter"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/Flags.js",
        "id": "org.apache.cordova.file.Flags",
        "clobbers": [
            "window.Flags"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/LocalFileSystem.js",
        "id": "org.apache.cordova.file.LocalFileSystem",
        "clobbers": [
            "window.LocalFileSystem"
        ],
        "merges": [
            "window"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/Metadata.js",
        "id": "org.apache.cordova.file.Metadata",
        "clobbers": [
            "window.Metadata"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/ProgressEvent.js",
        "id": "org.apache.cordova.file.ProgressEvent",
        "clobbers": [
            "window.ProgressEvent"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/requestFileSystem.js",
        "id": "org.apache.cordova.file.requestFileSystem",
        "clobbers": [
            "window.requestFileSystem"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/resolveLocalFileSystemURI.js",
        "id": "org.apache.cordova.file.resolveLocalFileSystemURI",
        "merges": [
            "window"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/blackberry10/fileUtils.js",
        "id": "org.apache.cordova.file.BB10Utils"
    },
    {
        "file": "plugins/org.apache.cordova.file/www/blackberry10/DirectoryEntry.js",
        "id": "org.apache.cordova.file.BB10DirectoryEntry",
        "clobbers": [
            "window.DirectoryEntry"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/blackberry10/DirectoryReader.js",
        "id": "org.apache.cordova.file.BB10DirectoryReader",
        "clobbers": [
            "window.DirectoryReader"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/blackberry10/Entry.js",
        "id": "org.apache.cordova.file.BB10Entry",
        "clobbers": [
            "window.Entry"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/blackberry10/File.js",
        "id": "org.apache.cordova.file.BB10File",
        "clobbers": [
            "window.File"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/blackberry10/FileEntry.js",
        "id": "org.apache.cordova.file.BB10FileEntry",
        "clobbers": [
            "window.FileEntry"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/blackberry10/FileReader.js",
        "id": "org.apache.cordova.file.BB10FileReader",
        "clobbers": [
            "window.FileReader"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/blackberry10/FileSystem.js",
        "id": "org.apache.cordova.file.BB10FileSystem",
        "clobbers": [
            "window.FileSystem"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/blackberry10/FileWriter.js",
        "id": "org.apache.cordova.file.BB10FileWriter",
        "clobbers": [
            "window.FileWriter"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/blackberry10/requestFileSystem.js",
        "id": "org.apache.cordova.file.BB10requestFileSystem",
        "clobbers": [
            "window.requestFileSystem"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file/www/blackberry10/resolveLocalFileSystemURI.js",
        "id": "org.apache.cordova.file.BB10resolveLocalFileSystemURI",
        "clobbers": [
            "window.resolveLocalFileSystemURI"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file-transfer/www/FileTransferError.js",
        "id": "org.apache.cordova.file-transfer.FileTransferError",
        "clobbers": [
            "window.FileTransferError"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file-transfer/www/FileTransfer.js",
        "id": "org.apache.cordova.file-transfer.FileTransfer",
        "clobbers": [
            "window.FileTransfer"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file-transfer/www/blackberry10/FileTransfer.js",
        "id": "org.apache.cordova.file-transfer.BB10FileTransfer",
        "clobbers": [
            "window.FileTransfer"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.file-transfer/www/blackberry10/XHRImplementation.js",
        "id": "org.apache.cordova.file-transfer.BB10XHRImplementation"
    },
    {
        "file": "plugins/org.apache.cordova.inappbrowser/www/InAppBrowser.js",
        "id": "org.apache.cordova.inappbrowser.InAppBrowser",
        "clobbers": [
            "window.open"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.network-information/www/network.js",
        "id": "org.apache.cordova.network-information.network",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.network-information/www/Connection.js",
        "id": "org.apache.cordova.network-information.Connection",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.splashscreen/www/splashscreen.js",
        "id": "org.apache.cordova.splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/com.danielcwilson.plugins.googleanalytics/www/analytics.js",
        "id": "com.danielcwilson.plugins.googleanalytics.UniversalAnalytics",
        "clobbers": [
            "analytics"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.device": "0.2.8",
    "org.apache.cordova.dialogs": "0.2.6",
    "org.apache.cordova.file": "1.0.0",
    "org.apache.cordova.file-transfer": "0.4.1",
    "org.apache.cordova.inappbrowser": "0.3.0",
    "org.apache.cordova.network-information": "0.2.7",
    "org.apache.cordova.splashscreen": "0.2.7",
    "com.danielcwilson.plugins.googleanalytics": "0.1.2"
}
// BOTTOM OF METADATA
});