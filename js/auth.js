/* =====================================
   Google Authentication
===================================== */

const provider = new firebase.auth.GoogleAuthProvider();

// Default avatar
const DEFAULT_AVATAR =
  "https://vraajo.github.io/bpsc-portal/images/default-avatar.png";

/* ==========================
   Event Listeners
========================== */


/* ==========================
   Login
========================== */

function login() {

  auth
    .signInWithPopup(provider)

    .then((result) => {

      saveUser(result.user);

      updateUI(result.user);

      // Notify Welcome Module
      if (typeof welcomeAuthenticated === "function") {
        welcomeAuthenticated();
      }

    })

    .catch((error) => {

      console.error(error);

      showToast("Google sign-in failed. Please try again.", "error");

    });

}

/* ==========================
   Logout
========================== */

function logout() {

  auth
    .signOut()

    .then(() => {

      // Exit Guest Mode
      localStorage.removeItem("guestMode");

      guestUI();

      // Show Welcome Screen
      if (typeof welcomeGuest === "function") {
        welcomeGuest();
      }

    })

    .catch((error) => {

      console.error(error);

      showToast("Unable to log out. Please try again.", "error");

    });

}

/* ==========================
   Firebase Session Listener
========================== */

auth.onAuthStateChanged((user) => {

  if (user) {

    saveUser(user);

    updateUI(user);

    // Already logged in
    if (typeof welcomeAuthenticated === "function") {
      welcomeAuthenticated();
    }

  } else {

    guestUI();

    // Not logged in
    if (typeof welcomeGuest === "function") {
      welcomeGuest();
    }

  }

});

/* ==========================
   Logged In UI
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

  

  // Update Account Profile page
  if (typeof setLoggedInUser === "function") {
    setLoggedInUser(user);
  }

}

/* ==========================
   Guest UI
========================== */

function guestUI() {

  document.getElementById("userName").textContent = "Guest User";
  document.getElementById("userEmail").textContent = "Please login";

  document.getElementById("profileName").textContent = "Guest User";
  document.getElementById("profileMail").textContent = "Not Logged In";

  document.getElementById("profileUID").textContent = "--";

  document.getElementById("userPhoto").src = DEFAULT_AVATAR;
  document.getElementById("profilePhoto").src = DEFAULT_AVATAR;

  

  // Update Account Profile page
  if (typeof setGuestMode === "function") {
    setGuestMode();
  }

}

/* ==========================
   Save User
========================== */

function saveUser(user) {

  db.collection("users")

    .doc(user.uid)

    .set({

      uid: user.uid,

      name: user.displayName,

      email: user.email,

      photo: user.photoURL,

      lastLogin: firebase.firestore.FieldValue.serverTimestamp()

    }, {

      merge: true

    })

    .catch((error) => {

      console.error("Firestore Error:", error);

    });

}
