/*jshint esversion: 6 */

export default class View{
	constructor(rows, cols){
		this.initialize(rows,cols,function(el,row,col,i){});
	}

	initialize(rows, cols, callback ){
		var i=0;
		var grid = document.createElement('table');
		grid.className = 'grid';
		for (var r=0;r<rows;++r){
			var tr = grid.appendChild(document.createElement('tr'));
			for (var c=0;c<cols;++c){
				var cell = tr.appendChild(document.createElement('td'));
				var cellDiv = document.createElement('div');
				cellDiv.id = `cell_${r}_${c}`;
				cellDiv.className = 'gameCell dead';
				cell.appendChild(cellDiv);
				cell.addEventListener('click',(function(el,r,c,i){
					return function(){
						callback(el,r,c,i);
						};
					})(cell,r,c,i),false);
			}
		}
		document.getElementById('gridDiv').appendChild(grid);
	}

	render(model){
		for(var row in model.state){
			for(var col in model.state[row]){
				var cell = document.getElementById(`cell_${row}_${col}`);
				if(model.state[row][col]){
					if(cell.className !== 'gameCell alive'){
						cell.className = 'gameCell alive';
					}
				}else{
					if(cell.className !== 'gameCell dead'){
						cell.className = 'gameCell dead';
					}
				}
			}
		}
	}
}
