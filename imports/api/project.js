import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const ProjectApi = new Mongo.Collection('project');

Meteor.methods({
  'project.insert'(project) {
  return  ProjectApi.insert({
      name:project.name,
      districtid:project.districtid,
      districtname:project.districtname,
      tspareaid:project.tspareaid,
      tspareaname:project.tspareaname,
      departmentid:project.departmentid,
      departmentname:project.departmentname,
      schemeid:project.schemeid,
      schemename:project.schemename,
      yoa:project.yoa,
      tpe:project.tpe,
      aar:project.aar,
      atbr:project.atbr,
      remarks:project.remarks,
      status:1,
      createdAt: new Date(),
    });
  },
  'project.updatedynamic'(userid,field,value) {
      return ProjectApi.update(userid,{ $set: { [field]: value } });
     },
  'project.update'(userid,image) {
    ProjectApi.update(userid, {
        $set: { image },
      });  },
  'project.remove'(taskId) {
    check(taskId, String);
    ProjectApi.remove(taskId);
  },
  'project.check'(email,password) {
    let user = ProjectApi.findOne({email,password});
    return user;
  },
  'project.singleitem'(user) {
    let User = ProjectApi.findOne({_id:user});
    return User;
  }
});
if (Meteor.isServer) {
  Meteor.publish('project', function userPublication(userid) {
    return ProjectApi.find({_id:userid});
  });
  Meteor.publish('allproject', function userPublication(userid) {
    return ProjectApi.find({});
  });
}
