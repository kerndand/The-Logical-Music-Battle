var quiz;
let buttonCount = 1;

//Start explanation
function startExplanation() { 
    let explanation = document.getElementById("explanation");
    document.getElementById("start").style.display = "none";
    document.getElementById("anzeige").style.display = "none";
    explanation.play();
    
    explanation.onended = function () {
        document.getElementById("waitingSong").style.display = "block";
    }
} 

function startVideo1() {
        let video1 = document.getElementById("video1");
        let video2 = document.getElementById("video2");
        let video3 = document.getElementById("video3");
        let video4 = document.getElementById("video4");
        
        
        document.getElementById("waitingSong").style.display = "none";
        startQuiz();
        
        video1.play();
        
        video1.onended = function () {
            document.getElementById("questionsDone").style.display = "none";
            if (document.getElementById("q" + JSON.stringify(buttonCount + 1)) != null) {
                document.getElementById("q" + JSON.stringify(buttonCount)).style.display = "none";
            }
            stopAudio();
            video2.style.display = "block";
            video2.play();
        }
        
        video2.onended = function () {
            document.getElementById("questionsDone").style.display = "none";
            if (document.getElementById("q" + JSON.stringify(buttonCount + 1)) != null) {
                document.getElementById("q" + JSON.stringify(buttonCount)).style.display = "inline-block";
                document.getElementById("a" + JSON.stringify(buttonCount)).play();
            }
            video2.style.display = "none";
            video3.play();
        }
        
        video3.onended = function () {
            document.getElementById("questionsDone").style.display = "none";
            if (document.getElementById("q" + JSON.stringify(buttonCount + 1)) != null) {
                document.getElementById("q" + JSON.stringify(buttonCount)).style.display = "none";
            }
            stopAudio();
            video4.style.display = "block";
            video4.play();
           
        }
        
        video4.onended = function () {
            document.getElementById("questionsDone").style.display = "none";
            if (document.getElementById("q" + JSON.stringify(buttonCount + 1)) != null) {
                document.getElementById("q" + JSON.stringify(buttonCount)).style.display = "none";
                showResults();
            }
            stopAudio();
            video4.style.display = "none";
            checkResults();
            
        }
}
//Start quiz on click
function startQuiz() {
    document.getElementById("q1").style.display = "inline-block";
    document.getElementById("a1").play();
}

//Change questions on first click on the radio button
function changeQuestion() {

    stopAudio();
    
    if (document.getElementById("q" + JSON.stringify(buttonCount + 1)) != null) {
        document.getElementById("q" + JSON.stringify(buttonCount)).style.display = "none";
        document.getElementById("q" + JSON.stringify(buttonCount + 1)).style.display = "inline-block";
        document.getElementById("a" + JSON.stringify(buttonCount+1)).play();
        buttonCount++;
    } else if (document.getElementById("q" + JSON.stringify(buttonCount + 1)) == null) {
        document.getElementById("q" + JSON.stringify(buttonCount)).style.display = "none";
        document.getElementById("questionsDone").style.display = "block";
        buttonCount++;
        showResults();
    } else {
        document.getElementById("q" + JSON.stringify(buttonCount)).style.display = "none";
        buttonCount++;
    }
}

// Stop Audio, when next question occurs
function stopAudio() {
    var audios = document.getElementsByTagName('audio');
    for (var i = 0, len = audios.length; i < len; i++) {
        audios[i].pause();
        audios[i].currentTime = 0;
    }
}

function showResults() {
   
    let score;
    // Check answers and continue if all questions have been answered
        quiz.checkAnswers(false);
        console.log(quiz.result.score);
       
        if (buttonCount == 1){
            score = 0;
            //Write for server
            $.get('/wscoreb',{s:score});
        } else {
            score = quiz.result.score;
            //Write for server
            $.get('/wscoreb',{s:score});
        }
}


window.onload = function () {
    quiz = new Quiz('quiz', [
        'c',
        'd',
        'b',
        'b',
        'a',
        'a',
        'b',
        'd',
        'a',
        'b',
        'c',
        'c',
        'b',
        'b',
        'a',
        'c',
        'b',
        'b',
        'c',
        'd',
        'a',
        'c',
        'a',
        'c',
        'c',
        'b',
        'b',
        'a'
    ]);
};

// Send results to server

var scorea;
var scoreb;

var interval3 = setInterval(
    
			function() {
			$.get('/rscorea', function(d) {
				scorea = d;
			});
			$.get('/rscoreb', function(d) {
				scoreb = d;
			});
			
			$('#anzeige3').html("score A: "+scorea + " score B: "+ scoreb);
            if (document.getElementById("q" + JSON.stringify(buttonCount + 1)) != null){
                checkResults();	
            }
		}, 500);
        
function checkResults(){
    let result = document.getElementById("result");
        
        if (scorea < 5000 && scoreb < 5000 && scorea < scoreb){
            result.style.display = "block";
            result.innerHTML = "Du hast mehr Punkte erreicht, aber du hast verloren. Was war das Ziel des Spiels?";
			
        } else if (scorea < 5000 && scoreb < 5000 && scorea == scoreb){
            result.style.display = "block";
            result.innerHTML = "Ihr habt gleich viele Punkte erreicht. Habt ihr dadurch beide gewonnen oder verloren?";
			
        } else if (scorea < 5000 && scoreb < 5000 && scorea > scoreb){
            result.style.display = "block";
            result.innerHTML = "Du hast weniger Punkte erreicht, aber du hast gewonnen. Was war das Ziel des Spiels?";
			
        } else {
            console.log("Keine Ergebnisse");
        }
	}

