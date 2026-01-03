// VANILLA JS TEST
console.log("VANILLA BOOT START");

try {
  // Update Bundle Status Overlay
  const el = document.getElementById('bundle-status');
  if (el) {
    el.innerText = "VANILLA LOADED";
    el.style.color = "magenta";
  }

  // Draw directly to body
  const div = document.createElement('div');
  div.style.padding = "20px";
  div.style.background = "white";
  div.style.color = "black";
  div.style.fontSize = "24px";
  div.innerText = "MAIN SCRIPT RUNNING";
  document.body.appendChild(div);

} catch (e) {
  alert("ERROR: " + e.message);
}
