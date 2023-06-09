import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < options.defaultDate) {
      startBtn.disabled = true;
      return alert('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

// startBtn.disabled = true;
startBtn.addEventListener('click', () => {
  timerCounter();
});

flatpickr(input, options);

function timerCounter() {
  startBtn.disabled = true;
  input.disabled = true;
  let timer = setInterval(() => {
    let timeCounter = new Date(input.value) - new Date();

    if (timeCounter >= 0) {
      let timerValue = convertMs(timeCounter);
      dataDays.textContent = timerValue.days;
      dataHours.textContent = timerValue.hours;
      dataMinutes.textContent = timerValue.minutes;
      dataSeconds.textContent = timerValue.seconds;
      console.log(timeCounter);
    } else {
      clearInterval(timer);
    }
  }, 1000);
}
console.log(timerCounter);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
