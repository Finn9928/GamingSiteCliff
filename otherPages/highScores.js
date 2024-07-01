fb_readTopHighScores();
function fb_readTopHighScores() {
	firebase.database().ref('UndeadUnleashedHS').once('value', readHighScores);
}
function readHighScores(snapshot) {
	var highScores = [];
	console.log(highScores);

	// put all score into an array
	snapshot.forEach(function(parentSnapshot) {
		parentSnapshot.forEach(function(childSnapshot) {
			highScores.push({
				username: childSnapshot.key,
				score: childSnapshot.val()
			});
		});
	});
	console.log(highScores);

	// Sort high scores in descending order
	highScores.sort(function(a, b) {
		return b.score - a.score;
	});
	console.log(highScores);

	// Limit to top 10
	highScores = highScores.slice(0, 10);
	console.log(highScores);

	var highScoresTable = document.getElementById('UndeadUnleashedHighScoreTable').getElementsByTagName('tbody')[0];
	// Clear existing content
	highScoresTable.innerHTML = '';

	highScores.forEach(function(entry, index) {
		var row = highScoresTable.insertRow();
		var cellRank = row.insertCell(0);
		var cellUsername = row.insertCell(1);
		var cellScore = row.insertCell(2);

		cellRank.textContent = index + 1;
		cellUsername.textContent = entry.username;
		cellScore.textContent = entry.score;
	});
	snapshot.forEach(showOneScore);
}
function showOneScore(child) {
	console.log("Name: " + child.key + '\n' + "Score: " + Math.abs(child.val()));
}