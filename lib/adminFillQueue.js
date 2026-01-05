// const DELAY_MS = 2000; // 2 seconds
// let filling = false;

// async function fillRemaining(Diya, MAX_DIYAS, dummyNames) {
//   if (filling) return;

//   filling = true;

//   try {
//     const currentCount = await Diya.countDocuments();
//     const remaining = MAX_DIYAS - currentCount;

//     if (remaining <= 0) {
//       filling = false;
//       return;
//     }

//     for (let i = 0; i < remaining; i++) {
//       const index = await Diya.countDocuments();

//       if (index >= MAX_DIYAS) break;

//       await Diya.create({
//         name: dummyNames[index % dummyNames.length],
//         diyaIndex: index
//       });

//       await new Promise(r => setTimeout(r, DELAY_MS));
//     }
//   } catch (err) {
//     console.error("❌ Admin fill error:", err);
//   }

//   filling = false;
// }

// module.exports = { fillRemaining };



const DELAY_MS = 1000; // 2 seconds
const WALL_LIMIT = 50; // 🔥 IMPORTANT
let filling = false;

async function fillRemaining(Diya, dummyNames) {
  if (filling) return;

  filling = true;

  try {
    // Count ONLY once
    const currentCount = await Diya.countDocuments();

    // We only care about filling up to 50
    const remaining = Math.max(0, WALL_LIMIT - currentCount);

    console.log("DB count:", currentCount, "Will fill:", remaining);

    if (remaining === 0) {
      filling = false;
      return;
    }

    for (let i = 0; i < remaining; i++) {
      const index = currentCount + i;

      await Diya.create({
        name: dummyNames[index % dummyNames.length],
        diyaIndex: index
      });

      await new Promise(r => setTimeout(r, DELAY_MS));
    }

  } catch (err) {
    console.error("❌ Admin fill error:", err);
  }

  filling = false;
}

module.exports = { fillRemaining };
