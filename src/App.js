import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot, { Loading } from 'react-simple-chatbot';
const theme = {
   backgroundImage: 'url("https://www.bookmee.ch/45cf21b9ee27587b7ea6a87fc033f899.svg")',
   fontFamily: '“Helvetica Neue”,Helvetica,Arial,sans-serif!important',
   headerBgColor: '#5e9df1',
   headerFontColor: '#fff',
   headerFontSize: '15px',
   botBubbleColor: '#5e9df1',
   botFontColor: '#fff',
   userBubbleColor: '#fff',
   userFontColor: 'rgb(110, 122, 137)',

};

class DBPedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      result: '',
      trigger: false,
      options: false,
    };
  }

  componentWillMount() {
    const self = this;
    const { steps, previousStep, step } = this.props;
    // const options = steps.options.value;
    // const choiceLabel = steps.options.message;
    const search = steps.search.value;
    const endpoint = encodeURI('http://localhost:6060/api/message');
    var headers = new Headers();
    var message = {
        "message": search
    };


    // if(options === 'celibataire' || options === 'marie'){
    //   var message = {
    //     "message" : choiceLabel
    //   }
    // }
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
          self.props.triggerNextStep();
        });

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
  <ThemeProvider theme={theme}>
  <ChatBot
    botAvatar={"http://bookmee.thecomputerfirm.com/img/favicon.png"}
    hideUserAvatar={true}
    steps={[
      {
        id: '1',
        message: "🤖 Yo, je suis ChatMee, qu'est-ce-que je peux faire pour toi?",
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
      {
        id: 'options',
        options: [
          { value: 'marie', label: 'Je suis marié', trigger: '3' },
          { value: 'celibataire', label: 'Je suis célibataire', trigger: '3' },
        ],
      },
    ]}
  />
    </ThemeProvider>
);

export default App;
