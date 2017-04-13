const Path = require("./path");
const Score = require("./score");
const Grid = require("./grid");

const assert = require("chai").assert;

// grid mapping tests
describe("The Grid", function(){

	let grid;
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

	

})

describe("A score", function(){
	let score = new Score(4,5);

	it("should hold an h and g", ()=>{
		assert.equal(score.h, 4)
		assert.equal(score.g, 5)
	})

	it("should add h and g to get f", ()=>{
		assert.equal(score.f, 9)
	})

})

describe("A Path", function(){

	let grid;
	let staightPath; let diagonalPath; let blockedPath;
	const obstacles = [
		{x: 5, y: 4},
		{x: 5, y: 5}, 
		{x: 5, y: 6}, 
		{x: 5, y: 7},
		{x: 5, y: 8},
		{x: 10, y: 10},
		{x: 11, y: 10},
		{x: 10, y: 11}
		];

	beforeEach(()=>{
		grid1 = new Grid( 12, 12, obstacles	);
		grid2 = new Grid( 12, 12, obstacles	);
		grid3 = new Grid( 12, 12, obstacles	);
		grid4 = new Grid( 12, 12, obstacles );
		straightPath = new Path( {x: 3, y: 3}, {x: 3, y: 6}, grid1 )
		diagonalPath = new Path( {x: 0, y: 0}, {x: 4, y: 4}, grid2 )
		blockedPath = new Path( {x: 2, y: 7}, {x: 7, y: 6}, grid3 )
		impossiblePath = new Path({x: 8, y: 6}, {x: 11, y: 11 }, grid4)
	})

	it("should generate a straight path from two points",()=>{
		assert.equal( straightPath.route[1].x, 3 );
		assert.equal( straightPath.route[1].y, 4 );
		assert.equal( straightPath.route[3].x, 3 );
		assert.equal( straightPath.route[3].y, 6 );
	})

	it("should generate a path diagonally", ()=>{
		assert.equal(diagonalPath.route.length, 5)
	})

	it("should generate a path round an obstacle", ()=>{
		// console.log(blockedPath.route)
		assert.equal(blockedPath.route.length, 7)
	})

	it("should return error if unable to find route", ()=>{
		assert.equal(impossiblePath.route, "Node limit Reached" )
	})
})