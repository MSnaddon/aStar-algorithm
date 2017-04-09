var Path = require("./path")
var Grid = require("./grid");
var assert = require("chai").assert;

// grid mapping tests
describe("The Grid", function(){

	let grid;
	let staightPath; let diagonalPath; let blockedPath;
	const obstacles = [
		{x: 5, y: 5}, 
		{x: 5, y: 6}, 
		{x: 5, y: 7}];

	beforeEach(()=>{
		grid = new Grid( 12, 12, obstacles	);
	})

	it("should hold a list of 144 nodes", ()=>{
		assert.equal( grid.nodes.length, 12 )
		assert.equal( grid.nodes[0].length, 12 )

	})

	it("should generate nodes with x, y and walkable properties", ()=>{
		assert.equal( grid.nodes[4][0].x, 4 )
		assert.equal( grid.nodes[4][0].y, 0 )
		assert.equal( grid.nodes[3][2].walk, true )
	})

	it("should be able to return a node through coordinates", ()=>{
		const node = grid.getNode( 4, 6 );
		assert.equal( node.x, 4 );
		assert.equal( node.y, 6 );
		assert.equal( node.walk, true );
	})

	it("should render obstables unwalkable", ()=>{
		const noWalk = [ grid.getNode(5, 5), grid.getNode(5,6) ];
		assert.equal( noWalk[0].walk, false );
		assert.equal( noWalk[1].walk, false );
	})

	it("should be able to return a node's neighbours", ()=>{
		const node = grid.getNode( 6, 7 );
		const neighbours = grid.getNeighbours( node )
		for ( neighbour of neighbours ){
			//format of closeTo is (actual, expected, delta)
			assert.closeTo( neighbour.x, 6, 1 )
			assert.closeTo( neighbour.y, 7, 1 )
		}
	})

	it("should only return valid neighbours", ()=>{
		const edgeNeighbours = grid.getNeighbours( grid.getNode( 0, 7 ) )
		const cornerNeighbours = grid.getNeighbours( grid.getNode( 0, 0 ) )
		assert.equal(edgeNeighbours.length, 5)
		assert.equal(cornerNeighbours.length, 3)
	})

	// straightPath = grid.generatePath( {x: 3, y: 3}, {x: 3, y: 6} )
	// diagonalPath = grid.generatePath( {x: 0, y: 0}, {x: 4, y: 4} )
	// blockedPath = grid.generatePath( {x: 2, y: 7}, {x: 7, y: 6} )
})
