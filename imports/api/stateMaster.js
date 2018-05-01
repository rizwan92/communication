import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const StateMasterAPi = new Mongo.Collection('stateMaster');

Meteor.methods({
  'stateMaster.insert'(state) {
  return  StateMasterAPi.insert({
      stateId:state.stateId,
      stateName:state.stateName,
      status:1,
      createdAt: new Date(),
    });
  },
  'stateMaster.remove'(taskId) {
    StateMasterAPi.remove(taskId);
  },
  'stateMaster.update'(state) {
    StateMasterAPi.update(state._id, {
      $set: { stateId: state.stateId , stateName:state.stateName, updatedAt: new Date()},
    });
  },
});

if (Meteor.isServer) {
  Meteor.publish('AllStateMaster', function userPublication(userid) {
    return StateMasterAPi.find();
  });
}
