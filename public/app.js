async function submitName() {
  const name = document.getElementById("nameInput").value.trim();

  if (!name) {
    alert("Please enter your name");
    return;
  }

  try {
    await fetch("/add-name", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });

    // Go to thank you screen
    window.location.href = "/thankyou.html";

  } catch (err) {
    alert("Something went wrong");
    console.error(err);
  }
}
