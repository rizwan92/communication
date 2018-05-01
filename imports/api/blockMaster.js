import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const BlockMasterApi = new Mongo.Collection('blockMaster');

Meteor.methods({
  'blockMaster.insert'(block) {
    return  BlockMasterApi.insert({
      blockId:block.blockId,
      blockName:block.blockName,
      districtId:block.districtId,
      status:1,
      createdAt: new Date(),
    });
  },
  'blockMaster.remove'(taskId) {
    check(taskId, String);
    BlockMasterApi.remove(taskId);
  },
  'blockMaster.update'(block) {
    BlockMasterApi.update(block._id, {
      $set: { blockId: block.blockId , blockName:block.blockName, updatedAt: new Date()},
    });
  },

});

if (Meteor.isServer) {
  Meteor.publish('AllBlockMaster', function userPublication() {
    return BlockMasterApi.find();
  });
}
