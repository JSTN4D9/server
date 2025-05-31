const catchAsync = require('../utils/catchAsync');
const { sendAppointmentEmail } = require('../services/email.service');
const { sendPushNotification, prepareNotificationPayload } = require('../services/push.service');
const { getUserById } = require('../services/user.service');

const sendAppointmentNotificationToUser = catchAsync(async (params) => {
  const { userId, type, appointmentDetails, staffDetails, serviceDetails, notificationType } = params;
  const user = await getUserById(userId);

  if (user.emailNotificationsEnabled) {
    await sendAppointmentEmail(notificationType, user.email, appointmentDetails, staffDetails, serviceDetails);
  }

  if (user.pushNotificationsEnabled && user.pushSubscription) {
    const payload = prepareNotificationPayload(type, appointmentDetails);
    await sendPushNotification(user.pushSubscription, payload);
  }
});

const sendAppointmentNotificationToStaff = catchAsync(async (params) => {
  const { staffId, type, appointmentDetails, serviceDetails, notificationType } = params;
  const staff = await getUserById(staffId);

  if (staff.emailNotificationsEnabled) {
    // Pass the correct name for the staff to the email service
    await sendAppointmentEmail(notificationType, staff.email, appointmentDetails, staff, serviceDetails, true);
  }

  if (staff.pushNotificationsEnabled && staff.pushSubscription) {
    const payload = prepareNotificationPayload(type, appointmentDetails);
    await sendPushNotification(staff.pushSubscription, payload);
  }
});

module.exports = {
  sendAppointmentNotificationToUser,
  sendAppointmentNotificationToStaff,
};
