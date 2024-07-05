initializeHighScores();
function initializeHighScores() {
	fb_readTopHighScores('UndeadUnleashedHS', 'UndeadUnleashedHighScoreTable');
	fb_readTopHighScores('DinoCloneHS', 'DinocloneHighScoreTable');
}

function fb_readTopHighScores(path, tableId) {
	firebase.database().ref(path).once('value', function(snapshot) {
		readHighScores(snapshot, tableId);
	});
}
function readHighScores(snapshot, tableId) {
	var highScores = [];
	console.log(highScores, tableId);

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

	var highScoresTable = document.getElementById(tableId).getElementsByTagName('tbody')[0];
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