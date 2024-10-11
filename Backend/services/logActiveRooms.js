const Bots = require("../models/BotsModel.js");
const { Sequelize } = require("sequelize");

const logActiveRooms = async (io) => {
  try {
    const rooms = io.sockets.adapter.rooms;
    const userIds = [];
    rooms.forEach((sockets, room) => {
      if (sockets.size > 0 && Number.isInteger(parseInt(room))) {
        userIds.push(room);
      }
    });
    console.log("Active userIds in rooms:", userIds);

    if (userIds.length > 0) {
      // Find users with an active room but without any bots where isClose is false
      const usersWithoutOpenBots = await Bots.findAll({
        attributes: ["userId"],
        where: {
          userId: userIds,
        },
        group: ["userId"],
        having: Sequelize.literal(
          'SUM(CASE WHEN "isClose" = false THEN 1 ELSE 0 END) = 0'
        ),
      });

      const userIdsWithoutOpenBots = usersWithoutOpenBots.map(
        (bot) => bot.userId
      );

      // Emit botData event for those users
      userIdsWithoutOpenBots.forEach((userId) => {
        io.to(userId).emit("botData", {});
      });
    }
  } catch (error) {
    console.error("Error in logActiveRooms:", error);
  }
};

module.exports = logActiveRooms;