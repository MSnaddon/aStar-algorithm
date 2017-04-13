const Score = function(h, g, origin){
	this.h = h;
	this.g = g
	this.f = h + g
	this.originNode = origin;
}

module.exports = Score;
