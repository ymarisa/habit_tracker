# habit_tracker
Deployed to GitHub Pages 
https://ymarisa.github.io/habit_tracker/

Github repo
https://github.com/ymarisa/habit_tracker

## What is habit tracker?
See your daily progress on habits. 

Takes numerical and boolean values.

Mark off days that don't count against your goal, they will show as striped.

Click a cell or row/header label to view a summary. Click again to toggle off.

Click a week to view from the picker at the bottom. 

Future: 
* Add/remove habits from main grid
* Handle incomplete data (eg a newer habit without the same depth of data)
* Show empty days for current week
    * Update data source by clicking on grid 

## Grid and flex box
The main sections title, labels, content, habit summary and picker container are defined using grid.

Flexbox makes up the rows of habit data, day labels and day summary results, columns of habit labels, habit summary results, the cols of picker days and rows of habit cells in the picker.
 
## Transition and Animation
Hovering over the grid adds an opaque layer over the cell.

Hovering over the week picker shows the weekly outlines with dates.

## Javascript
Data is retrieved from a JSON file in ```data```

Labels, main grid and week picker elements are generated based on habit data.

Onmouseover events are attached for each week in the week picker.

Onclick events for each main grid cell, each row header, and each column header. Clicking a cell will show the row and/or col summaries. Clicking a second time turns summaries off.

Keeping track of when to toggle a summary on or off got tricky so I wrote out the truth tables. See `img/toggle_cell_truth_tables.jpg`. The highlighted cells are the conditions I wrote if statements for. 

Future: clicks will show summaries of results for day and habit instead of TEMP

## Directory structure

```
.
├── README.md
├── css
│   ├── reset.css
│   └── site.css
├── data
│   └── data.json
├── img
│   ├── grid_overview.jpg
│   ├── habit_tracker_wireframe_-_Google_Slides.jpg
│   └── toggle_cell_truth_tables.jpg
├── index.html
└── js
    └── main.js

```

## Future
* Use date data, right now score data is just assigned a date
* Save new data to api
    * show empty days that can be filled in
* Improve layout, add descriptions 
* Multi-month view
* Calculate and show row/col summaries
* Figure out a better way of spacing vertical labels other than line-height
* Fix cell borders - make it space between or something instead
* Fix hard coded values, e.g. number of habits, length of week

## Known issues
* ```picker-label-container``` size is not right, so onmouseover event dates don't line up with the edge of the week's box on the first and last weeks