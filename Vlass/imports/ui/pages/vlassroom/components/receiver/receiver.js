/**
 * Created by leon on 4/14/16.
 */
Template.receiver.onCreated(function () {
  peer.on('open', function () {
    $('#myPeerId').text(peer.id);
    if(peer.id) {
      Streamy.rooms(Session.get("socketid")).emit('connectToRoom', {peerid: peer.id});
    }
  });
  if(Session.get("audio") === "MESH"){
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
      function (error) { console.log(error); });
  }
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

});

Template.receiver.onDestroyed(function () {
  peer.disconnect();
  peer.destroy();
})