let body = document.querySelector('body'),
    countContainer = document.querySelector('.count'),
    qstNumber = document.querySelector('.count .allQst'),
    currentQstContainer = document.querySelector('.count .currentQst'),
    qstContainer = document.querySelector('.quiz-area'),
    qstH2 = document.querySelector('.quiz-area h2'),
    rightAnsContainer = document.querySelector('.quiz-area .rightans'),
    wrongAnsContainer = document.querySelector('.quiz-area .wrongans'),
    spanContainer = document.querySelector('.spans'),
    timeContainer = document.querySelector('.time'),
    counter = document.querySelector('.countdown'),
    answersContainer = document.querySelector('.answers-area'),
    submitButton = document.querySelector('.submit-button'),
    questionContainer = document.querySelector('.quiz-area h2'),
    input = document.querySelectorAll('.input'),
    label = document.querySelectorAll('.answer1'),
    bulletsContainer = document.querySelector('.bullets'),
    resultsContainer = document.querySelector('.results'),
    tryAgain = document.querySelector('.again'),
    anotherGame = document.querySelector('.another-game');

let numOfQst,
    currentQst = 0,
    currentQstContainerN = 1,
    count = 9,
    rightAnswers = 0,
    countdown,
    currnetRightAns = 0,
    CurrentWrongAns = 0;

// start AJAX request
function myRequest() {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200){
            let myObject = JSON.parse(this.responseText);

            // -----set number of qeustions-----
            numOfQst = myObject.length-1;
            qstNumber.innerHTML = numOfQst;

            // -----create pullets-----
            for (let i=0; i<myObject.length-1; i++){
                let pullets = document.createElement('span');
                spanContainer.appendChild(pullets);
                i==0 && pullets.classList.add('on');
            }

            // -----start countdown-----
            countDown(59);

            // -----add date-----
            addData(myObject[currentQst], numOfQst);
                
            // -----when click submit-----
            submitButton.onclick = function () {
                let rightAns = myObject[currentQst].right_answer;

                // check if the answer is right
                checkAns(rightAns,numOfQst);
                
                currentQst++;
                currentQstContainerN++;
                qstH2.innerHTML = '';

                addData(myObject[currentQst],numOfQst);

                // add one bullet
                addBullets();

                clearInterval(countdown);
                countDown(59);

                if(currentQst === 8){
                    body.style.textAlign = 'center';
                    qstContainer.remove();
                    submitButton.remove();
                    questionContainer.remove();
                    answersContainer.remove();
                    bulletsContainer.remove();
                    countContainer.remove();
                    clearInterval(countdown);
                    anotherGame.style.display = 'block'

                    // show the the result
                    showResult();


                    tryAgain.style.display = 'block'
                }
            }
        }

        // ----- when click reload -----
        tryAgain.onclick = () => window.location.reload(true);
    }
    
    myRequest.open('GET', 'data1.json', true);
    myRequest.send();
    
}
myRequest();

// -----create countdown-----
function countDown(timer) {
    countdown = setInterval( () => {
        if(timer <=9){
            timeContainer.style.color = 'red';
            timeContainer.style.fontWeight = 'bold';
            counter.innerHTML = `0${timer}`;
        }else{
            timeContainer.style.fontWeight = 'normal';
            timeContainer.style.color = 'black';
            counter.innerHTML = timer
        }
        timer--;
        if(timer < 0){
            clearInterval(countdown);
            submitButton.click();
        }
    },1000)
}

// -----add data function-----
function addData(obj, count) {
    // create qeustions
    let questions = document.createTextNode(obj.title);
    questionContainer.appendChild(questions);
    // create answers
    for (let i=0; i<4; i++){
        label[i].innerHTML = obj[`answer_${i+1}`];
        input[i].dataset.answer = obj[`answer_${i+1}`];
        
    } 
    currentQstContainer.innerHTML = currentQstContainerN;
    rightAnsContainer.innerHTML = currnetRightAns;
    wrongAnsContainer.innerHTML = CurrentWrongAns;
}

// -----create check answer function-----
function checkAns(rAns) {
    let answers = document.querySelectorAll('.input'),
        success = document.querySelector('.success'),
        fail = document.querySelector('.fail'),
        choosenAns;
    for (let i=0; i<4; i++){
        answers[i].checked && (choosenAns = answers[i].dataset.answer)
    }
    if(rAns === choosenAns){
        success.play();
        rightAnswers++;
        currnetRightAns++;
    } else{
        fail.play();
        CurrentWrongAns++
    }
}

// ----------add bullets function----------
function addBullets() {
    let bulletsSpans = document.querySelectorAll(".bullets .spans span");
    let arrayOfSpans = Array.from(bulletsSpans);
    arrayOfSpans.map((span,index) => currentQst===index? span.className='on' : false)
}

// -----crate results function-----
function showResult(ans) {
    resultsContainer.style.display = 'block';
    if(rightAnswers <= numOfQst/2){
        resultsContainer.innerHTML = `<span class="bad">Bad</span> Yor Result is ${rightAnswers} of ${numOfQst}`
    } else if(rightAnswers > numOfQst/2 && rightAnswers < numOfQst){
        resultsContainer.innerHTML = `<span class="good">Good</span> Yor Result is ${rightAnswers} of ${numOfQst}`
    } else{
        resultsContainer.innerHTML = `<span class="perfect">Perfect</span> Yor Result is ${rightAnswers} of ${numOfQst}`
    }
}
