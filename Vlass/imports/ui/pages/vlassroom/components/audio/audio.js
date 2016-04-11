/**
 * Created by leonc on 4/6/2016.
 */
import  './peer.js';
import './audio.html';

Template.audio.onCreated(function () {
  // Create a Peer instance
  console.log(Peer);

  window.peer = new Peer({
    key: 'fr87aq2zcjbawcdi',  // get a free key at http://peerjs.com/peerserver
    debug: 3,
    config: {'iceServers': [
      { url: 'stun:stun.l.google.com:19302' },
      { url: 'stun:stun1.l.google.com:19302' },
    ]}
  });

  // Handle event: upon opening our connection to the PeerJS server
  peer.on('open', function () {
    $('#myPeerId').text(peer.id);
  });

  // Handle event: remote peer receives a call
  peer.on('call', function (incomingCall) {
    window.currentCall = incomingCall;
    incomingCall.answer(window.localStream);
    incomingCall.on('stream', function (remoteStream) {
      window.remoteStream = remoteStream;
      var video = document.getElementById("theirVideo")
      video.src = URL.createObjectURL(remoteStream);
    });
  });
  navigator.getUserMedia = ( navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia );

  // get audio/video
  /*
  navigator.getUserMedia({audio:true, video: false}, function (stream) {
      //display video
      var video = document.getElementById("myVideo");
      video.src = URL.createObjectURL(stream);
      window.localStream = stream;
    },
    function (error) { console.log(error); }
  );
  */
});

Template.audio.events({
  "click #makeCall": function () {
    var outgoingCall = peer.call($('#remotePeerId').val(), window.localStream);
    window.currentCall = outgoingCall;
    outgoingCall.on('stream', function (remoteStream) {
      window.remoteStream = remoteStream;
      var video = document.getElementById("theirVideo")
      video.src = URL.createObjectURL(remoteStream);
    });
  },

  "click #endCall": function () {
    window.currentCall.close();
  }
});