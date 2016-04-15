Template.emitter.onCreated(function () {


  peer.on('open', function () {
    $('#myPeerId').text(peer.id);
  });

  peer.on('call', function (incomingCall) {
    window.currentCall = incomingCall;
    incomingCall.answer(window.localStream);
    incomingCall.on('stream', function (remoteStream) {
      if(remoteStream) {
        window.remoteStream = remoteStream;
        var audio = document.getElementById("theirAudio");
        audio.src = URL.createObjectURL(remoteStream);
      }
    });
  });

  navigator.getUserMedia = ( navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia );

  navigator.getUserMedia({audio:true, video: false}, function (stream) {
    //display video

    var audio = document.getElementById("myAudio");
    //audio.src = URL.createObjectURL(stream);
    window.localStream = stream;

  },
  function (error) { console.log(error); }
);


});


Streamy.on('connectToRoom', function (msg) {
  console.log(msg.peerid);
  var outgoingCall = peer.call(msg.peerid, localStream);
  window.currentCall = outgoingCall;
  outgoingCall.on('stream', function (remoteStream) {
    console.log('...connected?');
    window.remoteStream = remoteStream;
    var audio = document.getElementById("theirAudio");
    audio.src = URL.createObjectURL(remoteStream);
  });

});
Template.emitter.events({
  "click #makeCall": function () {
    console.log(peer);
    var outgoingCall = peer.call($('#remotePeerId').val(), localStream);
    window.currentCall = outgoingCall;
    outgoingCall.on('stream', function (remoteStream) {
      console.log('...connected?');
      window.remoteStream = remoteStream;
      var audio = document.getElementById("theirAudio");
      audio.src = URL.createObjectURL(remoteStream);
    });
  },

  "click #endCall": function () {
    window.currentCall.close();
  }
});

Template.emitter.onDestroyed(function (){
  console.log('ondestroyed was called!');
  localStream = null;
  peer.disconnect();
  peer.destroy();
});

