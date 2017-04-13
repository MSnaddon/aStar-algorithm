const Score = require("./score")

const Path = function(start, goal, grid, limit){
	//start and goal are just coordinates, nodes recieved from grid during genPath. perhaps in later situations float coordinates would be handled in some fashion.
	this.start = start;
	this.goal = goal;
	this.nodeLimit = limit;
	this.route = this.genPath(grid);

}



//Path is simply an array of nodes from start to end.
Path.prototype.genPath = function(grid){
	let startNode = grid.getNode( this.start.x, this.start.y );
	let goalNode = grid.getNode( this.goal.x, this.goal.y );
	let limiter = this.nodeLimit;

	//start node has no origin, it's score needs to reflect it is the start (h=0)
	startNode.score = new Score( 0, this.getDistance( startNode, goalNode ), "origin" )

	let opened = [startNode]
	let closed = []

	while( limiter>0 ){
		//find the node lowest f (then g).
		const scanNode = this.sortByScores(opened)[0];
		//if end node is goal, return the trace
		// console.log(scanNode)
		if ( goalNode === scanNode ){ return this.getTrace(scanNode) }
		//get neighbours of scan node
		const neighbours = grid.getNeighbours(scanNode)
		.filter( ( node )=>{
			if ( !node.walk ){ return false }
			if ( closed.indexOf(node) === -1 ) { return true }
			return false
		})
		.forEach(( node )=>{
			const newNodeScore = this.calculateScores(node, scanNode, goalNode)
			if( !node.score || newNodeScore.h <= node.score.h ) {
				node.score = newNodeScore;
			}
			if( opened.indexOf(node) === -1 ) {
				opened.push(node)
			}
		});
		
		closed.push(opened.splice( 0, 1 )[0]); // scanNode is now closed
		limiter --
	}

	return "Node limit reached"
}

Path.prototype.sortByScores = function(openedNodes){
	openedNodes.sort((nodeA, nodeB)=>{
		let scoreA = nodeA.score ; let scoreB = nodeB.score;
		//check if f score is equal, check g score. if gs are equal, doesn't matter.
		if(scoreA.f == scoreB.f){ return scoreA.g - scoreB.g || 1}
		return (scoreA.f - scoreB.f)
	})
	return openedNodes

}

Path.prototype.getTrace = function(goalNode){
	const route = [goalNode]
	let traceNode = route[0]
	let limiter = 20
	while(traceNode.score.originNode !== "origin" && limiter > 0){
		route.unshift(traceNode.score.originNode)
		traceNode = route[0]
		limiter --
	}
	return route
	//if current node's origins are not itself, unshift the origin into the route. 
}

Path.prototype.calculateScores = function(queryNode, origin, goalNode){
	//calculate h by adding queryNode's distance to origin's h score.

	const h = origin.score.h + this.getDistance(queryNode, origin);
	//calculate g by getting distance to goalNode
	const g = this.getDistance(queryNode, goalNode);
	// return scores object
	return new Score(h, g, origin)

}

Path.prototype.getDistance = function(nodeA, nodeB){
	// sqrt of delta x ^2 + delta y ^2
	const deltaX = nodeA.x - nodeB.x;
	const deltaY = nodeA.y - nodeB.y;

	return Math.sqrt( Math.pow(deltaX, 2) + Math.pow(deltaY, 2) );
}

module.exports = Path;
