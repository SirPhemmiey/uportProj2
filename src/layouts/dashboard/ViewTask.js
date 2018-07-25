import React, { Component } from 'react';
import ipfs from '../../util/ipfs';
import web3 from '../../util/web3v1';

class ViewTask extends Component{
    constructor(props) {
        super(props);

        this.state = {            
            taskDesc: '',
            reward: '',
            deadline: '',
            imgIpfsHash: null,         
            showTaskId: false,
            showError: false
        }

        this.handleTasksDelegated = this.handleTasksDelegated.bind(this);
        this.getTaskDetails = this.getTaskDetails.bind(this);
    }

    async handleTasksDelegated() { 
        
		this.props.contractInstance.events.TaskCreated({
			filter: {parent: web3.eth.accounts[0]}, fromBlock: 0, toBlock:'latest'}, (err, res) => {
				console.log(JSON.stringify(res.returnValues));
				let id = res.returnValues.id;
				document.writeln("Task ID: " + id);
				//get Task Details - child Doing, completed ya nahi, ipfs details. if completed - tell to verify!
		})
		
		
        const {getLatestTaskId} = this.props.contractInstance;
        getLatestTaskId((err, id) => {
            console.log(id);
            id = id.toNumber();            
            let _id = document.querySelector('input[name=task_id]').value;
//don't allow checking for invalid task ids!
            if (_id<0 || _id>id){
                this.setState({
                    showError: true,
                    showTaskId: false
                });
            } else {
                this.setState({
                    showError: false,
                    showTaskId: true
                });
                this.getTaskDetails(_id);
            } //else
        });
        
    }

    async getTaskDetails(_id) {
        const {getCorrespondingTask} = this.props.contractInstance;        
        await getCorrespondingTask(_id, (err, result) => {
            
            ipfs.cat(result[0], (err,buffer) => {
                let temp = JSON.parse(buffer.toString()); 
                console.log(temp);
                this.setState({
                    taskDesc: temp.descriptionOfTask,
                    reward: temp.rewardYouEarn,
                    deadline: temp.deadline,
                    imgIpfsHash: temp.IpfsHashOfImageUploaded
                }); //setState
            })//ipfs.cat()
        })//getCorrespondingTask()                   
    }

	render() { 
        return (
          <div id="viewTask" className="ViewTask">
            <hr />
            <h2> Tasks Delegated by you </h2>
			<p><strong>NOTE: </strong>Only the tasks that have not been completed will be shown here. To see the completed tasks please go to the respective section.</p>
            <button onClick={this.handleTasksDelegated} > Get Tasks Delegated </button>
          </div>
        );
    }
}

export default ViewTask;

/*
        let table;
        if(this.state.showTaskId) {
          table = <div>
            <table border = "1">
            <tbody>
              <tr>
                <th>Task Detail Categories</th>
                <th>Values </th>
              </tr>
              <tr>
                <td>What is needed to be done:</td>
                <td>{this.state.taskDesc}</td>
              </tr>
    
              <tr>
                <td>Do the task by:</td>
                <td>{this.state.deadline}</td>
              </tr>
    
              <tr>
                <td>Reward (in finney)</td>
                <td>{this.state.reward}</td>
              </tr>
    
              <tr>
                <td>ipfs hash of the image (if available)</td>
                <td>{this.state.imgIpfsHash}</td>
              </tr>
            </tbody>
          </table>
          <p><strong>NOTE:</strong> To see the image: go to gateway.ipfs.io/ipfs/(the hash)</p>
        </div>
        }
        
        let error;
        if(this.state.showError) {
          error = <p>You may have entered either an invalid task id. Try again!</p>;
        }
        */