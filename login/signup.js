// const signupForm = document.getElementById("signupForm");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

// const API_URL = "http://localhost:3000";

// signupForm.addEventListener("submit",  (e) => {
//   e.preventDefault();
//   const name = nameInput.value;
//   const email = emailInput.value;
//   const password = passwordInput.value;
//   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
//   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//   const nameRegex = /^[a-zA-Z\s]{2,50}$/;
//   if (!nameRegex.test(name) || !emailRegex.test(email) || !passwordRegex.test(password)) {
//     e.preventDefault();
//     showToast("Please check your inputs.");
//   }

// });

function showToast(message, type = "error") {
  const toast = document.getElementById("toastPopup");
  const text = document.getElementById("toastMessage");
  const title = document.getElementById("toastTitle");
  const icon = document.getElementById("toastIcon");

  text.textContent = message;

  if (type === "success") {
    toast.classList.add("success");
    title.textContent = "Success";
    icon.className = "fas fa-check-circle";
  } else {
    toast.classList.remove("success");
    title.textContent = "Error";
    icon.className = "fas fa-exclamation-circle";
  }

  toast.style.display = "flex";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}
