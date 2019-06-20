var arr = [];
var checkId = firebase.database().ref("users");
var MAX_PROGRESS_TIME = 45;
var ANTI_ZERO = 44;
var BASE_SCORE = 20;
var WRONG_SCORE = 5;
var TOTAL_QUIZ = 20;

checkId.once("value")
.then(function(snapshot){
	snapshot.forEach(function(childSnapshot){
		var id = childSnapshot.key;
		arr.push(id);
	})
});

function showTotalScore(){
	var finalNickname = document.getElementById("inputNickname").value.toLowerCase();
	var checkNick = firebase.database().ref("users");

	loadsc();

	checkNick.once("value")
	.then(function(snapshot){
		if(snapshot.hasChild(finalNickname)){
			document.getElementById("bodycontainer1").style.display = "none";
			document.getElementById("bodycontainer3").style.display = "block";
			document.getElementById("bodycontainer2").style.display = "none";
			document.documentElement.scrollTop = 0;

			window.scrollTo(0, document.body.scrollHeight);

			firebase.database()
			.ref(`users/${finalNickname}/`)
			.once("value", snapshot => {

				var quiz = {};
				var total_point = 0;
				var nickname;
				
				for (let index = 1; index <= TOTAL_QUIZ; index++) {
					quiz[index] = snapshot.child("quiz"+index).val();
				}

				for (let index = 1; index <= TOTAL_QUIZ; index++) {
					if(quiz[index]=='5')
						document.getElementById("p"+index).innerHTML = quiz[index]+" <b style='color:red'>(X)</b>";
					else 
						document.getElementById("p"+index).innerHTML = quiz[index];
					total_point += quiz[index];
				}

				nickname = snapshot.child("nickname").val();
				document.getElementById("nickname").innerHTML = nickname;
				document.getElementById("score").innerHTML = total_point;
			});
		}
		else{
			window.alert("Nickname is not available");
			removeLoad();
		}
	});	
}

function submitClick(){
	var finalNickname = document.getElementById("inputNickname").value.toLowerCase();
	var checkNick = firebase.database().ref("users");
	document.documentElement.scrollTop = 0;

	window.scrollTo(0, document.body.scrollHeight);
	
	loadsc();
	checkNick.once("value")
	.then(function(snapshot){
		if(snapshot.hasChild(finalNickname)){
			firebase.database().ref(`users/${finalNickname}/`).once("value", snapshot => {
				if (snapshot.child("quiz16").val() != 0 || snapshot.child("quiz17").val() != 0){
					window.alert("Cannot enter the game");
					removeLoad();
				 }
				 else{
					trueCond();
				 }
			 });
		}
		else{
			window.alert("Id Not Found");
			removeLoad();
		}
	});	
}

function loadsc(){
	document.getElementById("lds-ring").style.visibility = "visible";
}

function removeLoad(){
	document.getElementById("lds-ring").style.visibility = "hidden";
}

function trueCond(){
	document.getElementById("bodycontainer1").style.display = "none";
	document.getElementById("bodycontainer3").style.display = "none";
	document.getElementById("bodycontainer2").style.display = "block";

	var timeleft = MAX_PROGRESS_TIME;
	downloadTimer = setInterval(function(){
		document.getElementById("progressBar").value = MAX_PROGRESS_TIME - timeleft;
		timeleft -= 1;
		if(timeleft == -2){
			submitData();
			clearInterval(downloadTimer);
		}
	}, 1000);
}

function clicked1(){
	document.getElementById("quest1").setAttribute("value",document.getElementById("progressBar").value);
}

function clicked2(){
	document.getElementById("quest2").setAttribute("value",document.getElementById("progressBar").value);
}

function clicked3(){
	document.getElementById("quest3").setAttribute("value",document.getElementById("progressBar").value);
}

function clicked4(){
	document.getElementById("quest4").setAttribute("value",document.getElementById("progressBar").value);
}

function clicked5(){
	document.getElementById("quest5").setAttribute("value",document.getElementById("progressBar").value);
}


function getValue(){
	var ans1 = 0, ans2 = 0, ans3=0, ans4=0, ans5 = 0;
	var prog1 = parseInt(document.getElementById("quest1").value);
	var prog2 = parseInt(document.getElementById("quest2").value);
	var prog3 = parseInt(document.getElementById("quest3").value);
	var prog4 = parseInt(document.getElementById("quest4").value);
	var prog5 = parseInt(document.getElementById("quest5").value);

	if(document.getElementById('ans-3').checked){
		if(isNaN(prog1)) prog1 = 1;
		else if(prog1 > ANTI_ZERO) prog1 = ANTI_ZERO;
		ans1 += BASE_SCORE * (MAX_PROGRESS_TIME - prog1);
	}
	else ans1 += WRONG_SCORE;

	if(document.getElementById('ans-6').checked){
		if(isNaN(prog2)) prog2 = 1;
		else if(prog2 > ANTI_ZERO) prog2 = ANTI_ZERO;
		ans2 += BASE_SCORE * (MAX_PROGRESS_TIME - prog2);
	}

	else ans2 += WRONG_SCORE;

	if(document.getElementById('ans-10').checked){
		if(isNaN(prog3)) prog3 = 1;
		else if(prog3 > ANTI_ZERO) prog3 = ANTI_ZERO;
		ans3 += BASE_SCORE * (MAX_PROGRESS_TIME - prog3);
	}
	else ans3 += WRONG_SCORE;

	if(document.getElementById('ans-16').checked){
		if(isNaN(prog4)) prog4 = 1;
		else if(prog4 > ANTI_ZERO) prog4 = ANTI_ZERO;
		ans4 += BASE_SCORE * (MAX_PROGRESS_TIME - prog4);
	}
	else ans4 += WRONG_SCORE;

	
	if(document.getElementById('ans-18').checked){
		if(isNaN(prog5)) prog5 = 1;
		else if(prog5 > ANTI_ZERO) prog5 = ANTI_ZERO;
		ans5 += BASE_SCORE * (MAX_PROGRESS_TIME - prog5);
	}
	else ans5 += WRONG_SCORE;
	
	updateData(ans1,ans2,ans3,ans4,ans5);
}

function updateData(q1, q2, q3, q4, q5) {
	var finalNickname = document.getElementById("inputNickname").value.toLowerCase();
	const fb = firebase.database().ref();
	var data = {
		quiz16:q1,
		quiz17:q2,
		quiz18:q3,
		quiz19:q4,
		quiz20:q5
	};
	fb.child('users/'+finalNickname).update(data);
}

function submitData(){
	var finalNickname = document.getElementById("inputNickname").value.toLowerCase();
	getValue();
	document.getElementById("bodycontainer1").style.display = "none";
	document.getElementById("bodycontainer3").style.display = "block";
	document.getElementById("bodycontainer2").style.display = "none";
	document.documentElement.scrollTop = 0;

	firebase.database()
	.ref(`users/${finalNickname}/`)
	.once("value", snapshot => {

		var quiz = {};
		var total_point = 0;
		var nickname = snapshot.child("nickname").val();

		for (let index = 1; index <= 20; index++) {
			quiz[index] = snapshot.child("quiz"+index).val();
		}

		for (let index = 1; index <= 20; index++) {
			if(quiz[index]=='5')
				document.getElementById("p"+index).innerHTML = quiz[index]+" <b style='color:red'>(X)</b>";
			else 
				document.getElementById("p"+index).innerHTML = quiz[index];
			total_point += quiz[index];
		}

		document.getElementById("nickname").innerHTML = nickname;
		document.getElementById("score").innerHTML = total_point;
		totalscore(total_point, nickname);
	});
}

function totalscore(score, nick) {
	var finalNickname = document.getElementById("inputNickname").value.toLowerCase();
	const fb = firebase.database().ref();
	var data = {total_score:score};
	pushTotalScore(score, nick);
	fb.child('users/'+finalNickname).update(data);
}

function pushTotalScore(score, nick){
	var finalNickname = document.getElementById("inputNickname").value.toLowerCase();
	var firebaseRef = firebase.database().ref('leaderboard/'+finalNickname);
	firebaseRef.set({
		total_score : score,
		nickname : nick
	});
}