function render() {
    console.log("rendering!");

    let habitData = [
        {score: [6, 8, 6, 8, 8, 7, 7], type: 'number', title: "Sleep / 8 hrs", wGoal: 7, dGoal: 8},    // sleep
        {score: [0, -1, 1, 1, 1, -1, 1], type: 'boolean', title: "Cook at home", wGoal: 5, dGoal: 1},   // cook
        {score: [1, 1, 1, 1, 1, 1, 1], type: 'boolean', title: "Medication", wGoal: 7, dGoal: 1},   // meds
        {score: [1, 1, -1, 1, 1, 1, -1], type: 'boolean', title: "Exercise", wGoal: 5, dGoal: 1}    // exercise
    ];

    // Create habit labels
    let habitLabelDiv = document.querySelector('.labels');

    for (let i = 0; i < habitData.length; i++) {
        let span = document.createElement('span');
        span.textContent = habitData[i].title;
        span.onclick = () => {showSummary(null, i);};
        span.classList.add('habit-labels');
        // console.log(span, i);
        habitLabelDiv.append(span);
    }

    // Create Day row
    let dayNames = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    let dayHeaderRow = document.querySelector('#dayHeader');

    for (let i = 0; i < dayNames.length; i++) {
        let span = document.createElement('span');
        span.textContent = dayNames[i];
        span.onclick = () => {showSummary(i, null);};
        dayHeaderRow.append(span);
    }

    // Create date row
    let dateValues = [1, 2, 3, 4, 5, 6, 7];
    let dateStrings = dateValues.map(n => n < 10 ? '0' + n : '' + n);
    let dateHeaderRow = document.querySelector('#dateHeader');

    for (let i = 0; i < dateStrings.length; i++) {
        let span = document.createElement('span');
        span.textContent = dateStrings[i];
        span.onclick = () => {
            showSummary(i, null);
        };
        dateHeaderRow.append(span);
    }

    // Create habit grid
    createHabitGrid(habitData);

    // Create summary row
    let contentDiv = document.querySelector('.content');
    let daySummaryContainer = document.createElement('div');
    daySummaryContainer.classList.add("day-summary-container");
    for (let i = 0; i < habitData[0].score.length; i++) {
        let span = document.createElement('span');
        span.classList.add("day-summary");
        daySummaryContainer.append(span);
    }
    // console.log(daySummaryContainer);
    contentDiv.append(daySummaryContainer);

    // Create summary col
    let habitSummaryContainer = document.querySelector('.habit-summary-container');
    for (let i = 0; i < habitData.length; i++) {
        let span = document.createElement('span');
        span.classList.add("habit-summary");
        habitSummaryContainer.append(span);
    }
    // console.log(habitSummaryContainer);
}

function createHabitGrid(habitData) {
    let habitGrid = document.querySelector('.habit-grid');

    for (let i = 0; i < habitData.length; i++) {
        // Create habit row
        let habitRow = document.createElement('div');
        habitRow.classList.add("habit-row");

        for (let j = 0; j < habitData[i].score.length; j++) {
            // Create habit day cell
            let habitSpan = null;
            if (habitData[i].type === 'number') {
                // console.log(j, i, habitData[i].score[j], habitData[i].dGoal);
                habitSpan = createNumericCell(j, i, habitData[i].score[j], habitData[i].dGoal);
            } else {
                // console.log(j, i, habitData[i].score[j]);
                habitSpan = createBooleanCell(j, i, habitData[i].score[j]);
            }
            habitRow.append(habitSpan);
        }
        console.log("########## Row!", habitRow);
        habitGrid.append(habitRow);
    }
}

function createBooleanCell(day, habitN, score) {
    let span = document.createElement('span');
    span.onclick = () => {showSummary(day, habitN);};
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
    span.onclick = () => {showSummary(day, habitN);};

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

render();

