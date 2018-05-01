import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const VSMasterApi = new Mongo.Collection('vsMaster');

Meteor.methods({
  'vsMaster.insert'(vs) {
    return  VSMasterApi.insert({
      vsId:vs.vsId,
      vsName:vs.vsName,
      districtId:vs.districtId,
      status:1,
      createdAt: new Date(),
    });
  },
  'vsMaster.remove'(taskId) {
    check(taskId, String);
    VSMasterApi.remove(taskId);
  },
  'vsMaster.update'(vs) {
    VSMasterApi.update(vs._id, {
      $set: { vsId: vs.vsId , vsName:vs.vsName, updatedAt: new Date()},
    });
  },

});

if (Meteor.isServer) {
  Meteor.publish('AllVSMaster', function userPublication() {
    return VSMasterApi.find();
  });
}
