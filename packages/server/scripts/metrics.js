/* eslint-disable no-console */
const uniq = require('lodash/uniq');
const { Op } = require('sequelize');
const { sub } = require('date-fns');
const { Log, sequelize } = require('../models');

async function getLogs() {
  return await Log.findAll({
    where: {
      type: 'game_started',
      createdAt: {
        [Op.gt]: sub(new Date(), { weeks: 1 })
      }
    }
  });
}

function printLogs(logs) {
  logs.forEach((log) => {
    console.log(log.createdAt, 'Room', log.data.code, 'started game.');
  });
}

function getNumberOfUniqueRooms(logs) {
  return uniq(logs.map((log) => log.data.code)).length;
}

async function printMetrics() {
  const logs = await getLogs();
  printLogs(logs);
  console.log('=====');
  console.log('# of unique rooms:', getNumberOfUniqueRooms(logs));
  sequelize.close();
}

printMetrics();
