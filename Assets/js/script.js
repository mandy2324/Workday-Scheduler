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
    setTimeblockText(currentTime);
}

function getCurrentTimeBlocks() {
    var currentTimeBlocks = localStorage.getItem('timeblockobjects');
    return currentTimeBlocks ? JSON.parse(currentTimeBlocks) : [];
}
// function for timeblock row display

function displayTimeBlockRows(currentTime) {
    var currentHour = currentTime.hour();

    for (let i = 9; i <= 17; i++) {
        var timeblock = createTimeblockRow(i);
        var hourCol = createCol(createHourDiv(i), 1);
        var textArea = createCol(createTextArea(i, currentHour), 10);
        var saveBtn = createCol(createSaveBtn(i), 1);

        appendTimeblockColumns(timeblock, hourCol, textArea, saveBtn);
        document.querySelector('.container').appendChild(timeblock);

    }
}

function createTimeblockRow(hourId) {
    var timeblock = document.createElement('div');
    timeblock.classList.add('row');
    timeblock.id = `timeblock-${hourId}`;
    return timeblock;

}

function createCol(element, colSize) {
    var col = document.createElement('div');
    col.classList.add(`col-${colSize}`, 'p-0');
    col.appendChild(element);
    return col;
}

function createHourDiv(hour) {
    var hourCol = document.createElement('div');
    hourCol.classList.add('hour');
    hourCol.textContent = formatHour(hour);
    return hourCol;

}

function formatHour(hour) {
    var hourString = String(hour);
    return moment(hourString, 'h').format('hA');
}

function createTextArea(hour, currentHour) {
    var textArea = document.createElement('textarea');
    textArea.classList.add(getTextAreaBackgroundClass(hour, currentHour));
    return textArea;
}

function getTextAreaBackgroundClass(hour, currentHour) {
    return hour < currentHour ? 'past' :
        hour === currentHour ? 'present' :
        'future';
}

function createSaveBtn(hour) {
    var saveBtn = document.createElement('button');
    saveBtn.classList.add('saveBtn');
    saveBtn.innerHTML = '<i class="fas fa-save"></i>';
    saveBtn.setAttribute('data-hour', hour);
    return saveBtn;
}

function appendTimeblockColumns(timeblockRow, hourCol, textAreaCol, saveBtnCol) {
    var innerCols = [hourCol, textAreaCol, saveBtnCol];
    for (let col of innerCols) {
        timeblockRow.appendChild(col);
    }
}

// to save my data to local Storage 

function containerClicked(event, timeblockList) {
    if (isSaveButton(event)) {
        var timeblockHour = getTimeblockHour(event);
        var textAreaValue = getTextAreaValue(timeblockHour);

        placeTimeblockInList(new TimeblockObj(timeblockHour, textAreaValue), timeblockList);
        saveTimeblockList(timeblockList);
    }
}





// functions for saving to local storage 



function isSaveButton(event) {
    return event.target.matches('button') || event.target.matches('.fa-save');
}

function getTimeblockHour(event) {
    return event.target.matches('.fa-save') ? event.target.parentElement.dataset.hour : event.target.dataset.hour;
}

function getTextAreaValue(timeblockHour) {
    return document.querySelector(`#timeblock-${timeblockHour} textarea`).value;
}

function placeTimeblockInList(newTimeblockObj, timeblockList) {
    if (timeblockList.length > 0) {
        for (let savedTimeblock of timeblockList) {
            if (savedTimeblock.hour === newTimeblockObj.hour) {
                savedTimeblock.todo = newTimeblockObj.todo;
                return;
            }
        }
    }
    timeblockList.push(newTimeblockObj);
    return;
}


function saveTimeblockList(timeblockList) {
    localStorage.setItem('timeblockObjects', JSON.stringify(timeblockList));
}

function setTimeblockText(timeblockList) {
    if (timeblockList.length === 0) {
        return;
    } else {
        for (let timeblock of timeblockList) {
            document.querySelector(`#timeblock-${timeblock.hour} textarea`)
                .value = timeblock.todo;
        }
    }
}