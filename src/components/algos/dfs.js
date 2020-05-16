export function dfs(grid, startNode, finishNode){
	var visited = []
	var stack = []
	stack.push(startNode)
	while(stack.length){
		var node = stack.pop()
		node.isVisited = true
		visited.push(node)
		if(node === finishNode) return visited
		var unVisitedNeighbours = getUnvisitedNeighbours(grid,node)
		for(var n of unVisitedNeighbours) {
			if(!n.isWall){
				stack.push(n)
				n.previousNode = node
			}
		}
	}
	return visited
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