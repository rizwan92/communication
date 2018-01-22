import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const OrderApi = new Mongo.Collection('order');

Meteor.methods({
  'order.insert'(order) {
  return  OrderApi.insert({
      name:order.name,
      email:order.email,
      number:order.number,
      eventid:order.eventid,
      tickets:order.tickets,
      paymenttype:order.paymenttype,
      paymentprice:order.paymentprice,
      payment_id:order.payment_id,
      bookedby:order.bookedby,
      bookedbyid:order.bookedbyid,
      paymentstatus:order.paymentstatus,
      status:1,
      createdAt: new Date(),
    });
  },
  'order.updatedynamic'(userid,field,value) {
      return OrderApi.update(userid,{ $set: { [field]: value } });
     },
  'order.remove'(taskId) {
    check(taskId, String);
    OrderApi.remove(taskId);
  },
  'order.bookedbyid'(bookedbyid) {
    // process.on('unhandledRejection', up => { throw up })
    const order = OrderApi.find({ bookedbyid: bookedbyid }).fetch();
    return order;
  },
});
if (Meteor.isServer) {
  Meteor.publish('order', function userPublication(userid) {
    return OrderApi.find({_id:userid});
  });
  Meteor.publish('allorder', function userPublication(userid) {
    return OrderApi.find({});
  });
}
