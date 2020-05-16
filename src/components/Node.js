import React from 'react'
import './Node.css'

function Node(props){
	var st = props.node.isStart ? "Start" :
			 props.node.isFinish ? "Finish" :
			 props.node.isWall ? "Wall" : ""
	return(
		<div 
			id={`node-${props.node.x}-${props.node.y}`}
				className={`node ${st}`}
			style={{backgroundColor : (st === "Start") ? 'green' : (st === "Finish") ? 'red' :  (st ==="Wall") && 'black',
					border : '2px solid black',
					width : '15px',
					height : '15px',
					display : 'inline-block',
					marginTop : '-5px'}}
					
					onMouseDown={() => props.handleMouseDown(props.node.x, props.node.y)}
					onMouseEnter={() => props.handleMouseEnter(props.node.x, props.node.y)}
					onMouseUp={() =>props.handleMouseUp()} >
		</div>
	)
}

export default Node