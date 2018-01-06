import React from "react";
import {StackAbstract, Stack, stackManager, Block, Blockquote} from 'builders';
import StackableComponent from './StackableComponent';

export default class ParentChild extends StackAbstract{
	constructor(props){
		super(props);
	}

	render(){
		super.render();
		return (
			<div>
				<StackableComponent identifier="Child1"></StackableComponent>
				<StackableComponent identifier="Child2"></StackableComponent>
				<div className="description">
					<Blockquote>
						Order of Rendering
					</Blockquote>
					<div className="vr"/>
					<Block htmlType="div">
						<div className="description">
						<Block htmlType="div" color="#ab7718">Child 1</Block>
						<Block htmlType="div" color="#ab7718">Child 2</Block>
						</div>
					</Block>
				</div>
				<Stack identifier={[this.props.identifier, 'Child1', 'Child2']}/>
			</div>
		);
	}
}




