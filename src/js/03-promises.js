import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

const delay = document.querySelector('.form [name="delay"]');
const step = document.querySelector('.form [name="step"]');
const amount = document.querySelector('.form [name="amount"]');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  'use strict';
  event.preventDefault();

  let delayValue = Number(delay.value);
  let stepValue = Number(step.value);
  let amountValue = Number(amount.value);

  for (let position = 1; position <= amountValue; position += 1) {
    createPromise(position, delayValue)
      .then(({ position, delayValue }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delayValue}ms`);
      })
      .catch(({ position, delayValue }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delayValue}ms`);
      });
    delayValue += stepValue;
  }
}

function createPromise(position, delayValue) {
  const shouldResolve = Math.random() > 0.3;
  let promiseValue = { position, delayValue };

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(promiseValue);
      }
      reject(promiseValue);
    }, delayValue);
  });
}
