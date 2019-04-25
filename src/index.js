import $ from 'jquery';
import './style.scss';


let num = 0;

function counter() {
  num += 1;
  $('#main').html(`You've been on this page for ${num} seconds.`);
}

setInterval(() => { counter(); }, 1000);
