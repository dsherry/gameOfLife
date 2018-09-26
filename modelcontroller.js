/*jshint esversion: 6 */

import View from './view.js';

const ROWS = 10;
const COLS = 10;

class Model{
	constructor(rows, cols){
		this.state = [];
		for(var r=0;r<ROWS;r++){
			var row = [];
			for(var c=0;c<COLS;c++){
				row.push(0);
			}
			this.state.push(row);
		}
		this.state[5][5] = 1;
		this.state[5][6] = 1;
		this.state[4][5] = 1;

		this.isComplete = false;
	}

	count_neighbors(r,c){
		var neighbors = 0;
		// TODO use sets to simplify?
		var leftCol = c - 1;
		var rightCol = c + 1;
		var upRow = r - 1;
		var downRow = r + 1;
		var pairs = [[upRow, leftCol], [upRow, c], [upRow, rightCol],
			       [r, leftCol], [r, rightCol],
			       [downRow, leftCol], [downRow, c], [downRow, rightCol]];
		function isValidIndices(indices) {
			return !((indices[0] < 0) || (indices[0] >= ROWS) ||
				 (indices[1] < 0) || (indices[1] >= COLS));
				}
		pairs = pairs.filter(isValidIndices);

		function mapIndices(indices) {
			return this.state[indices[0]][indices[1]];
		}
		function reduceIndices(valueA, valueB) {
			return valueA + valueB;
		}
		return pairs.map(mapIndices).reduce(reduceIndices);
	}

	copyState() {
		var newState = [];
		for(var r=0;r<ROWS;r++){
			var row = [];
			for(var c=0;c<COLS;c++){
				row.push(this.state[r][c]);
			}
			newState.push(row);
		}
		return newState;
	}

	update(){
		var newState = this.copyState();
		for(var r in ROWS){
			for(var c in COLS){
				var num_neighbors = count_neighbors(r,c);
				if(model[r][c]){ // is alive
					if(num_neighbors <= 1){
						newState[r][c] = 0;
					}
					if(num_neighbors >= 4){
						newState[r][c] = 0;
					}
				}
				else{ // if dead
					if(num_neighbors == 3){
						newState[r][c] = 1;
					}
				}
			}
		}
		if(JSON.stringify(this.state) === JSON.stringify(newState)){
			this.isComplete = true;
		}
		this.state = newState;
	}
}


var view = new View(10,10);
debugger;
var model = new Model();
var isDone = false;

function run(model, view) {
	model.update();
	view.render(model);
}

var func = setInterval(run(model, view), 200);

while(true){
	if(model.isComplete){
		clearInterval(func);
	}
}
