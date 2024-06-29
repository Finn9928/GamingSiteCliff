fb_readTopHighScores();
function fb_readTopHighScores() {
	firebase.database().ref('UndeadUnleashedHS').orderByValue().limitToFirst(10).once('value', readHighScores);
}
function readHighScores(snapshot) {
	var highScoresTable = document.getElementById('UndeadUnleashedHighScoreTable').getElementsByTagName('tbody')[0];
	// Clear existing content
	highScoresTable.innerHTML = '';

	var rank = 1;
	snapshot.forEach(function(_child) {
		var username = _child.key;
		var score = Math.abs(_child.val());

		var row = highScoresTable.insertRow();
		var cellRank = row.insertCell(0);
		var cellUsername = row.insertCell(1);
		var cellScore = row.insertCell(2);

		cellRank.textContent = rank;
		cellUsername.textContent = username;
		cellScore.textContent = score;

		rank++;
	});
	snapshot.forEach(showOneScore);
}
function showOneScore(child) {
	console.log("Name: " + child.key + '\n' + "Score: " + Math.abs(child.val()));
}