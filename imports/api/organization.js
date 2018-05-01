import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const OrganizationApi = new Mongo.Collection('organization');

Meteor.methods({
  'organizations.insert'(org) {
  return  OrganizationApi.insert({
      orgName:org.orgName,
      stateId:org.stateId,
      status:1,
      createdAt: new Date(), // current time
    });
  },
  'organization.remove'(taskId) {
    check(taskId, String);
    OrganizationApi.remove(taskId);
  },
});

if (Meteor.isServer) {
  Meteor.publish('AllOrganization', function userPublication(userid) {
    return OrganizationApi.find();
  });
}
