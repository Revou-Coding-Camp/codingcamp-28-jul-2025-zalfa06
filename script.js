window.onload = function () {
  const nameInput = document.getElementById('name');
  const welcomeText = document.getElementById('welcome-text');

  nameInput?.addEventListener('input', function () {
    if (welcomeText) {
      welcomeText.textContent = `Hi ${nameInput.value}, Welcome To Website`;
    }
  });

  document.getElementById('messageForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const birthdate = document.getElementById('birthdate').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const message = document.getElementById('messageBox').value.trim();
    const output = document.getElementById('output');

    if (!name || !birthdate || !gender || !message) {
      alert("All fields must be filled!");
      return;
    }

    const currentTime = new Date().toString();
    output.innerHTML = `
      <p><strong>Current time:</strong> ${currentTime}</p>
      <p><strong>Nama:</strong> ${name}</p>
      <p><strong>Tanggal Lahir:</strong> ${birthdate}</p>
      <p><strong>Jenis Kelamin:</strong> ${gender}</p>
      <p><strong>Pesan:</strong> ${message}</p>
    `;
  });
};
