// Script Working

// API : https://the-trivia-api.com/api/questions

// API : `https://the-trivia-api.com/api/questions?categories=${}&difficulty=${}&limit=1&region=${}`

// Test

// const model = {
//     "category": "Science",
//     "id": "622a1c377cc59eab6f950517",
//     "correctAnswer": "the writings and practices of historians",
//     "incorrectAnswers": [
//         "the practical arts",
//         "the belief system/cult religion founded by L",
//         "cetaceans - whales, dolphins, and porpoise"
//     ],
//     "question": "What is Historiology the study of ?",
//     "tags": [
    //         "science"
    //     ],
    //     "type": "Multiple Choice",
    //     "difficulty": "medium",
    //     "regions": [ ]
    // }
    
    
    
let gamePlay = new Audio("../Utilities/PlayingTime.wav");
let root = document.querySelector("#root");
let questionBox = document.createElement('div');
questionBox.classList.add('questionBox' , 'flex');
let detailsBox = document.createElement('div');
detailsBox.classList.add('detailsBox' , 'flex');
let question = document.createElement('h1');
question.classList.add('question');
let category = document.createElement('h2');
category.classList.add('category');
let difficulty = document.createElement('p');
difficulty.classList.add('difficulty');
let showAnswer = document.createElement('span');
showAnswer.classList.add('showAnswer');
let select = document.createElement('select');
select.classList.add('selectOption');
let option1 = document.createElement('option');
let option2 = document.createElement('option');
let option3 = document.createElement('option');
let option4 = document.createElement('option');
let checkAnswer = document.createElement('button');
checkAnswer.classList.add('checkAnswer');
let buttons = document.createElement('div');
buttons.classList.add("buttons","flex");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

const getQuiz = () => {
    axios.get('https://the-trivia-api.com/api/questions?limit=1&region=IN').then(response => {
        let quizQuestion = response.data;
        let arrayOptions = [];
        arrayOptions = [quizQuestion[0].correctAnswer,...quizQuestion[0].incorrectAnswers]
        let shuffleQuestionOptions = shuffle(arrayOptions);
        populate(quizQuestion , shuffleQuestionOptions);

    }).catch(error => console.error(error));
};

gamePlay.autoplay = true;
gamePlay.play();
gamePlay.volume = 1;
gamePlay.loop = true;


const populate = (quizQuestion , options) => {
    question.textContent = quizQuestion[0].question;
    category.textContent = quizQuestion[0].category;
    showAnswer.textContent = '';
    difficulty.textContent = quizQuestion[0].difficulty;
    option1.textContent = options[0];
    option2.textContent = options[1];
    option3.textContent = options[2];
    option4.textContent = options[3];
    select.append(option1,option2,option3,option4);
    detailsBox.append(category,showAnswer,difficulty);
    checkAnswer.textContent = 'Sure';
    buttons.append(checkAnswer);
    questionBox.append(detailsBox,question,select,buttons);
    root.append(questionBox);
    checkAnswer.onclick = () => checkingAnswer(quizQuestion);
}

checkingAnswer = (quizQuestion) => {
    console.log("Checking Answer");
    if (select.value === quizQuestion[0].correctAnswer){
        let winMusic = new Audio('../Utilities/Win.wav');
        gamePlay.volume = 0;
        questionBox.style.backgroundColor = "green";
        winMusic.play();
        setTimeout(()=>{
            getQuiz();
            questionBox.style.backgroundColor = "rgb(0,0,0,0.8)";
            winMusic.pause();
            gamePlay.volume = 1;
        },3000)
        console.log("Correct Answer");
    }
    else {
        let failMusic = new Audio('../Utilities/Fail.wav');
        questionBox.style.backgroundColor = "red";
        gamePlay.volume = 0;
        failMusic.play();
        select.disabled = true;
        checkAnswer.disabled = true;
        showAnswer.textContent = quizQuestion[0].correctAnswer;
        setTimeout(()=>{
            questionBox.style.backgroundColor = "rgb(0,0,0,0.8)";
            showAnswer.textContent = '';
            select.disabled = false;
            checkAnswer.disabled = false;
            failMusic.pause();
            gamePlay.volume = 1;
            getQuiz();
        },5000)
        console.log("Wrong Answer");
    }
}

getQuiz();