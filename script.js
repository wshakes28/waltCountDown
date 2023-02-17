let inputContainer = document.querySelector("#input-container")
let countdownForm = document.querySelector("#countdown-form")
let dateEl = document.querySelector("#date-picker")
let countdownEl = document.querySelector("#countdown")
let countdownElTitle = document.querySelector("#countdown-title")
let countdownBtn = document.querySelector("#countdown-button")
let timeElements = document.querySelectorAll("span")
let countdownTitle = ''
let countdownDate = ''
let countdownValue = Date
let countdownActive
let savedCountdown
const completeEl = document.querySelector("#complete")
const completeInfo = document.querySelector("#complete-info")
const completeBtn = document.querySelector("#complete-button")
const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24





const today = new Date().toISOString().split('T')[0]
dateEl.setAttribute('min', today)

function restorePreviousCountdown() {

    if(localStorage.getItem('countdown')) {
        inputContainer.hidden = true
        savedCountdown = JSON.parse(localStorage.getItem('countdown'))
        countdownTitle = savedCountdown.title
        countdownDate = savedCountdown.date
        countdownValue = new Date(countdownDate).getTime()
        updateDOM()
    }


}

function reset() {
    countdownEl.hidden = true;
    inputContainer.hidden = false;
    clearInterval(countdownActive)
    countdownTitle = ''
    countdownDate = ''
    localStorage.removeItem('countdown')

}

function updateDOM() {
    countdownActive = setInterval(() => {
    const now = new Date().getTime()
    const distance = countdownValue - now
    

    
    const days = Math.floor(distance / day)
    const hours = Math.floor((distance % day) / hour)
    const minutes = Math.floor((distance % hour) / minute)
    const seconds = Math.floor((distance % minute) / second)
    


    inputContainer.hidden = true

    if (distance < 0) {
        countdownEl.hidden = true
        clearInterval(countdownActive)
        completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
        completeEl.hidden = false
        
    } else {

    countdownElTitle.textContent = `${countdownTitle}`
    timeElements[0].textContent = `${days}`
    timeElements[1].textContent = `${hours}`
    timeElements[2].textContent = `${minutes}`
    timeElements[3].textContent = `${seconds}`
    completeEl.hidden = true
    countdownEl.hidden = false
    }
    


    

    
    }, second)

}

function updateCountdown(e) {
    e.preventDefault()
    

    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = { 
        title: countdownTitle,
        date: countdownDate,
        
    }
    console.log(savedCountdown)
    localStorage.setItem('countdown', JSON.stringify(savedCountdown))
    
    if (countdownDate === '') {
        return alert("You have not selected a date!")
    } else {
        countdownValue = new Date(countdownDate).getTime()
    
    }

    
    updateDOM()

}

countdownForm.addEventListener('submit', updateCountdown)
countdownBtn.addEventListener('click', reset)
completeBtn.addEventListener('click', reset)


restorePreviousCountdown()


