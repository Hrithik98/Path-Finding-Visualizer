export function dijikstra(grid, startNode, finishNode){
	var visited = []
	startNode.distance=0
	var unvisited = getAllNodes(grid)
	while(unvisited.length){
		unvisited.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
		const closestNode = unvisited.shift()
		if(closestNode.isWall) continue
		if(closestNode.distance === Infinity) return visited
		closestNode.isVisited = true
		visited.push(closestNode)
		if(closestNode === finishNode) return visited
		updateUnvisitedNeighbours(grid, closestNode)
	}
	return visited
}


function getAllNodes(grid){
	var nodes = []
	for(var i=0; i<25;i++){
		for(var j=0;j<50;j++){
			nodes.push(grid[i][j])
		}
	}
	return nodes
}

function updateUnvisitedNeighbours(grid, node){
	const unVisitedNeighbours = getUnvisitedNeighbours(grid,node)
	for(const neighbour of unVisitedNeighbours){
		neighbour.distance = node.distance+1
		neighbour.previousNode = node
	}
}

function getUnvisitedNeighbours(grid, node){
	const neighbors=[];
	const {y, x} = node;
	if (x > 0) neighbors.push(grid[x - 1][y]);
	if (x < grid.length - 1) neighbors.push(grid[x + 1][y]);
	if (y > 0) neighbors.push(grid[x][y - 1]);
	if (y < grid[0].length - 1) neighbors.push(grid[x][y + 1]);
	return neighbors.filter(neighbor => !neighbor.isVisited);
}

export function getShortestPath(finishNode){
	var shortestPath = []
	var node = finishNode
	while(node !== null){
		shortestPath.unshift(node)
		node = node.previousNode
	}
	return shortestPath
}

