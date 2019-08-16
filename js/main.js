function showSummary(day, habitN) {
    console.log("show summary fn");

    /*
        showSummary(int, int)
        day can be null if habit label is clicked (not a cell in the grid)
        habitN can be null if a day label is clicked
    */

    let habitSummaryNodes = document.querySelectorAll('.habit-summary');
    let daySummaryNodes = document.querySelectorAll('.day-summary');

    let dayToggle = false;
    let habitToggle = false;
    if (day !== null && habitN !== null) {
        if (habitSummaryNodes[habitN].innerText !== "" && daySummaryNodes[day].innerText !== "") {
            console.log("clicked same cell, turn off summaries")
            dayToggle = true;
            habitToggle = true;
        }
    } else if (day === null) {
        // node list to array, then check if one of the day summaries are on
        let newCellSameRow = Array.from(daySummaryNodes).some((item) => item.innerText !== "");
        console.log(newCellSameRow);
        if (!newCellSameRow && habitSummaryNodes[habitN].innerText !== "") {
            console.log("clicked habit label with no day summaries on, turn off habit summary")
            habitToggle = true;
        }
    } else if (habitN === null) { // day label clicked
        // node list to array, then check if one of the habit summaries are on
        let newCellSameRow = Array.from(habitSummaryNodes).some((item) => item.innerText !== "");
        console.log(newCellSameRow);
        if (!newCellSameRow && daySummaryNodes[day].innerText !== "") {
            console.log("clicked day label with no habit summaries on, turn off habit summary")
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


function showSummary2(day, habitN) {
    console.log("showSummary fn");



    // get all the flexbox items for each summary
    let habitSummaryNodes = document.querySelectorAll('.habit-summary');
    let daySummaryNodes = document.querySelectorAll('.day-summary');


    /* onClick
       - turn everything off
       - turn on the summary of the row/col clicked
       - if user clicked the same thing a 2nd time, don't turn on (must check before turning everything off)

       Toggle: turn off if it's already on
            (1) If user clicked the same cell or label, it should turn summary(ies) off (ie toggle = true)
            (2) if user clicked same row but new cell, row summary should not turn off (toggle = false)
            (3) if user clicked same col but new cell, col summary should not turn off (toggle = false)
    */

    // (1)
    // Habit summary is on, turn it off
    let habitToggle = false;
    if (habitN != null) {
        console.log(1)
        if (habitSummaryNodes[habitN].innerText !== "") {
            habitToggle = true;
        }
    }

    // (1)
    //
    let dayToggle = false;
    if (day != null) {
        console.log(2);
        if (daySummaryNodes[day].innerText !== "") {
            dayToggle = true;
        }
    }

    // if same different cell but same row or col is clicked, don't toggle the one that's already on
    if (day != null && habitN != null) {
        if (habitSummaryNodes[habitN].innerText !== "" && daySummaryNodes[day].innerText === "") {
            // (2) different day, same habit
            console.log(2);
            habitToggle = false;
        } else if (daySummaryNodes[day].innerText !== "" && habitSummaryNodes[habitN].innerText === "") {
            // (3) different habit, same day
            console.log(3);
            dayToggle = false;
        }
    }

    // habit label clicked with habit summary already on
    if (day === null) {
        // node list to array, then check if one of the day summaries are on
        let newCellSameRow = Array.from(daySummaryNodes).some((item) => item.innerText !== "");
        if (newCellSameRow) {
            // this will be true bc habit summary is on and so should toggle, but not in this case so don't toggle
            habitToggle = false;
        }
    }

    // day label clicked with day summary already on
    if (habitN === null) { // day label clicked
        // node list to array then check if one of the habit summaries are on
        let newCellSameRow = Array.from(habitSummaryNodes).some((item) => item.innerText !== "");
        if (newCellSameRow) {
            // this will be true bc day summary is on and so should toggle, but not in this case so don't toggle
            dayToggle = false;
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