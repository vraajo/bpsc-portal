/* =====================================
   Google Authentication
===================================== */

const provider = new firebase.auth.GoogleAuthProvider();

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

if (loginBtn) {

loginBtn.addEventListener("click", login);

}

if (logoutBtn) {

logoutBtn.addEventListener("click", logout);

}

function login(){

auth.signInWithPopup(provider)

.then((result)=>{

saveUser(result.user);

})

.catch((error)=>{

alert(error.message);

});

}

function logout(){

auth.signOut();

}

auth.onAuthStateChanged((user)=>{

if(user){

updateUI(user);

saveUser(user);

}else{

guestUI();

}

});

function updateUI(user){

const name=user.displayName||"Guest";

const email=user.email||"";

const photo=user.photoURL||"";

document.getElementById("userName").textContent=name;

document.getElementById("userEmail").textContent=email;

document.getElementById("profileName").textContent=name;

document.getElementById("profileMail").textContent=email;

document.getElementById("profileUID").textContent=user.uid;

if(photo){

document.getElementById("userPhoto").src=photo;

document.getElementById("profilePhoto").src=photo;

}

loginBtn.style.display="none";

logoutBtn.style.display="inline-block";

}

function guestUI(){

loginBtn.style.display="inline-block";

logoutBtn.style.display="none";

}

function saveUser(user){

db.collection("users")

.doc(user.uid)

.set({

uid:user.uid,

name:user.displayName,

email:user.email,

photo:user.photoURL,

lastLogin:firebase.firestore.FieldValue.serverTimestamp()

},{merge:true});

}
