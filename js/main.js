function fetchAndRender() {
    fetch("./data/data.json")
        .then(response => response.json())
        .then(data => {
            console.log("got the data");
            console.log(data);
            data.forEach((item) => {console.log(item.title);});
            render(data);
        });
}

function render(habitData) {
    console.log("rendering!");

    const nDays = 7;

    // Create habit labels
    let habitLabelDiv = document.querySelector('.labels');

    for (let i = 0; i < habitData.length; i++) {
        let span = document.createElement('span');
        span.textContent = habitData[i].title;
        span.onclick = () => {showSummary(null, i);};
        span.classList.add('habit-labels');
        habitLabelDiv.append(span);
    }

    // Create Day row
    let dayNames = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    let dayHeaderRow = document.querySelector('#dayHeader');

    for (let i = 0; i < nDays; i++) {
        let span = document.createElement('span');
        span.textContent = dayNames[i];
        span.onclick = () => {showSummary(i, null);};
        dayHeaderRow.append(span);
    }

    // Create date row
    createDateRow(1, 7);

    // Create habit grid
    createHabitGrid(habitData, 0, nDays);

    // Create summary row
    let contentDiv = document.querySelector('.content');
    let daySummaryContainer = document.createElement('div');
    daySummaryContainer.classList.add("day-summary-container");
    for (let i = 0; i < nDays; i++) {
        let span = document.createElement('span');
        span.classList.add("day-summary");
        daySummaryContainer.append(span);
    }
    contentDiv.append(daySummaryContainer);

    // Create summary col
    let habitSummaryContainer = document.querySelector('.habit-summary-container');
    for (let i = 0; i < habitData.length; i++) {
        let span = document.createElement('span');
        span.classList.add("habit-summary");
        habitSummaryContainer.append(span);
    }

    // Create picker
    let pickerContainerDiv = document.querySelector(".picker-container");
    createPicker(habitData, pickerContainerDiv, habitData.length);
}

function createDateRow(startN, nDays) {
    let dateValues = Array.from(new Array(nDays), (x, i) => i + startN);
    // let dateValues = [1, 2, 3, 4, 5, 6, 7];
    let dateStrings = dateValues.map(n => n < 10 ? '0' + n : '' + n);

    // create row, clear if already full
    let dateHeaderRow = document.querySelector('#dateHeader');
    while (dateHeaderRow.hasChildNodes()) {
        dateHeaderRow.removeChild(dateHeaderRow.firstChild);
    }

    for (let i = 0; i < nDays; i++) {
        let span = document.createElement('span');
        span.textContent = dateStrings[i];
        span.onclick = () => {
            showSummary(i, null);
        };
        dateHeaderRow.append(span);
    }
}

function createHabitGrid(habitData, startIndex, nDays) {
    let habitGrid = document.querySelector('.habit-grid');
    while (habitGrid.hasChildNodes()) {

        habitGrid.removeChild(habitGrid.firstChild);
    }

    for (let i = 0; i < habitData.length; i++) {
        // Create habit row
        let habitRow = document.createElement('div');
        habitRow.classList.add("habit-row");

        for (let j = startIndex; j < (startIndex + nDays); j++) {

            // Create habit day cell
            let habitSpan = null;
            if (habitData[i].type === 'number') {
                habitSpan = createNumericCell(j, i, habitData[i].score[j], habitData[i].dGoal);
            } else {
                habitSpan = createBooleanCell(j, i, habitData[i].score[j]);
            }
            // console.log("onclick: (day, habitN)", j % 7, i);
            habitSpan.onclick = () => {showSummary(j % 7, i);};
            habitRow.append(habitSpan);
        }
        habitGrid.append(habitRow);
    }
}

function createBooleanCell(day, habitN, score) {
    let span = document.createElement('span');

    if (score === 0) {
        span.classList.add("incomplete");
    } else if (score < 0) {
        span.style.background = "var(--striped-background-" + habitN;
        span.classList.add("day-off");
    } else {
        span.style.background = "var(--habit-" + habitN;
        span.classList.add("complete");
    }
    return span;
}

function createNumericCell(day, habitN, score, dGoal) {
    let backgroundStyle = score >= 0 ? "var(--habit-" + habitN : "var(--striped-background-" + habitN;
    let span = document.createElement('span');

    if (score % dGoal === 0) {
        span.classList.add("complete");
        span.style.background = backgroundStyle;
    } else {
        span.classList.add("incomplete");
        let innerSpan = document.createElement('span');
        innerSpan.style.background = backgroundStyle;
        innerSpan.style.height =  Math.floor((score / dGoal) * 100) + "%";
        innerSpan.classList.add("complete");
        innerSpan.classList.add("partial");
        span.append(innerSpan);
    }
    return(span)
}

function createPicker(habitData, pickerContainerDiv, nHabits) {
    // find out the longest amount of records for all habits to get picker width
    let nDays = habitData.map(x => x.score.length).reduce((a, b) => Math.max(a, b));

    // get picker div
    let pickerDiv = document.querySelector(".picker");
    let weekArray = [];
    for (let i = 0; i < nDays; i++) {
        // for each day
        let pickerColDiv = document.createElement('div');
        pickerColDiv.classList.add("picker-col");
        for (let j = 0; j < nHabits; j++) {
            // for each habit
            let pickerCellDiv = document.createElement('div');
            pickerCellDiv.classList.add("picker-cell");
            pickerCellDiv.onclick = () => {renderNewWeek(habitData, i, 7)}; //TODO: fix this to not be hard coded

            // color square based on data
            let cellScore = habitData[j].score[i];
            if(cellScore < 0) {
                pickerCellDiv.style.background = "var(--habit-" + j + ")";
                pickerCellDiv.style.opacity = "0.4";
                pickerCellDiv.style.border = "1px solid var(--habit-" + j + ")";
            } else if (cellScore === 0) {
                pickerCellDiv.style.background = "var(--my-white)";
                pickerCellDiv.style.border = "1px solid var(--my-white)";
            } else
            {
                pickerCellDiv.style.background = "var(--habit-" + j + ")";
                pickerCellDiv.style.border = "1px solid var(--habit-" + j + ")";
            }

            pickerColDiv.append(pickerCellDiv);
        }
        weekArray.push(pickerColDiv);

        // group 7 days into a week div
        if (i % 7 === 6) {
            let weekDiv = document.createElement('div');
            weekDiv.classList.add("picker-week");
            weekDiv.onmouseover = () => {onPickerMouseOver(Math.floor(i / 7))};
            weekDiv.onmouseout = () => {onPickerMouseOut(Math.floor(i / 7))};

            for (let col of weekArray) {
                weekDiv.append(col);
            }
            weekArray = [];
            pickerDiv.append(weekDiv);
        }
    }
    pickerContainerDiv.append(pickerDiv);
}

function onPickerMouseOver(week) {
    // console.log("MOUSEOVER: ", week);
    let labelDivs = document.querySelectorAll(".picker-label");
    labelDivs[week].innerHTML = "" + ((week * 7) + 1);
    labelDivs[week + 1].innerHTML = "" + ((week + 1) * 7);
}

function onPickerMouseOut(week) {
    // console.log("MOUSEOVER: ", week);
    let labelDivs = document.querySelectorAll(".picker-label");
    labelDivs[week].innerHTML = "";
    labelDivs[week + 1].innerHTML = "";
}

function renderNewWeek(habitData, day, nDays) {
    // create habit grid for the first of the week
    let week = Math.floor(day / 7);
    createDateRow((week*7) + 1, nDays);
    createHabitGrid(habitData, (week*7), nDays); // TODO: when outline changes by day, change week*7 to day
}

function showSummary(day, habitN) {
    /*
        showSummary(int, int)
        day can be null if habit label is clicked (not a cell in the grid)
        habitN can be null if a day label is clicked
    */

    let habitSummaryNodes = document.querySelectorAll('.habit-summary');
    let daySummaryNodes = document.querySelectorAll('.day-summary');

    let dayToggle = false;
    let habitToggle = false;

    /*
        Turn off summary if the same thing is clicked twice.
        If cell already shows both summaries, turn them off.
        If clicking a label and there no summary on the other axis, it's the 2nd click so turn off.
        See truth tables in img/toggle_cell_truth_tables.jpg
     */
    if (day !== null && habitN !== null) {
        if (habitSummaryNodes[habitN].innerText !== "" && daySummaryNodes[day].innerText !== "") {
            // console.log("clicked same cell, turn off summaries")
            dayToggle = true;
            habitToggle = true;
        }
    } else if (day === null) {
        // node list to array, then check if one of the day summaries are on
        let newCellSameRow = Array.from(daySummaryNodes).some((item) => item.innerText !== "");
        if (!newCellSameRow && habitSummaryNodes[habitN].innerText !== "") {
            // console.log("clicked habit label with no day summaries on, turn off habit summary")
            habitToggle = true;
        }
    } else if (habitN === null) { // day label clicked
        // node list to array, then check if one of the habit summaries are on
        let newCellSameRow = Array.from(habitSummaryNodes).some((item) => item.innerText !== "");
        if (!newCellSameRow && daySummaryNodes[day].innerText !== "") {
            // console.log("clicked day label with no habit summaries on, turn off habit summary")
            dayToggle = true;
        }
    }

    // clear all results
    habitSummaryNodes.forEach((item) => item.innerText = "");
    daySummaryNodes.forEach((item) => item.innerText = "");

    // show results
    if (habitN !== null && !habitToggle) {
        habitSummaryNodes[habitN].innerText = "TEMP";
    }
    if (day !== null && !dayToggle) {
        daySummaryNodes[day].innerText = "TEMP";
    }
}

fetchAndRender();

