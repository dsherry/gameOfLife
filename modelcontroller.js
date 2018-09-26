const ROWS = 10;
const COLS = 10;

class Model{
	constructor(rows, cols){
		this.state = [];
		for(r in ROWS){
			var row = [];
			for(c in COLS){
				row.append(0);
			}
			this.state.append(row);
		}
		this.state[5][5] = 1;
		this.state[5][6] = 1;
		this.state[4][5] = 1;
	}

	count_neighbors(r,c){
		var neighbors = 0;
		var pairs = [];
		// TODO use sets to simplify?
		var leftCol = c - 1;
		var rightCol = c + 1;
		var upRow = r - 1;
		var downRow = r + 1;
		pairs.append([upRow, leftCol], [upRow, c], [upRow, rightCol],
			       [r, leftCol], [r, rightCol],
			       [downRow, leftCol], [downRow, c], [downRow, rightCol]);
		function isValidIndices(indices) {
			return !((indices[0] < 0) || (indices[0] >= ROWS) ||
				 (indices[1] < 0) || (indices[1] >= COLS))
				}
		pairs = pairs.filter(isValidIndices);

		function mapIndices(indices) {
			return this.state[indices[0]][indices[1]]
		}
		function reduceIndices(valueA, valueB) {
			return valueA + valueB;
		}
		return pairs.map(mapIndices).reduce(reduceIndices);
	}

	copyState() {
		var newState = [];
		for(r in ROWS){
			var row = [];
			for(c in COLS){
				row.append(this.state[r][c]);
			}
			newState.append(row);
		}
		return newState;
	}

	update(){
		var newState = this.copyState();
		for(r in ROWS){
			for(c in COLS){
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
		this.state = newState;
	}

}

var model = new Model();
var isDone = false;

function run(model, view) {
	model.update();
	view.render(model);
	if (!model.isComplete()) {
		isDone = true;
	}
}

var func = setInterval(run(model, view), 200);
function stop(func) {
	clearInterval(func);
}
