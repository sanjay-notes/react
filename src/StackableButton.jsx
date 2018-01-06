import React from "react";
import {StackAbstract, Stack, Blockquote, Block} from 'builders';


export default class StackableButton extends StackAbstract{
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
				<div className="description">
					<Blockquote>
						<h4>Mouse Event Order</h4>
						<div>MouseDown - Focus - MouseUp - Click - Blur (Chrome)</div>
						<div>MouseDown - <strike>Focus</strike> - MouseUp - Click - <strike>Blur</strike> (Safari)</div>
					</Blockquote>
					<div className="vr"/>
					<button
						onMouseDown={this.handleOnMouseDown}
						onMouseUp={this.handleOnMouseUp}
						onFocus={this.handleOnFocus}
						onBlur={this.handleOnBlur}
						onClick={this.handleOnClick}>
						Button
					</button>
				</div>
				<Stack identifier={this.props.identifier}/>
			</div>
		);
	}
}


