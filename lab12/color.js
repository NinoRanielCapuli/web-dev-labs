document.getElementById("changeBtn").addEventListener("click", function() {
  const selectedColor = document.getElementById("colorSelect").value;
  document.body.style.backgroundColor = selectedColor;
});
