const Score = function(h, g, origin){
	this.h = h;
	this.g = g
	this.f = h + g
	this.originNode = origin;
}



//Path is simply an array of nodes from start to end.


module.exports = Score;
