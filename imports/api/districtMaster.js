import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const DistrictMasterApi = new Mongo.Collection('districtMaster');

Meteor.methods({
  'districtMaster.insert'(state) {
    return  DistrictMasterApi.insert({
      districtId:state.districtId,
      districtName:state.districtName,
      stateId:state.stateId,
      status:1,
      createdAt: new Date(),
    });
  },
  'districtMaster.remove'(taskId) {
    check(taskId, String);
    DistrictMasterApi.remove(taskId);
  },
  'districtMaster.update'(district) {
    DistrictMasterApi.update(district._id, {
      $set: { districtId: district.districtId , districtName:district.districtName, updatedAt: new Date()},
    });
  },

});

if (Meteor.isServer) {
  Meteor.publish('AllDistrictMaster', function userPublication() {
    return DistrictMasterApi.find();
  });
}
