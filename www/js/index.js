/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        cordova.plugins.diagnostic.requestRuntimePermission(function(status){
            switch(status){
                case cordova.plugins.diagnostic.runtimePermissionStatus.GRANTED:
                    console.log("Permission granted (or already granted) - call the plugin");
                    // call SQLite plugin
                    break;
                case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED:
                    console.log("Permission denied - ask again");
                    alert("Come on user, we really need this. I'll ask again...");
                    requestPermission();
                    break;
                case cordova.plugins.diagnostic.runtimePermissionStatus.DENIED_ALWAYS:
                    console.log("Permission permanently denied");
                    alert("Well that's it, we're dead Jim");
                    navigator.app.exitApp();
                    break;
            }
        }, function(error){
            console.error("The following error occurred: "+error);
        }, cordova.plugins.diagnostic.runtimePermission.READ_PHONE_STATE);

        var permissions = cordova.plugins.permissions;
        permissions.checkPermission(permissions.CAMERA, function( status ){
          if ( status.hasPermission ) {
            console.log("Yes :D ");

            navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
                var ref = cordova.InAppBrowser.open('https://marcusbelcher.github.io/wasm-asm-camera-webgl-test/index.html', '_blank', 'location=yes');
                //var ref = cordova.InAppBrowser.open('https://compass.glslabs.com', '_blank', 'location=yes');
            }).catch(function(err) {
                //log to console first
                console.log(err); /* handle the error */
                if (err.name == "NotFoundError" || err.name == "DevicesNotFoundError") {
                    //required track is missing
                } else if (err.name == "NotReadableError" || err.name == "TrackStartError") {
                    //webcam or mic are already in use
                } else if (err.name == "OverconstrainedError" || err.name == "ConstraintNotSatisfiedError") {
                    //constraints can not be satisfied by avb. devices
                } else if (err.name == "NotAllowedError" || err.name == "PermissionDeniedError") {
                    //permission denied in browser
                } else if (err.name == "TypeError" || err.name == "TypeError") {
                    //empty constraints object
                } else {
                    //other errors
                }
            });
          }
          else {
            console.warn("No :( ");
          }
        });

        var constraints = {
            video: true,
            audio: false
        }


    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();