let queue = [];
let processing = false;

const MAX_DIYAS = 32;
const DELAY_MS = 1000; // 1 second gap

async function processQueue(DiyaModel) {
  if (processing || queue.length === 0) return;

  processing = true;

  const job = queue.shift();

  try {
    const count = await DiyaModel.countDocuments();

    if (count >= MAX_DIYAS) {
      processing = false;
      return;
    }

    await DiyaModel.create({
      name: job.name,
      diyaIndex: count
    });

  } catch (err) {
    console.error("❌ Queue error:", err);
  }

  setTimeout(() => {
    processing = false;
    processQueue(DiyaModel);
  }, DELAY_MS);
}

module.exports = {
  enqueue(name, DiyaModel) {
    queue.push({ name });
    processQueue(DiyaModel);
  }
};
