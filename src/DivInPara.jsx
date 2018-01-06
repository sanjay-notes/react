import React from "react";
import {StackAbstract, Stack, stackManager, Block, Blockquote} from 'builders';
import StackableComponent from './StackableComponent';

export default class DivInPara extends StackAbstract{
	constructor(props){
		super(props);
		this.state = {
			addDiv: false
		}
	}

	render(){
		super.render();
		const buttonName = this.state.addDiv ? "Remove Inline Div" : "Add Inline Div";
		const ui = this.state.addDiv ? <StackableComponent className="inlineDiv" identifier="Inline-Div"> 2. Inline Div </StackableComponent>: null;
		return (
			<div>
				<div className="description">
					<Blockquote>
						<ol>
							<li>Div inside para will be parsed as "para followed by div" (See above in DOM container)</li>
							<li>Since Browser applies CSS after DOM parse, setting DIV as inline is no use</li>
							<li>Where as in react it works?  </li>
							<li>May be react creates its virtual DOM considering its CSS values </li>
							<li>(The Virtual DOM is an abstraction of the HTML DOM. It is lightweight and detached from the browser-specific implementation details)</li>
						</ol>

					</Blockquote>
					<div className="vr"/>
					<div>
						<Block htmlType="p" color="#ab7718">
							<p>1.Text {ui} 3.Text</p>
						</Block>
						<Block htmlType="div" color="#ab7718">
							<button onClick={()=>{this.setState({addDiv:!this.state.addDiv})}}>{buttonName}</button>
						</Block>
					</div>
				</div>
				<Stack identifier={[this.props.identifier, 'Inline-Div' ]}/>
			</div>
		);
	}
}




