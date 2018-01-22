import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const TicketApi = new Mongo.Collection('ticket');

Meteor.methods({
  'ticket.insert'(ticket) {
  return  TicketApi.insert({
      name:ticket.name,
      description:ticket.description,
      price:ticket.price,
      status:1,
      createdAt: new Date(), // current time
    });
  },
  'ticket.updatedynamic'(userid,field,value) {
      return TicketApi.update(userid,{ $set: { [field]: value } });
     },
  'ticket.update'(userid,image) {
    TicketApi.update(userid, {
        $set: { image },
      });  },
  'ticket.remove'(taskId) {
    check(taskId, String);
    TicketApi.remove(taskId);
  },
  'ticket.check'(email,password) {
    let user = TicketApi.findOne({email,password});
    return user;
  },
  'ticket.all'() {
    const ticket = TicketApi.find().fetch();
    return ticket;
  },
  'ticket.singleitem'(user) {
    let User = TicketApi.findOne({_id:user});
    return User;
  }
});
if (Meteor.isServer) {
  Meteor.publish('ticket', function userPublication(userid) {
    return TicketApi.find({_id:userid});
  });
  Meteor.publish('allticket', function userPublication(userid) {
    return TicketApi.find({});
  });
}
