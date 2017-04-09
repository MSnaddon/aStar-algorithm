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
	//checks for row, then checks for column. if either don't exist, then undefined is returned.
	if( !this.nodes[x]) {return}
	return this.nodes[x][y]
}

Grid.prototype.getNeighbours = function(node){
	let neighbours = [];
	// builds pool of possible neighbours
	let candidates = [
		[node.x-1, node.y-1],
		[node.x, node.y-1],
		[node.x+1, node.y-1],
		[node.x-1, node.y],
		[node.x+1, node.y],
		[node.x-1, node.y+1],
		[node.x, node.y+1],
		[node.x+1, node.y+1],
	]
	for ( coord of candidates ){
		const node = this.getNode(coord[0], coord[1])
		if ( node ){ neighbours.push(node) }
	}
	
	return neighbours
	
}

//this shoudl technically be on a player object as it's his perception of the grid that should determine the pathing, not the grid itself. in this example things are simplified.
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
	// this can be expanded if obstacles can produce other effects.
	for (noWalk of obstacles){
		this.getNode( noWalk.x, noWalk.y ).walk = false
	}
}



module.exports = Grid