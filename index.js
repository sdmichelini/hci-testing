'use strict';

// Constants 
// How many words are in the paragraph?
const WORDS = [130, (257-130), (383-257)];

// CSS classes that vary
const CSS_CLASSES = [
    'width-1',
    'width-2',
    'width-3',
    'width-4',
    'width-5',
    'width-6',
    'width-7',
    'width-8',
    'width-9'
];

const USER_SETUP = {
    order: [1, 2, 0],// Which paragraphs will they get
    isControl: false,// Are they a control group
    widths: [2, 1, 3]// Which CSS Widths will they get?
};

var times = [];

let index = 0;
// Move to the next item
function next() {
    let nextParagraph, lastParagraph;
    switch(index) {
        case 0: 
            transitionFromId('part1','part2');
            index++;
            break;
        case 1:
            nextParagraph = USER_SETUP.order[0] + 1;
            startTimer();
            console.log(CSS_CLASSES[USER_SETUP.widths[0]]);
            prepareParagraph(nextParagraph, CSS_CLASSES[USER_SETUP.widths[0]]);
            console.log('paragraph'+nextParagraph);
            transitionFromId('part2','paragraph'+nextParagraph);
            index++;
            break;
        case 2:
            nextParagraph = USER_SETUP.order[0] + 1;
            endTimer();
            
            transitionFromId('paragraph'+nextParagraph, 'quiz'+nextParagraph);
            index++;
            break;
        case 3:
            lastParagraph = USER_SETUP.order[0] + 1;
            nextParagraph = USER_SETUP.order[1] + 1;
            prepareParagraph(nextParagraph, CSS_CLASSES[USER_SETUP.widths[1]]);
            transitionFromId('quiz'+lastParagraph,'paragraph'+nextParagraph);
            startTimer();
            index++;
            break;
        case 4:
            nextParagraph = USER_SETUP.order[1] + 1;
            transitionFromId('paragraph'+nextParagraph, 'quiz'+nextParagraph);
            endTimer();
            index++;
            break;
        case 5:
            lastParagraph = USER_SETUP.order[1] + 1;
            nextParagraph = USER_SETUP.order[2] + 1;
            prepareParagraph(nextParagraph, CSS_CLASSES[USER_SETUP.widths[2]]);
            transitionFromId('quiz'+lastParagraph,'paragraph'+nextParagraph);
            startTimer();
            index++;
            break;
        case 6:
            nextParagraph = USER_SETUP.order[2] + 1;
            transitionFromId('paragraph'+nextParagraph, 'quiz'+nextParagraph);
            endTimer();
            index++;
            break;
        case 7:
            nextParagraph = USER_SETUP.order[2] + 1;
            index++;
            transitionFromId('quiz'+nextParagraph, 'done');
            document.getElementById('results').innerHTML = getResults();
            break;
        default:
            break;

    }
}

function getResults() {
    let result = '<ul>';
    for(let time of times) {
        result += '<li>'+time+'</li>';
    }
    result += '</ul>';
    return result;
}

document.addEventListener('DOMContentLoaded', function() {
   var form = document.getElementById('start-form');
    if (form.attachEvent) {
        form.attachEvent("submit", startFormSubmit);
    } else {
        form.addEventListener("submit", startFormSubmit);
    }
});

function transitionFromId(fromId, toId) {
    document.getElementById(fromId).style.display = 'none';
    document.getElementById(toId).style.display = 'block';
}

function prepareParagraph(num, width) {
    if(USER_SETUP.isControl) {
        document.getElementById('paragraph'+num).className = CSS_CLASSES[4];
    } else {
        document.getElementById('paragraph'+num).className = width;
    } 
}

function startFormSubmit(e) {
    e.preventDefault();
    next();
}

var start = new Date(0);



function startTimer() {
    start = Date.now();
}

function endTimer() {
    var delta = Date.now() - start;
    var word_length = WORDS[(index/2) - 1];
    var words_per_minutes = ((word_length * 60000.0)/delta);
    times.push(words_per_minutes);
    console.log(words_per_minutes);
}