const fs = require("fs");
const path = require("path");

exports.handler = async function (event) {
  const filePath = path.resolve("./leaderboard.json");
  let data = JSON.parse(fs.readFileSync(filePath));

  const newScore = JSON.parse(event.body);
  data.push(newScore);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Score saved" })
  };
};