var database;

/**************************************************************/
// fb_initialise()
// Initialize firebase, connect to the Firebase project.
//
/**************************************************************/
function fb_initialise() {  
const firebaseConfig = {
	apiKey: "AIzaSyB4JiiAEOenqUIPicT88_hWI1hENClhRtc",
	authDomain: "cliff-harfield-12comp.firebaseapp.com",
	databaseURL: "https://cliff-harfield-12comp-default-rtdb.firebaseio.com",
	projectId: "cliff-harfield-12comp",
	storageBucket: "cliff-harfield-12comp.appspot.com",
	messagingSenderId: "88385343828",
	appId: "1:88385343828:web:a096abdea61f74dda8b8c1"
};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	console.log(window.location.pathname);
}