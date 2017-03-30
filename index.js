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

function startFormSubmit(e) {
    e.preventDefault();
    transitionFromId('part1', 'part2');
}