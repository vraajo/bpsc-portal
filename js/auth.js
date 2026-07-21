/* =====================================
   Google Authentication
===================================== */

const provider = new firebase.auth.GoogleAuthProvider();

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Default avatar
const DEFAULT_AVATAR =
  "https://vraajo.github.io/bpsc-portal/images/default-avatar.png";

// Event Listeners
if (loginBtn) {
  loginBtn.addEventListener("click", login);
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}

/* ==========================
   Login
========================== */

function login() {
  auth
    .signInWithPopup(provider)
    .then((result) => {
      saveUser(result.user);
      updateUI(result.user);
    })
    .catch((error) => {
      console.error(error);
      alert(error.message);
    });
}

/* ==========================
   Logout
========================== */

function logout() {
  auth
    .signOut()
    .then(() => {
      guestUI();
    })
    .catch((error) => {
      console.error(error);
      alert(error.message);
    });
}

/* ==========================
   Session Listener
========================== */

auth.onAuthStateChanged((user) => {
  if (user) {
    updateUI(user);
    saveUser(user);
  } else {
    guestUI();
  }
});

/* ==========================
   Update Logged-in UI
========================== */

function updateUI(user) {
  const name = user.displayName || "Guest User";
  const email = user.email || "";
  const photo = user.photoURL || DEFAULT_AVATAR;

  document.getElementById("userName").textContent = name;
  document.getElementById("userEmail").textContent = email;

  document.getElementById("profileName").textContent = name;
  document.getElementById("profileMail").textContent = email;

  document.getElementById("profileUID").textContent = user.uid;

  document.getElementById("userPhoto").src = photo;
  document.getElementById("profilePhoto").src = photo;

  if (loginBtn) loginBtn.style.display = "none";
  if (logoutBtn) logoutBtn.style.display = "inline-block";
}

/* ==========================
   Reset Guest UI
========================== */

function guestUI() {
  document.getElementById("userName").textContent = "Guest User";
  document.getElementById("userEmail").textContent = "Please login";

  document.getElementById("profileName").textContent = "Guest User";
  document.getElementById("profileMail").textContent = "Not Logged In";

  document.getElementById("profileUID").textContent = "--";

  document.getElementById("userPhoto").src = DEFAULT_AVATAR;
  document.getElementById("profilePhoto").src = DEFAULT_AVATAR;

  if (loginBtn) loginBtn.style.display = "inline-block";
  if (logoutBtn) logoutBtn.style.display = "none";
}

/* ==========================
   Save User to Firestore
========================== */

function saveUser(user) {
  db.collection("users")
    .doc(user.uid)
    .set(
      {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      },
      {
        merge: true
      }
    )
    .catch((error) => {
      console.error("Firestore Error:", error);
    });
}
