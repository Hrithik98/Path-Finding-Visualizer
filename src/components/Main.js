import React from 'react'
import Node from './Node'
import {dijikstra, getShortestPath} from './algos/Dijikstra'
import {dfs} from './algos/dfs'


class Main extends React.Component{
	constructor(){
		super()
		this.state = {
			start_x : 0,
			start_y : 0,
			finish_x : 24,
			finish_y : 49,
			grid :[],
		}
		this.isPressed = false
		this.setStart = this.setStart.bind(this)
		this.handleMouseDown = this.handleMouseDown.bind(this)
		this.handleMouseEnter = this.handleMouseEnter.bind(this)
	}

	componentDidMount(){
		var g = this.createGrid()
		this.setState({grid : g})
	}

	handleMouseDown(x,y){
		var ug = this.toggleWalls(x,y)
		this.isPressed = true
		this.setState({grid : ug})
	}

	handleMouseEnter(x,y){
		if(!this.isPressed) return
		var ug = this.toggleWalls(x,y)
		this.setState({grid : ug})
	}

	handleMouseUp(){
		this.isPressed = false
	}

	setStart(){
		var x = document.getElementById('start_x').value
		var y = document.getElementById('start_y').value
		if(x< 0) x=0
		if(x >= this.state.grid.length) x = this.state.grid.length-1
		if(y< 0) y=0
		if(y >= this.state.grid[0].length) y = this.state.grid[0].length-1
		this.setState({start_x : x,
						start_y : y},() => {var ug = this.createGrid()
											this.setState({grid : ug})})
		
	}

	setFinish(){
		var x = document.getElementById('finish_x').value
		var y = document.getElementById('finish_y').value
		if(x< 0) x=0
		if(x >= this.state.grid.length) x = this.state.grid.length-1
		if(y< 0) y=0
		if(y >= this.state.grid[0].length) y = this.state.grid[0].length-1
		this.setState({finish_x : x,
					finish_y : y},() => {
						var ug = this.createGrid()
						this.setState({grid : ug})})
		
	}

	visualizeDijikstra(){
		const {grid, start_x, start_y, finish_x, finish_y} = this.state
		var startNode = grid[start_x][start_y]
		var finishNode = grid[finish_x][finish_y]
		const visitedNodes = dijikstra(grid,startNode, finishNode)
		const shortestPath = getShortestPath(finishNode)
		this.animateDijikstra(visitedNodes, shortestPath)
	}

	visualizeDFS(){
		const {grid, start_x, start_y, finish_x, finish_y} = this.state
		var startNode = grid[start_x][start_y]
		var finishNode = grid[finish_x][finish_y]
		const visitedNodes = dfs(grid,startNode, finishNode)
		const shortestPath = getShortestPath(finishNode)
		this.animate(visitedNodes, shortestPath)
	}

	animate(visitedNodes, shortestPath){
		for(let i=0;i<=visitedNodes.length;i++){
			if(i===visitedNodes.length){
				setTimeout(() => {
					this.animateShortestPath(shortestPath);
				},10*i);
				return;
			}
			setTimeout(() => {
			const node = visitedNodes[i];
			document.getElementById(`node-${node.x}-${node.y}`).className='node node-visited';
			},10*i);
		}
	}

	animateShortestPath(shortestPath){
		for(let i=0;i<shortestPath.length;i++){
			setTimeout(()=> {
				const node=shortestPath[i];
				document.getElementById(`node-${node.x}-${node.y}`).className ='node node-shortest-path';
			},100*i);
		}
	}

	render(){
		var displayGrid = this.state.grid.map((single_row, rowIdx) => {
			return <div key={rowIdx}>{single_row.map( (node, nodeIdx ) => <Node  key={nodeIdx}
															node={node} 
															handleMouseDown={(x,y) => this.handleMouseDown(x,y)}
															handleMouseEnter={(x,y) => this.handleMouseEnter(x,y)} 
															handleMouseUp={() => this.handleMouseUp()}/>)}
			<br /></div> //
		})

		return(
			<div style={{textAlign: 'center'}}>
			<div style={{textAlign : 'center', border : '2px solid black', display : 'inline-block', 
										float : 'left', marginTop : '20px'}}>
				<div id='form' >
					Start : 
					<input type="number" id="start_x" placeholder="X" style={{width : '30px', borderRadius : '5px', padding : '2px', margin : '3px'}} />
					<input type="number" id="start_y" placeholder="Y" style={{width : '30px', borderRadius : '5px', padding : '2px', margin : '3px'}} />
					<button style={{borderRadius : '5px'}} onClick={() => {this.setStart()}}>Set</button><br />
					Finish : 
					<input type="number" id="finish_x" placeholder="X" style={{width : '30px', borderRadius : '5px', padding : '2px', margin : '3px'}} />
					<input type="number" id="finish_y" placeholder="Y" style={{width : '30px', borderRadius : '5px', padding : '2px', margin : '3px'}} />
					<button style={{borderRadius : '5px'}} onClick={() => {this.setFinish()}}>Set</button><br /> 
				</div><br />
				<div style={{display : 'inline-block'}}>
					<button style={{borderRadius : '5px'}} onClick={() => {this.visualizeDijikstra()}}> Visualize Dijikstra's Algorithm</button>
				</div><br /><br />
				<div style={{display : 'inline-block'}}>
					<button style={{borderRadius : '5px'}} onClick={() => {this.visualizeDFS()}}> Visualize Depth First Search</button>
				</div>
			</div>
				<div style={{border : '2px solid black',
								borderTop : '2.5px solid black',
								display : 'inline-block', 
								height : '447px',
								marginTop : '20px'}}>
					<div style={{marginTop : '2.5px'}}>{displayGrid}</div>   
				</div>
			</div>//
		)
	}

	createGrid(){
		var grid =[]
		for(var i=0; i<25; i++){ 
			var single_row = []
			for(var j=0; j<50;j++){
				 single_row.push(this.createNode(i,j))
			}
			grid.push(single_row)
		}
		return grid
	}

	toggleWalls(x,y){
		var newGrid = this.state.grid.slice()
		var nodeToToggle = this.state.grid[x][y]
		newGrid[x][y] = {
			...nodeToToggle,
			isWall : !nodeToToggle.isWall
		}
		return newGrid
	}

	createNode(row,col){
		return{
			x : row,
			y : col,
			isStart : (row == this.state.start_x) && (col == this.state.start_y) ,
			isFinish : (row == this.state.finish_x) && (col == this.state.finish_y),
			isWall : false,
			distance : Infinity,
			isVisited : false,
			previousNode : null
		}
	}

}

export default Main