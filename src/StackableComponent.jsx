import React from "react";
import {StackAbstract} from 'builders';

export default class StackableComponent extends StackAbstract{
	constructor(props){
		super(props);
	}

	render(){
		super.render();
		return (
			<div className={this.props.className}>
				{this.props.children}
			</div>
		);
	}
}