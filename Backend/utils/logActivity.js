const Activity = require('../models/Activity');

module.exports = async function logActivity({ userId, type, title, description, icon, iconColor, iconBg, relatedEvent, actionBy, amount }) {
  await Activity.create({
    userId,
    type,
    title,
    description,
    timestamp: new Date(),
    icon,
    iconColor,
    iconBg,
    relatedEvent,
    actionBy,
    amount
  });
};
