import React, { Component } from 'react';
import { Widget, addResponseMessage  } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
class App extends Component {

  componentDidMount() {
    addResponseMessage("Welcome to this awesome chat!");
}

  handleNewUserMessage = (newMessage) => {
  console.log(`New message incomig! ${newMessage}`);
  // Now send the message throught the backend API
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App">
          <Widget
          handleNewUserMessage={this.handleNewUserMessage}
         />
        </div>
      </div>
    );
  }
}

export default App;
