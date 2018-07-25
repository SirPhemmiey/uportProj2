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

        this.handleSubmitTaskId = this.handleSubmitTaskId.bind(this);
        this.getTaskDetails = this.getTaskDetails.bind(this);
    }

    async handleSubmitTaskId(e) {
        e.preventDefault(); 
        this.props.contractInstance.methods.getLatestTaskId().call((err, id) => {
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
        await this.props.contractInstance.methods.getCorrespondingTask(_id).call((err, result) => {            
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
    
        return (
          <div id="viewTask" className="ViewTask">
            <hr />
            <h2> Get task information by entering a task id </h2>
            <form  onSubmit = { this.handleSubmitTaskId }>
              <input type="text" placeholder="enter task id" name="task_id"/>
              <input type="submit" />
            </form>
    
            {table}
            {error}
          </div>
        );
    }
}
export default ViewTask;