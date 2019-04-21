(function () {
'use strict';
var timer = document.getElementById('timer');
var min = document.getElementById('min');
var sec = document.getElementById('sec');
var reset = document.getElementById('reset');
var start = document.getElementById('start');
var startTime;
var timeLeft;
var timeToCountdown = 0;
var timerId;
var isRunning = false;

function updateTimer(t) {
    var d = new Date(t);
    var m = d.getMinutes();
    var s = d.getSeconds();
    var ms = d.getMilliseconds();
    m = ('0' + m).slice(-2);
    s = ('0' + s).slice(-2);
    ms = ('00' + ms).slice(-3);

    timer.textContent = m + ':' + s + '.' + ms;

}

function countDown() {
    timerId = setTimeout(function() {
        var elapsedTime = Date.now() - startTime;
        timeLeft = timeToCountdown - elapsedTime;
        //console.log(timeLeft);
        if(timeLeft < 0) {
            isRunning = false;
            start.textContent = 'スタート'
            clearTimeout(timerId);
            timeLeft = 0;
            timeToCountdown = 0;
            updateTimer(timeLeft);
            return;
        }
        updateTimer(timeLeft);
        countDown();
    }, 10);
}

start.addEventListener('click',function() {
    if(isRunning === false) {
        isRunning = true;
        start.textContent = 'ストップ';
        startTime = Date.now();
        countDown();
    }else {
        isRunning = false;
        start.textContent = 'スタート';
        timeToCountdown = timeLeft;
        clearTimeout(timerId);
    }
        
});

min.addEventListener('click',function() {
    timeToCountdown += 60 * 1000;
    updateTimer(timeToCountdown);
});

sec.addEventListener('click',function() {
    timeToCountdown += 1000;
    updateTimer(timeToCountdown);
});

reset.addEventListener('click',function() {
    timeToCountdown = 0;
    updateTimer(timeToCountdown);
});

})();