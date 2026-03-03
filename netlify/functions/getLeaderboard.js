const fs = require("fs");
const path = require("path");

exports.handler = async function () {
  const filePath = path.resolve("./leaderboard.json");
  const data = fs.readFileSync(filePath);
  return {
    statusCode: 200,
    body: data.toString()
  };
};