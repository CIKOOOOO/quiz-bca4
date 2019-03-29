var downloadTimer;

function showTotalScore(){
	var firebaseRef = firebase.database();
	var inputNickname = document.getElementById("inputNickname").value;
	var checkNick = firebase.database().ref("users");

	loadsc();

	checkNick.once("value")
	.then(function(snapshot){
		if(snapshot.hasChild(inputNickname)){
			document.getElementById("bodycontainer1").style.display = "none";
			document.getElementById("bodycontainer3").style.display = "block";
			document.getElementById("bodycontainer2").style.display = "none";
			document.getElementById("nickname").innerHTML = document.getElementById("inputNickname").value;

			firebase.database()
			.ref(`users/${document.getElementById("inputNickname").value}/`)
			.once("value", snapshot => {

				var quiz = {};
				var total_point = 0;

				for (let index = 1; index <= 20; index++) {
					quiz[index] = snapshot.child("quiz"+index).val();
				}

				for (let index = 1; index <= 20; index++) {
					document.getElementById("p"+index).innerHTML = quiz[index];
					total_point += quiz[index];
				}

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
	var firebaseRef = firebase.database();
	var inputNickname = document.getElementById("inputNickname").value;
	var checkNick = firebase.database().ref("users");

	loadsc();

	checkNick.once("value")
	.then(function(snapshot){
		if(snapshot.hasChild(inputNickname)){
			firebase.database().ref(`users/${inputNickname}/`).once("value", snapshot => {
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
			firebaseRef.ref('users/'+inputNickname).set({
				quiz1 : 0,
				quiz2 : 0,
				quiz3 : 0,
				quiz4 : 0,
				quiz5 : 0,
				quiz6 : 0,
				quiz7 : 0,
				quiz8 : 0,
				quiz9 : 0,
				quiz10 : 0,
				quiz11 : 0,
				quiz12 : 0,
				quiz13 : 0,
				quiz14 : 0,
				quiz15 : 0,
				quiz16 : 0,
				quiz17 : 0,
				quiz18 : 0,
				quiz19 : 0,
				quiz20 : 0,
				total_score : 0
			},function(error){
				if(error){
					window.alert("Error");
					removeLoad();
				}
				else{
					trueCond();
				}
			});
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

	var timeleft = 25;
	downloadTimer = setInterval(function(){
		document.getElementById("progressBar").value = 25 - timeleft;
		timeleft -= 1;
		if(timeleft == -2){
			submitData();
			clearInterval(downloadTimer);
		}
	}, 1000);
}

function clicked1(){
	document.getElementById("quest1").setAttribute("value",document.getElementById("progressBar").value);
	// document.getElementById("ans-2").addEventListener("click",function(event){
	// 	console.log(document.getElementById("progressBar").value);
	// 	document.getElementById("quest1").setAttribute("value",document.getElementById("progressBar").value);
	// });
}

function clicked2(){
	document.getElementById("quest2").setAttribute("value",document.getElementById("progressBar").value);
	// document.getElementById("ans-7").addEventListener("click",function(event){
	// 	console.log(document.getElementById("progressBar").value);
	// 	document.getElementById("quest2").setAttribute("value",document.getElementById("progressBar").value);
	
	// 	// time2 = document.getElementById("progressBar").value;
	// });
}

function clicked3(){
	document.getElementById("quest3").setAttribute("value",document.getElementById("progressBar").value);
	// document.getElementById("ans-10").addEventListener("click",function(event){
	// 	console.log(document.getElementById("progressBar").value);
	// 	document.getElementById("quest3").setAttribute("value",document.getElementById("progressBar").value);
	
	// 	// time3 = document.getElementById("progressBar").value;
	// });
}

function clicked4(){
	document.getElementById("quest4").setAttribute("value",document.getElementById("progressBar").value);
	// document.getElementById("ans-13").addEventListener("click",function(event){
	// 	console.log(document.getElementById("progressBar").value);
	// 	document.getElementById("quest4").setAttribute("value",document.getElementById("progressBar").value);
	// 	// time4 = document.getElementById("progressBar").value;
	// });
}

function clicked5(){
	document.getElementById("quest5").setAttribute("value",document.getElementById("progressBar").value);
		
	// document.getElementById("ans-18").addEventListener("click",function(event){
	// 	console.log(document.getElementById("progressBar").value);
	// 	document.getElementById("quest5").setAttribute("value",document.getElementById("progressBar").value);
	// 	// time5 = document.getElementById("progressBar").value;
	// });
}


function getValue(){
	var ans1 = 0,ans2 = 0,ans3=0,ans4=0
	,ans5 = 0;
	if(document.getElementById('ans-4').checked){
		ans1 += 20*(25-parseInt(document.getElementById("quest1").value));
	}
	else ans1 += 5;

	if(document.getElementById('ans-6').checked){
		ans2 += 20*(25-parseInt(document.getElementById("quest2").value));
	}

	else ans2 += 5;

	if(document.getElementById('ans-10').checked){
		ans3 += 20*(25-parseInt(document.getElementById("quest3").value));
	}
	else ans3 += 5;

	if(document.getElementById('ans-15').checked){
		ans4 += 20*(25-parseInt(document.getElementById("quest4").value));
	}
	else ans4 += 5;

	if(document.getElementById('ans-18').checked){
		ans5 += 20;
	}
	else if(document.getElementById('ans-19').checked){
		ans5 += 20*(25-parseInt(document.getElementById("quest5").value));
	}
	else ans5 += 5;
	
	updateData(ans1,ans2,ans3,ans4,ans5);
}

function updateData(q1, q2, q3, q4, q5) {
	const fb = firebase.database().ref();
	var data = {
		quiz16:q1,
		quiz17:q2,
		quiz18:q3,
		quiz19:q4,
		quiz20:q5
	};
	fb.child('users/'+document.getElementById("inputNickname").value).update(data);
}

function submitData(){
	getValue();
	document.getElementById("bodycontainer1").style.display = "none";
	document.getElementById("bodycontainer3").style.display = "block";
	document.getElementById("bodycontainer2").style.display = "none";
	document.getElementById("nickname").innerHTML = document.getElementById("inputNickname").value;

	firebase.database()
	.ref(`users/${document.getElementById("inputNickname").value}/`)
	.once("value", snapshot => {

		var quiz = {};
		var total_point = 0;

		for (let index = 1; index <= 20; index++) {
			quiz[index] = snapshot.child("quiz"+index).val();
		}

		for (let index = 1; index <= 20; index++) {
			document.getElementById("p"+index).innerHTML = quiz[index];
			total_point += quiz[index];
		}

		document.getElementById("score").innerHTML = total_point;
		totalscore(total_point);
	});
}

function totalscore(score) {
	const fb = firebase.database().ref();
	var data = {total_score:score};
	pushTotalScore(score);
	fb.child('users/'+document.getElementById("inputNickname").value).update(data);
}

function pushTotalScore(score){
	var firebaseRef = firebase.database().ref('leaderboard/'+document.getElementById("inputNickname").value);
	firebaseRef.set({
		total_score : score
	});
}


