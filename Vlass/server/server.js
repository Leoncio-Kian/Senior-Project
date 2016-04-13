// Override Meteor._debug to filter for custom msgs
import '../imports/api/users/users.js';
import '../imports/api/users/server/publications.js';

import easyrtc from 'easyrtc';

import '../imports/startup/server/index.js';

import '../imports/api/classrooms/server/publications.js';
import '../imports/api/classrooms/methods.js';

import '../imports/api/messages/messages.js';

import '../imports/api/messages/server/publications.js';

console.log(easyrtc);

Meteor._debug = (function (super_meteor_debug) {
  return function (error, info) {
    if (!(info && _.has(info, 'msg')))
      super_meteor_debug(error, info);
  };
})(Meteor._debug);