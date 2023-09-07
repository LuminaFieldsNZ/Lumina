
                  // Get the current date and time
                  var currentDate = new Date();

                  // Format the date and time as desired
                  var options = {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                  };
                  var formattedDate = currentDate.toLocaleDateString(undefined, options);

                  // Display the formatted date and time in the specified element
                  var dateTimeElement = document.getElementById('currentDateTime');
                  dateTimeElement.innerHTML = formattedDate;




                  var countDownDate = new Date("Sep 5, 2023 17:30:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  daysFinal = (days - 40);

  // Display the result in the element with id="demo"
  document.getElementById('timer').innerHTML = (daysFinal + 40) + "d " + hours + "h ";
  document.getElementById('timera').innerHTML = (daysFinal + 6) + "d " + hours + "h ";
  document.getElementById('timer1').innerHTML = (daysFinal + 23) + "d " + hours + "h ";
  document.getElementById('timer2').innerHTML = (daysFinal + 23) + "d " + hours + "h ";
  document.getElementById('timer3').innerHTML = (daysFinal + 23) + "d " + hours + "h ";
  document.getElementById('timer4').innerHTML = (daysFinal + 23) + "d " + hours + "h ";
  document.getElementById('timer5').innerHTML = (daysFinal + 23) + "d " + hours + "h ";
  document.getElementById('timer6').innerHTML = (daysFinal + 23) + "d " + hours + "h ";
  document.getElementById('timer7').innerHTML = (daysFinal + 23) + "d " + hours + "h ";
  document.getElementById('timer8').innerHTML = (daysFinal + 23) + "d " + hours + "h ";


  // If the count down is finished, write some text
  if (distance <= 0) {
    clearInterval(x);
    document.getElementById('timer').innerHTML = "EXPIRED";
    document.getElementById('timera').innerHTML = "EXPIRED";
    document.getElementById('timer1').innerHTML = "EXPIRED";
    document.getElementById('timer2').innerHTML = "EXPIRED";
    document.getElementById('timer3').innerHTML = "EXPIRED";
    document.getElementById('timer4').innerHTML = "EXPIRED";
    document.getElementById('timer5').innerHTML = "EXPIRED";
    document.getElementById('timer6').innerHTML = "EXPIRED";
    document.getElementById('timer7').innerHTML = "EXPIRED";
    document.getElementById('timer8').innerHTML = "EXPIRED";

  }
}, 1000);


const tBox1 = document.getElementById('2tPercentInput').innerHTML;
const numbertBox1 = tBox1.match(/\d+/)[0];
var tBoxValue1 = Number(numbertBox1);

const tBox2 = document.getElementById('3tPercentInput').innerHTML;
const numbertBox2 = tBox2.match(/\d+/)[0];
var tBoxValue2 = Number(numbertBox2);

const tBox3 = document.getElementById('4tPercentInput').innerHTML;
const numbertBox3 = tBox3.match(/\d+/)[0];
var tBoxValue3 = Number(numbertBox3);

const tBox4 = document.getElementById('5tPercentInput').innerHTML;
const numbertBox4 = tBox4.match(/\d+/)[0];
var tBoxValue4 = Number(numbertBox4);

const tBox5 = document.getElementById('6tPercentInput').innerHTML;
const numbertBox5 = tBox5.match(/\d+/)[0];
var tBoxValue5 = Number(numbertBox5);

const tBox6 = document.getElementById('7tPercentInput').innerHTML;
const numbertBox6 = tBox6.match(/\d+/)[0];
var tBoxValue6 = Number(numbertBox6);

const tBox7 = document.getElementById('8tPercentInput').innerHTML;
const numbertBox7 = tBox7.match(/\d+/)[0];
var tBoxValue7 = Number(numbertBox7);

const tBox8 = document.getElementById('9tPercentInput').innerHTML;
const numbertBox8 = tBox8.match(/\d+/)[0];
var tBoxValue8 = Number(numbertBox8);


var tBox = Math.floor((tBoxValue1 + tBoxValue2 + tBoxValue3 + tBoxValue4 + tBoxValue5 + tBoxValue6 + tBoxValue7 + tBoxValue8)/8);
document.getElementById('tPercentInput').innerHTML = tBox + '%';
document.getElementById('tBoxProgress').style.width = 2.5*tBox;



/*math for paid amount */

var paidElement1 = document.getElementById('paid1').innerHTML;

var paidElement2 = document.getElementById('paid2').innerHTML;

var paidElement3 = document.getElementById('paid3').innerHTML;

var paidElement4 = document.getElementById('paid4').innerHTML;

var paidElement5 = document.getElementById('paid5').innerHTML;

var paidElement6 = document.getElementById('paid6').innerHTML;

var paidElement7 = document.getElementById('paid7').innerHTML;

var paidElement8 = document.getElementById('paid8').innerHTML;

var totalPaid = Math.floor(paidElement1) + Math.floor(paidElement2) + Math.floor(paidElement3) + Math.floor(paidElement4) + Math.floor(paidElement5) + Math.floor(paidElement6) + Math.floor(paidElement7) + Math.floor(paidElement8);
document.getElementById('finalNumber').innerHTML = totalPaid;
