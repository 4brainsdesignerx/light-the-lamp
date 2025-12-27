const DELAY_MS = 2000; // 2 seconds
let filling = false;

async function fillRemaining(Diya, MAX_DIYAS, dummyNames) {
  if (filling) return;

  filling = true;

  try {
    const currentCount = await Diya.countDocuments();
    const remaining = MAX_DIYAS - currentCount;

    if (remaining <= 0) {
      filling = false;
      return;
    }

    for (let i = 0; i < remaining; i++) {
      const index = await Diya.countDocuments();

      if (index >= MAX_DIYAS) break;

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
