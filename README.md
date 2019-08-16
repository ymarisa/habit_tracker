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

Future: Monthly and weekly views, hover for numerical values.

## Grid and flex box
The main sections title, labels, content and habit summary are defined using grid.

Flexbox makes up the rows of habit data, day labels and day summary results, columns of habit labels and habit summary results.

See `img/grid_overview.jpg` for overview.
 
## Transition and Animation
Hover adds an opaque layer over the cell.

## Javascript
Onclick events for each cell, each row header, and each column header. Clicking a cell will show the row and/or col summaries. Clicking a second time turns summaries off.

Keeping track of when to toggle a summary on or off got tricky so I wrote out the truth tables. See `img/toggle_cell_truth_tables.jpg`. The highlighted cells are the conditions I wrote if statements for. 

Future: clicks will show summaries of results for day and habit instead of TEMP

## Directory structure

```
.
├── README.md
├── css
│   ├── reset.css
│   └── site.css
├── img
│   ├── grid_overview.jpg
│   ├── habit_tracker_wireframe_-_Google_Slides.jpg
│   └── toggle_cell_truth_tables.jpg
├── index.html
└── js
    └── main.js

```

## Future
* Monthly view
* Allow transition to other weeks
* Calculate and show row/col summaries
* Figure out a better way of spacing vertical labels other than line-height
* Fix cell borders - make it space between or something instead

