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

    /*
        Turn off summary if the same thing is clicked twice.
        If cell already shows both summaries, turn them off.
        If clicking a label and there no summary on the other axis, it's the 2nd click so turn off.
        See truth tables in img/toggle_cell_truth_tables.jpg
     */
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