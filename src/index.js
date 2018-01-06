import React from "react";
import { render } from "react-dom";
import {StackAbstract, Stack, stackManager} from 'builders';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StackableButton from './StackableButton';
import InlineRef from './InlineRef';
import ParentChild from './ParentChild';
import ReactComponent from './ReactComponent';
import DivInPara from './DivInPara';
import './app.css';



class App extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <Tabs>
                    <TabList>
                        <Tab>Inline Div in Para</Tab>
                        <Tab>Life Cycle</Tab>
                        <Tab>Parent Child</Tab>
                        <Tab>Ref</Tab>
                        <Tab>Mouse Event</Tab>
                    </TabList>
                    <TabPanel>
                        <DivInPara identifier="DivInPara"/>
                    </TabPanel>
                    <TabPanel>
                        <ReactComponent identifier="React"/>
                    </TabPanel>
                    <TabPanel>
                        <ParentChild identifier="Parent"/>
                    </TabPanel>
                    <TabPanel>
                        <InlineRef identifier="ref"/>
                    </TabPanel>
                    <TabPanel>
                        <StackableButton identifier="Button"/>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }

}


render((<App></App>), document.getElementById("app"));

