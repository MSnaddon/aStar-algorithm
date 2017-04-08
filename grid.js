//nodes should be an objects in itself as prototype methiods are likely to be needed.

var Grid = function( length, height, obstacles ){
	this.nodes = this.genNodes( length, height );
}

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
	return {
		x: x, 
		y: y, 
		walk: true
	}
}

module.exports = Grid