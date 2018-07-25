import React, { Component } from 'react';
import ipfs from '../../util/ipfs';
import web3 from '../../util/web3v1';

class ShowTask extends Component{
    constructor(props) {
        super(props);
		
		this.state = { 
			delegatedUncompletedTasks: "",
			delegatedUnverifiedTasks: "",
			delegatedVerifiedTasks: "",
			myUncompletedTasks: "",
			myCompletedTasks: "",
			show: false
		};
		
        this.handleTasksDelegated = this.handleTasksDelegated.bind(this);
        this.getTaskDetails = this.getTaskDetails.bind(this);
		this.handleWorkingTasks = this.handleWorkingTasks.bind(this);
    }
	
	//helper
    async getTaskDetails(_id) {      
        this.props.contractInstance.methods.getCorrespondingTask(_id).call((err, result) => { 
			//result = [ipfsHash, parent(addr), childDoing(addr), completed(bool), verfied(bool)]
			console.log(result);
            ipfs.cat(result[0], (err,buffer) => {
                let temp = JSON.parse(buffer.toString()); 
                console.log(temp);
				return [_id,temp.descriptionOfTask,temp.rewardYouEarn,temp.IpfsHashOfImageUploaded,result[2],result[3],result[4]];
            })//ipfs.cat()
        })//getCorrespondingTask()                   
    }

    async handleTasksDelegated() { 
        let id;
		let taskDetails = [];
		let uncompletedTasks = [];
		let unverifiedTasks = [];
		let verifiedTasks = [];
		await this.props.contractInstance.events.TaskCreated({
			filter: {parent: web3.eth.accounts[0]}, fromBlock: 0, toBlock:'latest'}, (err, res) => {
				console.log(JSON.stringify(res.returnValues));
				id = res.returnValues.id;				
				taskDetails = this.getTaskDetails(id);
				console.log(id)
			//if not completed
				if(taskDetails[5] == false) {
					this.setState({delegatedUncompletedTasks: this.state.delegatedUncompletedTasks+taskDetails+"\n"})
				}
											 //uncompletedTasks.push(taskDetails.splice(-2));}
			//if tasks not verified
				else if(taskDetails[6] == false) {unverifiedTasks.push(taskDetails.splice(-2));}
				else {verifiedTasks.push(taskDetails.splice(-2));}	
			this.setState({show:true});
		})
		//display Task Details
		
		
		/*
		let i;
		document.writeln("TASKS NOT YET COMPLETED");
		for(i=0; i<uncompletedTasks.length; i++) {
			document.write("Task ID: " + uncompletedTasks[i][0]);
			document.write("Description of task: " + uncompletedTasks[i][1]);
			document.write("Deadline: " + uncompletedTasks[i][2]);
			document.write("Reward: " + uncompletedTasks[i][3]);
			document.write("Child Doing: " + uncompletedTasks[i][4]);
		}
		
		document.writeln("TASKS COMPLETED BUT NOT YET VERIFIED");
		for(i=0; i<unverifiedTasks.length; i++) {
			document.write("Task ID: " + unverifiedTasks[i][0]);
			document.write("Description of task: " + unverifiedTasks[i][1]);
			document.write("Deadline: " + unverifiedTasks[i][2]);
			document.write("Reward: " + unverifiedTasks[i][3]);
			document.write("Child Doing: " + unverifiedTasks[i][4]);
		}	
		
		document.writeln("TASKS COMPLETED AND VERIFIED");
		for(i=0; i<verifiedTasks.length; i++) {
			document.write("Task ID: " + verifiedTasks[i][0]);
			document.write("Description of task: " + verifiedTasks[i][1]);
			document.write("Deadline: " + verifiedTasks[i][2]);
			document.write("Reward: " + verifiedTasks[i][3]);
			document.write("Child Doing: " + verifiedTasks[i][4]);
		}
		*/
    }
	
	async handleWorkingTasks() {
/*		let id;
		let uncompletedTasks = [];
		let completedTasks = [];
		await this.props.contractInstance.events.DoingTask({
			filter: {childDoing: web3.eth.accounts[0]}, fromBlock: 0, toBlock:'latest'}, (err, res) => {
				console.log(JSON.stringify(res.returnValues));
				id = res.returnValues.id;				
				let taskDetails = this.getTaskDetails(id);
				console.log(id)
				if(taskDetails[5] == false) {uncompletedTasks.push(taskDetails.splice(-3));}
				else if(taskDetails[6] == false) {completedTasks.push(taskDetails.splice(-3));}
		});
		
		//display Task Details
		console.log("yo!")
		let i;
		document.writeln("TASKS DOING");
		for(i=0; i<uncompletedTasks.length; i++) {
			document.write("Task ID: " + uncompletedTasks[i][0]);
			document.write("Description of task: " + uncompletedTasks[i][1]);
			document.write("Deadline: " + uncompletedTasks[i][2]);
			document.write("Reward: " + uncompletedTasks[i][3]);
		}
		
		document.writeln("TASKS COMPLETED BUT NOT YET VERIFIED BY ASSIGNER");
		for(i=0; i<uncompletedTasks.length; i++) {
			document.write("Task ID: " + uncompletedTasks[i][0]);
			document.write("Description of task: " + uncompletedTasks[i][1]);
			document.write("Deadline: " + uncompletedTasks[i][2]);
			document.write("Reward: " + uncompletedTasks[i][3]);
		}	*/	
	}
	

	render() { 
        return (
          <div id="showTask" className="ShowTask">
            <hr />
            <h2> Tasks Delegated by you </h2>
			<p><strong>NOTE: </strong> There are 3 sections here:</p>
			 <ul>
				<li>Tasks assigned, but not yet done</li>
				<li>Tasks assigned, done but not yet verified</li>
				<li>Tasks completed and verified </li>
			 </ul>
			<button onClick={this.handleTasksDelegated} > Get Tasks Delegated</button>
			<br />
			<br />
			{this.state.show ? this.state.delegatedUncompletedTasks : <p></p> }
			<hr />
			<h2> Tasks you are Doing/ Tasks done </h2>			
			<p> Here, you shall see tasks you are doing or tasks that you have completed </p>
			<button onClick={this.handleWorkingTasks} > Show such Tasks </button>			
		  </div>
        );
    }
}

export default ShowTask;