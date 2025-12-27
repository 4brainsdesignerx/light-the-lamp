// const Counter = require("../models/Counter");

// async function getNextDiyaIndex() {
//   const counter = await Counter.findOneAndUpdate(
//     { name: "diyaIndex" },
//     { $inc: { value: 1 } },
//     { new: true, upsert: true }
//   );

//   return counter.value - 1; // start from 0
// }

// module.exports = getNextDiyaIndex;


const Counter = require("../models/Counter");

async function getNextDiyaIndex() {
  const counter = await Counter.findOneAndUpdate(
    { name: "diyaIndex" },
    { $inc: { value: 1 } },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true
    }
  );

  return counter.value - 1;
}

module.exports = getNextDiyaIndex;
