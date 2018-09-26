function clickableGrid( rows, cols, callback ){
	var i=0;
	var grid = document.createElement('table');
	grid.className = 'grid';
	for (var r=0;r<rows;++r){
		var tr = grid.appendChild(document.createElement('tr'));
		for (var c=0;c<cols;++c){
			var cell = tr.appendChild(document.createElement('td'));
			var cellDiv = document.createElement('div');
			cellDiv.id = `cell_${r}_${c}`;
			cellDiv.className = 'gameCell';
			cell.appendChild(cellDiv);
			cell.addEventListener('click',(function(el,r,c,i){
				return function(){
					callback(el,r,c,i);
					}
				})(cell,r,c,i),false);
		}
	}
	return grid;
};

var grid = clickableGrid(10,10,function(el,row,col,i){});
console.log(document.getElementById('gridDiv'));
document.getElementById('gridDiv').appendChild(grid);
