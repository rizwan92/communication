import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const UserApi = new Mongo.Collection('user');

Meteor.methods({
  'user.insert'(user) {
  return  UserApi.insert({
      name:user.name,
      email:user.email,
      number:user.number,
      password:user.password,
      city:user.city,
      address:user.address,
      image:user.image,
      type:user.type,
      status:1,
      createdAt: new Date(),
    });
  },
  'user.updatedynamic'(userid,field,value) {
      return UserApi.update(userid,{ $set: { [field]: value } });
     },
  'user.update'(userid,image) {
    UserApi.update(userid, {
        $set: { image },
      });  },
  'user.remove'(taskId) {
    UserApi.remove(taskId);
  },
  'user.check'(email,password) {
    let user = UserApi.findOne({email});
    return user;
  },
  'user.checkemailandpassword'(email,password) {
    let user = UserApi.findOne({email,password});
    return user;
  },
  'user.singleitem'(user) {
    let User = UserApi.findOne({_id:user});
    return User;
  }
});
if (Meteor.isServer) {
  Meteor.publish('user', function userPublication(userid) {
    return UserApi.find({_id:userid});
  });
  Meteor.publish('alluser', function userPublication(userid) {
    return UserApi.find({});
  });
}
