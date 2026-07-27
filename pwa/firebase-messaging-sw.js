importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

/*
 Replace the values below with the SAME Firebase configuration
 that you already use in firebase.js on your Blogger website.
*/

firebase.initializeApp({
  apiKey: "AIzaSyCJ5o2ThN05UrTE3Uw-BM6ea03fH7OnCaE",
  authDomain: "bpsc-portal-a9b2f.firebaseapp.com",
  projectId: "bpsc-portal-a9b2f",
  storageBucket: "bpsc-portal-a9b2f.firebasestorage.app",
  messagingSenderId: "480197369468",
  appId: "1:480197369468:web:f91a7200ccbed5ec2a33f9",
  measurementId: "G-217VW2E9VZ"
 
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {

  console.log("Background Message:", payload);

  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
      icon: "https://raw.githubusercontent.com/vraajo/bpsc-portal/main/images/icon-192.png"
    }
  );

});
