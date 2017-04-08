var PathFinder = require("./algorithm");
var Grid = require("./grid");
var assert = require("assert");


describe("The Grid", function(){

	var grid;

	beforeEach(function(){
		grid = new Grid(10, 10, [
			{x: 5, y: 5}, 
			{x: 5, y: 6}, 
			{x: 5, y: 7}]
			)
	})

	it("should hold a list of 100 nodes", ()=>{
		assert.equal(grid.nodes.length, 100)
	})

	it("should generate nodes with x, y and walkable properties")
	it("should be able to return a node through coordinates")
})