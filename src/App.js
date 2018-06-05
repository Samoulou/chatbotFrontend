import React, { Component } from 'react';
import ChatBot, { Loading } from 'react-simple-chatbot';

class DBPedia extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
    };
  }

  componentWillMount() {
    const self = this;
    const { steps, previousStep } = this.props;
    const search = steps.search.value;
    const endpoint = encodeURI('http://localhost:6060/api/message');
    var headers = new Headers();
    var message = {
        "message": search
    };
    // Tell the server we want JSON back
    headers.set('Content-Type', 'application/json');
    var fetchOptions = {
       method: 'POST',
       headers,
       body: JSON.stringify(message)
     };
     var responsePromise = fetch(endpoint, fetchOptions);
     // 3. Use the response
      // ================================
      responsePromise
          // 3.1 Convert the response into JSON-JS object.
        .then(function(response) {
          return response.json();
        })
        .then(function(jsonData) {
          self.setState({
            result: jsonData,
          })
            self.props.triggerNextStep(4);
        });;
  }



  render() {
    const { trigger, loading, result } = this.state;

    return (
      <div>
         {this.state.result}
      </div>
    );
  }
}

const App = () => (
  <ChatBot
    steps={[
      {
        id: '1',
        message: 'Type something to search on Wikipédia. (Ex.: Brazil)',
        trigger: 'search',
      },
      {
        id: 'search',
        user: true,
        trigger: '3',
      },
      {
        id: '3',
        component: <DBPedia />,
        asMessage: true,
        waitAction: true,
        trigger: 'search',
      },
    ]}
  />
);

export default App;
