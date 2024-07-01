console.log("Initialising Firebase");
fb_initialise();
console.log("Firebase initialise finished");
/**************************************************************/
//Login and log user data
/**************************************************************/
var loggedin = false;
var uid;
var email;
var user;
var username;
var PFP;
var score;
//AUTH
function fb_auth(_DOTHIS) {
	console.log('logging in');
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			console.log("user:" + user.uid + "\nis logged in");
			console.log('user logged in');
			username = user.displayName;
			uid = user.uid;
			email = user.email;
			PFP = user.photoURL;
			console.log(uid);
			_DOTHIS(user);
		} else {
			console.log('FAIL to login')
			// Using a popup.
			var provider = new firebase.auth.GoogleAuthProvider();
			provider.addScope('profile');
			provider.addScope('email');
			firebase.auth().signInWithPopup(provider).then(function(result) {
				// This gives you a Google Access Token.
				var token = result.credential.accessToken;
				// The signed-in user info.
				user = result.user;
				console.log(user);
				console.log(token);
			});
		}
	});
}
function checkIfInDataBase() {
	fb_auth(isInDatabaseOrNot);
}
function isInDatabaseOrNot() {
	console.log(firebase.database().ref('users/' + uid).once('value'));
	firebase.database().ref('users/' + uid).once('value', checkUserMade);
}
function checkUserMade(_snapshot) {
	console.log(_snapshot.val());
	if (_snapshot.val() == null) {
		console.log(_snapshot.val());
		console.log("go to rego page");
		window.location = "/login/createAcc.html"
	} else {
		console.log("in database");
		loggedin = true;
	}
}
//log user in when games loads
function fb_saveScore(_score) {
	console.log("Logging score");
	firebase.database().ref('users/' + uid + '/ULscore').once('value', checkIfNewHighScore);
}
function checkIfNewHighScore(snapshot) {
	console.log(snapshot);
	if (snapshot.val() < score) {
		firebase.database().ref('users/' + uid + '/ULscore').set(score);
		console.log(username);
		firebase.database().ref('UndeadUnleashedHS/' + uid +'/' + username).set(score);
	}
}
//add user to the database
function createAcc() {
	console.log('logging in');
	fb_auth(writeUserToDatabase);
}
function writeUserToDatabase() {
	console.log('logging data in firebase');
	firebase.database().ref('users/' + uid).set({
		UID: uid,
		email: email,
		googleName: username,
		PFP: PFP,
		name: HTML_name.value,
		IGN: HTML_ign.value,
	}).then(() => {
		window.location = "../index.html"
	});
}