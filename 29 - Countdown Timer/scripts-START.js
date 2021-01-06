const buttons = document.querySelectorAll('[data-time]')
const endTime = document.querySelector('.display__end-time');
const timerDisplay = document.querySelector('.display__time-left')
let countdown

function startTimer () {
  const seconds = parseInt(this.dataset.time)
  calcTimer(seconds)
}

function calcTimer (seconds) {
  clearInterval(countdown)

  const now = Date.now()
  // 换成 18:00 下班倒计时
  if (!Number.isInteger(seconds)) {
    const timestamp18 = new Date(now).setHours(18, 0, 0)
    const time = (timestamp18 - now) / 1000
    console.log('time', time)
    seconds = time < 0 ? 24 * 3600 + time : time
  }
  const then = now + seconds * 1000

  displayTimeLeft(seconds)
  displayEndTime(then);

  countdown = setInterval(() => {
    const lastTime = Math.round((then - Date.now()) / 1000)
    if (lastTime < 0) {
      clearInterval(countdown)
      return
    }
    displayTimeLeft(lastTime)
  }, 1000);
}

function displayTimeLeft (seconds) {
  const h = Math.floor(seconds / 3600) < 10 ? '0' + Math.floor(seconds / 3600) : Math.floor(seconds / 3600);
  const m = Math.floor((seconds / 60 % 60)) < 10 ? '0' + Math.floor((seconds / 60 % 60)) : Math.floor((seconds / 60 % 60));
  const s = Math.floor((seconds % 60)) < 10 ? '0' + Math.floor((seconds % 60)) : Math.floor((seconds % 60));
  const display = h + ":" + m + ":" + s;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime (timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour < 10 ? '0' + hour : hour
  const minutes = end.getMinutes();
  const adjustedMinutes = minutes < 10 ? '0' + minutes : minutes
  const seconds = end.getSeconds();
  const adjustedSeconds = seconds < 10 ? '0' + seconds : seconds
  endTime.textContent = `Arrival Time At ${adjustedHour}:${adjustedMinutes}:${adjustedSeconds}`;
}

buttons.forEach(button => button.addEventListener('click', startTimer))

document.customForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  if (!Number.isInteger(parseInt(mins))) return
  calcTimer(mins * 60);
  this.reset();
});