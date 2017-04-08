var PathFinder = require("./algorithm");
var Grid = require("./grid");
var assert = require("assert");

// grid mapping tests
describe("The Grid", function(){

	var grid;
	const obstacles = [
		{x: 5, y: 5}, 
		{x: 5, y: 6}, 
		{x: 5, y: 7}];

	beforeEach(()=>{
		grid = new Grid( 10, 10, obstacles	);
	})

	it("should hold a list of 100 nodes", ()=>{
		assert.equal( grid.nodes.length, 100 )
	})

	it("should generate nodes with x, y and walkable properties", ()=>{
		assert.equal( grid.nodes[0].x, 0 )
		assert.equal( grid.nodes[4].y, 4 )
		assert.equal( grid.nodes[3].walk, true )
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
})

//PathFinder tests

describe("The PathFinder", function(){

	let grid;
	let staightPath; let diagonalPath; let blockedPath;
	const obstacles = [
		{x: 5, y: 5}, 
		{x: 5, y: 6}, 
		{x: 5, y: 7}];

	beforeEach(()=>{
		grid = new Grid( 12, 12, obstacles );
		straightPath = new PathFinder( {x: 3, y: 3}, {x: 6, y: 6} )
		diagonalPath = new PathFinder( {x: 0, y: 0}, {x: 4, y: 4} )
		blockedPath = new PathFinder( {x: 2, y: 7}, {x: 7, y: 6} )
	})

	it("should have starting coordinates")
	it("should have finishing coordinates")
	it("should hold ")

})