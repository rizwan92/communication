import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const EventApi = new Mongo.Collection('event');

Meteor.methods({
  'event.insert'(event) {
  return  EventApi.insert({
      title:event.title,
      subtitle:event.subtitle,
      description:event.description,
      venue:event.venue,
      date:event.date,
      image:event.image,
      selectedticket:event.selectedticket,
      eventstate:event.eventstate,
      status:1,
      createdAt: new Date(), // current time
    });
  },
  'event.updatedynamic'(userid,field,value) {
      return EventApi.update(userid,{ $set: { [field]: value } });
     },
  'event.update'(userid,image) {
    EventApi.update(userid, {
        $set: { image },
      });
    },
    'event.all'() {
      const event = EventApi.find().fetch();
      return event;
      },
  'event.remove'(taskId) {
    check(taskId, String);
    EventApi.remove(taskId);
  },
  'myevent.get'(eventid) {
    let user = EventApi.findOne({_id:eventid});
    return user;
  },
  'event.singleitem'(user) {
    let User = EventApi.findOne({_id:user});
    return User;
  }
});
if (Meteor.isServer) {
  Meteor.publish('event', function userPublication(userid) {
    return EventApi.find({_id:userid});
  });
  Meteor.publish('allevent', function userPublication(userid) {
    return EventApi.find({});
  });
}
