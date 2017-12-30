// Init F7 Vue Plugin
Vue.use(Framework7Vue)

// Init Page Components
Vue.component('page-about', {
  template: '#page-about'
})
Vue.component('page-form', {
  template: '#page-form'
})
Vue.component('page-dynamic-routing', {
  template: '#page-dynamic-routing'
})

// Handle device ready event
// Note: You may want to check out the vue-cordova package on npm for cordova specific handling with vue - https://www.npmjs.com/package/vue-cordova
document.addEventListener('deviceready', () => {
  console.log("DEVICE IS READY!");    
}, false)

// Init App
new Vue({
  el: '#app',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
     material: true,
    routes: [
      {
        path: '/about/',
        component: 'page-about'
      },
      {
        path: '/form/',
        component: 'page-form'
      },
      {
        path: '/dynamic-route/blog/:blogId/post/:postId/',
        component: 'page-dynamic-routing'
      }
    ],
  }
});


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        document.getElementById("start").addEventListener("click", readTag, false);
        document.getElementById("stop").addEventListener("click", dontReadTag, false);
        document.getElementById("write").addEventListener("click", writeNFC, true);

        

       
    },
    
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }, 

  
};
function readNFC(nfcEvent){
   
        var tag = nfcEvent.tag,
            ndefMessage = tag.ndefMessage;

        // dump the raw json of the message
        // note: real code will need to decode
        // the payload from each record
        // alert(JSON.stringify(ndefMessage));

        navigator.vibrate(500);
        

        // assuming the first record in the message has
        // a payload that can be converted to a string.
        var message = nfc.bytesToString(ndefMessage[0].payload);
        
        alert( message.substring(3) );
    
}

function writeNFC(){
    alert("Gelieve de NFC tag tegen de gsm te houden aub");
    var input_value = document.getElementById('input_message').value
    var message = [
        ndef.textRecord(input_value),
    ];
    
    nfc.write(message, function () { // success callback
        navigator.vibrate(500);
        alert("Write succesfull " + message[0]);
    },
    function (error) { // error callback
        navigator.vibrate([100, 100, 300]);
        alert("Error writing: " + message[0] + JSON.stringify(error));

    });
}
function readTag() {
    alert('Tag gaat gelezen worden')
    // Read NDEF formatted NFC Tags
    nfc.addNdefListener (
        readNFC
       ,
       function () { // success callback
        document.getElementById("start").style.backgroundColor = "#a5ff82";
        document.getElementById("stop").style.backgroundColor = "white";
       },
       function (error) { // error callback
           alert("Error adding NDEF listener " + JSON.stringify(error));
       }
   );
}

function dontReadTag() {

    alert('Tag gaat niet meer gelezen worden');
    nfc.removeNdefListener(
        readNFC
        ,
        function () { // success callback
            alert("Succesfull stopped listening");
            document.getElementById("stop").style.backgroundColor = "#f78080";
            document.getElementById("start").style.backgroundColor = "white";
        },
        function (error) { // error callback
            alert("Error stopped listening");
        }
    );
 }