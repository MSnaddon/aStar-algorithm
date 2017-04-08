//nodes should be an objects in itself as prototype methiods are likely to be needed.
const Node = require("./node")
const Path = require("./path")

var Grid = function( length, height, obstacles ){
	this.limits = { x: length, y: height}
	this.nodes = this.genNodes( length, height );
	this.genObstacles(obstacles)
}

// public functions
Grid.prototype.getNode = function( x, y ){
	return this.nodes[x][y]
}

Grid.prototype.getNeighbours = function(node){
	//deltas are calculated based on the grid limits. this is to ensure that the edges don't wrap


	let neighbours = [];
	for (delta of deltas){
		console.log(node.x*this.limits.x + node.y + delta)
		//cycle through the neighbours and push to array if they are defined.
		const neighbour = this.nodes[node.x*this.limits.x + node.y + delta]
		if(neighbour){
			neighbours.push(neighbour)
		}
	}
	return neighbours
	
}

Grid.prototype.genPath = function(start, end){

}

//private functions
Grid.prototype.genNodes = function( len, high ){
	const nodes = []
	for ( let x=0 ; x<len ; x++ ){
		let row = []
		for( let y=0 ; y<high ; y++ ){
			row.push( new Node( x, y, true) )
		}
		nodes.push(row)
	}
	return nodes
}

Grid.prototype.genObstacles = function(obstacles){
	for (noWalk of obstacles){
		this.getNode( noWalk.x, noWalk.y ).walk = false
	}
}



module.exports = Grid