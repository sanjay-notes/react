import React from "react";
import {StackAbstract, Stack, stackManager, Block, Blockquote} from 'builders';

export default class ReactComponent extends StackAbstract{
	constructor(props){
		super(props);
		this.state = {
			renderCount: 0
		}
	}

	render(){
		super.render();
		return (
			<div>
				<div className="description">
					<Blockquote>
						React Life Cycle Method order
					</Blockquote>
					<div className="vr"/>
					<Block htmlType="div" color="#ab7718">
						<button onClick={()=>{this.setState({renderCount:this.state.renderCount++})}}>Render Again</button>
					</Block>
				</div>
				<Stack identifier={this.props.identifier}/>
			</div>
		);
	}
}




