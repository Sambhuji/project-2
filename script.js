const allCheckBoxes = document.querySelectorAll('.checkbox-circle');

const allInputs = document.querySelectorAll('.first-goal-input');

const warnMsg = document.querySelector('.goal-para');
const progressValue = document.querySelector('.progress-value');

const valueText = document.querySelector('.complete-status');

const textPara = document.querySelector('.title-para');

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || { }
completedGoal = Object.values(allGoals).filter((goal) => goal.completed).length;
progressValue.style.width = `${completedGoal / 3 * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoal}/3 completed`;

const lastPara = document.querySelector('.last-para');

const lastQuote = [

    '"It does not matter how slowly you go as long as you do not stop."',
    '"Keep up the great work as you move toward your next goals!"',
    
    '"You’re well on your way to completing all three goals. Keep pushing forward!"',
    
    '"congratulations! Enjoy the moment and the satisfaction of reaching all your goals!"'
    
    ]


const contentMsg = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! you just completed all the goals, time for chill'
]

textPara.innerText = `${contentMsg[completedGoal]}`
lastPara.innerText = `${lastQuote[completedGoal]}`

allCheckBoxes.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {

        const inputFields = [...allInputs].every((input) => {
            return input.value
        })
        
        if (inputFields) {
            checkbox.parentElement.classList.toggle('completed');
            const inputId = checkbox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            completedGoal = Object.values(allGoals).filter((goal) => goal.completed).length
            progressValue.style.width = `${completedGoal / 3 * 100}%`
            progressValue.firstElementChild.innerText = `${completedGoal}/3 completed`
            textPara.innerText = `${contentMsg[completedGoal]}`
            lastPara.innerText = `${lastQuote[completedGoal]}`
            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        } else {
            warnMsg.classList.remove('warrning-msg')
        }
       
            

            
    })
});

allInputs.forEach((input) => {
    if (allGoals[input.id])
    {input.value = allGoals[input.id].name

        if(allGoals[input.id].completed) {
            input.parentElement.classList.add('completed');
        }
    }

   
    input.addEventListener('focus', () => {
        warnMsg.classList.add('warrning-msg')
    })

})

allInputs.forEach((input) => {
    input.addEventListener('input', () => {
        if(allGoals[input.id] && allGoals[input.id].completed) {
            input.value = allGoals[input.id].name
            return
        }
        allGoals[input.id] = {
            name: input.value,
            completed: false
        }
       
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
     
    })
})









