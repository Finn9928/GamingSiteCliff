console.log("Initialising Firebase");
fb_initialise();
console.log("Firebase initialise finished");
/**************************************************************/
//Login and log user data
/**************************************************************/
var uid;
var email;
var user;
var username;
var PFP;
//AUTH
function fb_auth(){
	console.log('logging in');
	firebase.auth().onAuthStateChanged((user) => {
		if(user){
			console.log("user:"+user.uid+"\nis logged in");
		}else{
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
	fb_auth();
	setTimeout(() => {
		console.log(firebase.database().ref('users/'+uid).once('value', checkUserMade));
		if (firebase.database().ref('users/'+uid).once('value', checkUserMade)) {
			console.log("go to pego page");
			window.location = "/login/createAcc.html"
		}
	}, 6000);
}
function checkUserMade(_snapshot) {
	if (_snapshot.val() == null) {
		return(true);
	}
}
//log user in when games loads
function fb_saveScore(_score) {
	console.log("Logging score");
	firebase.database().ref('users/'+uid+'/score').once('value', checkIfNewHighScore);
}
function checkIfNewHighScore(snapshot) {
	if (snapshot.val() < score) {
		firebase.database().ref('users/'+uid+'/score').set(score);
	}
}
