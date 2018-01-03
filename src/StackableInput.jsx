import React from "react";
import {StackAbstract, Stack, Block} from 'builders';


export default class StackableInput extends StackAbstract{
	constructor(props){
		super(props);

		this.state = {
			mouseDown: 0,
			focus: 0,
			mouseUp: 0,
			click: 0,
			blur: 0
		};

		this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
		this.handleOnFocus = this.handleOnFocus.bind(this);
		this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
		this.handleOnClick = this.handleOnClick.bind(this);
		this.handleOnBlur = this.handleOnBlur.bind(this);
		this.updateState = this.updateState.bind(this);
		this.setStateCallback = this.setStateCallback.bind(this);
	}

	updateState(key){
		const currentValue = this.state[key];
		var obj = {};
		obj[key]=currentValue+1;
		this.pushStackMessage(this.props.identifier,'setState', 'function', true);
		this.setState(obj,this.setStateCallback);
	}

	setStateCallback(){
		this.pushStackMessage(this.props.identifier,'setState', 'callback', true);
	}

	handleOnMouseDown(){
		this.pushStackMessage(this.props.identifier,'onMouseDown', 'event', true);
		this.updateState('mouseDown');
	}

	handleOnFocus(){
		this.pushStackMessage(this.props.identifier,'onFocus', 'event', true);
		this.updateState('focus');
	}

	handleOnMouseUp(){
		this.pushStackMessage(this.props.identifier,'onMouseUp', 'event', true);
		this.updateState('mouseUp');
	}


	handleOnClick(){
		this.pushStackMessage(this.props.identifier,'onClick', 'event', true);
		this.updateState('click');
	}

	handleOnBlur(){
		this.pushStackMessage(this.props.identifier,'onBlur', 'event', true);
		this.updateState('blur');
	}


	render(){
		super.render();
		return (
			<div>
				<Block>
					<div>Event Order: onMouseDown - onFocus - onMouseUp - onClick</div>
					<input
						onMouseDown={this.handleOnMouseDown}
						onMouseUp={this.handleOnMouseUp}
						onFocus={this.handleOnFocus}
						onBlur={this.handleOnBlur}
						onClick={this.handleOnClick}/>
				</Block>

				<Stack identifier={this.props.identifier}/>
			</div>
		);
	}
}


