$(function displayCurrentDate() {
    var currentTime = moment();
    $("#currentDay").text(currentTime.format("dddd, MMMM Do"));
});

// setting a function to execute when page loads
window.onload = function() {
    var currentTimeBlocks = getCurrentTimeBlocks();
    var currentTime = moment();

    displayTimeBlockRows(currentTime);
    displayCurrentDate(currentTime);


    document.querySelector('.container')
        .addEventListener('click', function(event) {
            containerClicked(event, currentTimeBlocks);
        })
    setTimeBlockText(currentTime);
}

function getCurrentTimeBlocks() {
    var currentTimeBlocks = localStorage.getItem('timeblockobjects');
    return currentTimeBlocks ? JSON.parse(currentTimeBlocks) : [];
}
// function for timeblock row display