//nodes should be an objects in itself as prototype methiods are likely to be needed.
const Node = require("./node")

var Grid = function( length, height, obstacles ){
	this.limits = { x: length, y: height}
	this.nodes = this.genNodes( length, height );
	this.genObstacles(obstacles)
}

// public functions
Grid.prototype.getNode = function( x, y ){
	return this.nodes[x*10 + y]
}

//private functions
Grid.prototype.genNodes = function( len, high ){
	const nodes = []
	for ( let x=0 ; x<len ; x++ ){
		for( let y=0 ; y<high ; y++ ){
			nodes.push( this.makeNode( x, y ) )
		}
	}
	return nodes
}

Grid.prototype.makeNode = function( x, y ){
	// console.log(`new node x:${x} y:${y}`)

	return ( new Node( x, y, true) )
}

Grid.prototype.genObstacles = function(obstacles){
	for (noWalk of obstacles){
		this.getNode( noWalk.x, noWalk.y ).walk = false
	}
}

module.exports = Grid