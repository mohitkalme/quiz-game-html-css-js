const data = [
  {
    id: 0,
    question: "Which event occurs when the user clicks on an HTML element?",
    options: ["onchange", "onmouseclick", "onclick", "onmouseover"],
    correctAns: "onclick",
    userClickedOnOption: null,
    checked: false,
  },
  {
    id: 1,
    question: "Which HTML attribute is used to define inline styles?",
    options: ["style", "class", "styles", "font"],
    correctAns: "style",
    userClickedOnOption: null,
    checked: false,
  },
  {
    id: 2,
    question: "Which is the correct CSS syntax?",
    options: [
      "{body:color=black;}",
      "body:color=black;",
      "body {color: black;}",
      "{body;color:black;}",
    ],
    correctAns: "body {color: black;}",
    userClickedOnOption: null,
    checked: false,
  },
  {
    id: 3,
    question: "How do you insert a comment in a CSS file?",
    options: [
      "// this is a comment //",
      "' this is a comment",
      "/* this is a comment */",
      "// this is a comment",
    ],
    correctAns: "/* this is a comment */",
    userClickedOnOption: null,
    checked: false,
  },
  {
    id: 4,
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-style", "font-size", "text-size"],
    correctAns: "font-size",
    userClickedOnOption: null,
    checked: false,
  },
];

const question = document.querySelector(".question");
const options = document.getElementById("options");
var questionNum = 0;//On which question we are at or which question is displayed in the window currently.
var userAnsObj = {};//When user clicks on options they will be stored here;

function printQuestion(questionNum) {//This question takes the question from data and prints on the screen.
    const progress_bar = document.querySelector('.progress_bar');
    percentage = ((questionNum + 1)/ data.length)*100
    progress_bar.style.width = `${percentage}%`//This changes width of progress_bar element.
    
  question.innerHTML = `${data[questionNum].id + 1}. ${//This prints question on the screen
    data[questionNum].question
  }`;
  const html = data[questionNum].options.map(//html becomes array of elements which are strings, so we join them and create a single string of elements.
    (opt, index) =>
      `<label for=${index} class="radioContainer">
         <input type="radio" id=${index} name="option" value='${opt}'>
         ${opt}
       </label> `
  );
  options.innerHTML = html.join("");

  const input = document.getElementById(
    `${data[questionNum].userClickedOnOption}`//This shows what option we clicked earlier
  );
  if (input === null) {// If input === null that means we didn't select any option and moved to next question.
   
  } else {
    input.setAttribute("checked", `${data[questionNum].checked}`);
    
  }

  const radioContainer = document.querySelectorAll(`input[type='radio']`);

  radioContainer.forEach((item) => {
    item.addEventListener("click", savingUserAns);
  });
}

printQuestion(questionNum); //When page loads for the first time

function savingUserAns(e) {
  const checkedInput = e.target;
  const userSelection = e.target.value;

       data[questionNum].userClickedOnOption = checkedInput.getAttribute("id");//we are remembering what option user selected basically user clicked on which option.
        data[questionNum].checked = true;
  userAnsObj[questionNum] = userSelection;//we are creating an object of user answers with question number as key and clicked input value;

}

function nextQuestion() {//When we click Next Button.
    
  questionNum++;
  printQuestion(questionNum);
  if (questionNum > 0) {
    const prevBtn = document.querySelector(".prev");
    prevBtn.classList.remove("hidden");
  }
  if (questionNum === data.length - 1) {//when we reach last question of data array which holds all the questions.
    const nextBtn = document.querySelector(".next");//we are changing Next button to submit button
    nextBtn.textContent = "Submit";
    nextBtn.setAttribute("onclick", "showResult()");
  }
}

function prevQuestion() {
    
  questionNum--;
  printQuestion(questionNum);
  if (questionNum === 0) {
    const prevBtn = document.querySelector(".prev");
    prevBtn.classList.add("hidden");//Hiding the prev button when we reach first question
    printQuestion(questionNum);
  }
  if(questionNum < data.length){
    const nextBtn = document.querySelector(".next");
    nextBtn.textContent = "Next >";//Changing the submit button back to Next button if we clicked prev button on reaching last question of data array. 
    nextBtn.setAttribute("onclick", "nextQuestion()");
  }
}

function showResult() {

  const prevBtn = document.querySelector(".prev");
    prevBtn.classList.add("hidden");
    const nextBtn = document.querySelector(".next");//Hiding Both buttons prev and next or submit button if we clicked submit button on reaching last question
nextBtn.classList.add("hidden");

    const userAnsArray = Object.values(userAnsObj)// changing userAnsObj to userAnsArray so we can use forEach method on it.
    let score = 0;//Initialising score variable

    for (let index = 0; index < data.length; index++) {
        const element = data[index];//Getting question object from data array.
        userAnsArray.forEach(item=>{
            if(item=== element.correctAns){
                score++;//incrementing score variable if user answered correct.
            }
        })
    }
   
  question.innerHTML = `
  <div class="center mb-2">Attempted questions: ${userAnsArray.length} out of ${data.length}</div>
    <div class="center mb-2">Correct answers: ${score}</div>
    `;
  const percentageScore = (score / data.length) * 100;
  options.innerHTML = `
    <div class='final-score center mb-2'>You Scored ${percentageScore}%</div>
    <div class="center">
      <span class="reloadBtn" onclick="reloadWindow()">Take the Quiz Again</span>
    </div>
    `;

}

function reloadWindow(){
  location.reload();
}