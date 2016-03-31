Template.vlassroom.onCreated(function () {
  console.log('in vlassroom and id is = ', this.data._id);
  Session.set("classid", this.data._id);
});

Template.vlassroom.onDestroyed(function () {
  Session.set("classid", null);
});


