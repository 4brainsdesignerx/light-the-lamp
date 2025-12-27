// async function submitName() {
//   const name = document.getElementById("nameInput").value.trim();

//   if (!name) {
//     alert("Please enter your name");
//     return;
//   }

//   try {
//     await fetch("/add-name", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name })
//     });

//     // Go to thank you screen
//     window.location.href = "/thankyou.html";

//   } catch (err) {
//     alert("Something went wrong");
//     console.error(err);
//   }
// }


const API_URL = "/add-name"; // same backend

async function submitName() {
  const input = document.getElementById("nameInput");
  const button = document.getElementById("submitBtn");
  const loader = document.getElementById("loader");

  const name = input.value.trim();
  if (!name) {
    alert("Please enter your name");
    return;
  }

  // 🔒 Prevent multiple submits
  button.disabled = true;
  loader.classList.remove("hidden");

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });

    if (!res.ok) {
      throw new Error("Server error");
    }

    // Success → go to thank you
    window.location.href = "/thankyou.html";

  } catch (err) {
    alert("Something went wrong. Please try again.");

    // Re-enable if failed
    button.disabled = false;
    loader.classList.add("hidden");
  }
}
