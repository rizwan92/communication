import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const BookingApi = new Mongo.Collection('booking');

Meteor.methods({
  'booking.insert'(booking) {
  return  BookingApi.insert({
      name:booking.name,
      number:booking.number,
      eventid:booking.eventid,
      ticketid:booking.ticketid,
      paymenttype:booking.paymenttype,
      paymentprice:booking.paymentprice,
      bookedby:booking.bookedby,
      bookedbyid:booking.bookedbyid,
      paymentstatus:booking.paymentstatus,
      status:1,
      createdAt: new Date(),
    });
  },
  'booking.updatedynamic'(userid,field,value) {
      return BookingApi.update(userid,{ $set: { [field]: value } });
     },
  'booking.update'(userid,image) {
    BookingApi.update(userid, {
        $set: { image },
      });  },
  'booking.remove'(taskId) {
    check(taskId, String);
    BookingApi.remove(taskId);
  },
  'booking.check'(email,password) {
    let user = BookingApi.findOne({email,password});
    return user;
  },
  'booking.singleitem'(user) {
    let User = BookingApi.findOne({_id:user});
    return User;
  }
});
if (Meteor.isServer) {
  Meteor.publish('booking', function userPublication(userid) {
    return BookingApi.find({_id:userid});
  });
  Meteor.publish('allbooking', function userPublication(userid) {
    return BookingApi.find({});
  });
}
