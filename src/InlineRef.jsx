import React from "react";
import {StackAbstract, Stack, stackManager, Blockquote, CodeBlock} from 'builders';

export default class InlineRef extends StackAbstract{
	constructor(props){
		super(props);
		this.inlineFnCallback = this.inlineFnCallback.bind(this);
		this.refFnCallback = this.refFnCallback.bind(this);
		this.state ={
			renderCount:0
		}
	}

	inlineFnCallback(domNode){
		const domStatus = domNode ? "Dom" : "null";
		this.pushStackMessage(this.props.identifier,'Inline Ref: ' +  domStatus, 'callback', true);
	}

	refFnCallback(domNode){
		const domStatus = domNode ? "Dom" : "null";
		this.pushStackMessage(this.props.identifier,'Function Ref: ' +  domStatus, 'callback', true);
	}



	render(){
		super.render();
		const ui1 = "<div ref={(domeNode) => {this.inlineFnCallback(domeNode)}}>Inline Function </div> \n<div ref={this.refFnCallback}>Function Reference </div>";
		return (
			<div>
				<div ref={(domeNode) => {this.inlineFnCallback(domeNode)}}></div>
				<div ref={this.refFnCallback}></div>
				<div className="description">
					<Blockquote>
						<CodeBlock language="html">
							{ui1}
						</CodeBlock>
					</Blockquote>
					<div className="vr"/>
					<button onClick={()=>{this.setState({renderCount:this.state.renderCount++})}}>Render Again</button>
				</div>
				<Stack identifier={this.props.identifier}/>
			</div>
		);
	}
}


