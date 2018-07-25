import React, { Component } from 'react'

class Home extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Assign Task to your kids!</h1>

            <p>Welcome! Here are the steps to add a task, and leave your children to do, without the hassle of you having to continuously repeat the tasks! </p>

            <p>Before we go ahead,<strong>ensure that you have metamask installed! And there may be alerts popping up if you are doing something wrong</strong>(such as verifying the wrong task etc)</p>
            
            <ul>
              <li><a href="#instructions">Instructions/ How to use</a></li>
              <li><a href="#addChildren">Add Children</a></li>
              <li><a href="#addTask">Add Task</a></li>
              <li><a href="#viewTask">View a Task</a></li>
              <li><a href="#logDoing">Confirm Doing a Task </a></li>
              <li><a href="#logCompleted">Confirm a Task as Completed</a></li>
              <li><a href="#verifyCompleted">Verify a Task is Completed</a></li>
            </ul>      
            <hr />

            <h4 id="instructions"> For parents: </h4>
            <p>First, add the children accounts (their ethereum addresses). You don't need to add an account that you have already added!
            <br/> 
            Second, add the task!
            Now you may tell your kids the task ids.
            If they have completed the task, and have confirmed so on the system,then you can "verify the task". If the task has been completed to your liking, simply go to <strong>"Verify a Task is Completed"</strong> section. In the metamask pop-up, you shall see that "amount" field is the reward for the task set :)
            </p>
            <h4> For kids/task do-ers: </h4>
            <p>"View Task" - enter the task id that your parent may have given to you! If the task (and its reward) is to your liking, please go to <strong>"Confirm Doing a Task section"</strong>.
            Once your task is complete, please go to <strong>"Confirm a Task as Completed"</strong> section.
            Finally, wait for your parent to verify the task so you can get paid!
            </p>
          </div>
        </div>
      </main>
    )
  }
}

export default Home

