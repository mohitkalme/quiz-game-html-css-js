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
var questionNum = 0;
var userAnsObj = {};

function printQuestion(questionNum) {
    const progress_bar = document.querySelector('.progress_bar');
    percentage = ((questionNum + 1)/5)*100
    progress_bar.style.width = `${percentage}%`
    
  question.innerHTML = `${data[questionNum].id + 1}. ${
    data[questionNum].question
  }`;
  const html = data[questionNum].options.map(
    (opt, index, array) =>
      `<label for=${index} class="radioContainer">
         <input type="radio" id=${index} name="option" value='${opt}'>
         ${opt}
       </label> `
  );
  options.innerHTML = html.join("");

  const input = document.getElementById(
    `${data[questionNum].userClickedOnOption}`
  );
  if (input === null) {
   
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

       data[questionNum].userClickedOnOption = checkedInput.getAttribute("id");
        data[questionNum].checked = true;
  userAnsObj[questionNum] = userSelection;

}
function nextQuestion() {
    const progress_bar = document.querySelector('.progress_bar');
    percentage = ((questionNum + 1)/5)*100
    progress_bar.style.width = `${percentage}%`
    
  questionNum++;
  if (questionNum > 0) {
    const prevBtn = document.querySelector(".prev");
    prevBtn.classList.remove("hidden");
  }
  printQuestion(questionNum);
  if (questionNum === 4) {
    const nextBtn = document.querySelector(".next");
    nextBtn.textContent = "Submit";
    nextBtn.setAttribute("onclick", "showResult()");
  }
}
function prevQuestion() {
    
  questionNum--;
  printQuestion(questionNum);
  if (questionNum === 0) {
    const prevBtn = document.querySelector(".prev");
    prevBtn.classList.add("hidden");
    printQuestion(questionNum);
  }
  if(questionNum <4){
    const nextBtn = document.querySelector(".next");
    nextBtn.textContent = "Next >";
    nextBtn.setAttribute("onclick", "nextQuestion()");
  }
}
function showResult() {

  const prevBtn = document.querySelector(".prev");
    prevBtn.classList.add("hidden");
    const nextBtn = document.querySelector(".next");
nextBtn.classList.add("hidden");

    const userAnsArray = Object.values(userAnsObj)
    let score = 0;

    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        userAnsArray.forEach(item=>{
            if(item=== element.correctAns){
                score++;
            }
        })
    }
   
  question.innerHTML = `
  <div class="center mb-2">${userAnsArray.length} out of ${data.length} questions were Attempted.</div>
    <div class="center mb-2">${score} out of ${data.length} questions were correct.</div>
    `;
  const percentageScore = (score / 5) * 100;
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