import logo from './logo.svg';
import './App.css';
import React from "react";
import Dashboard from './components/Dashboard/Dashboard';

class App extends React.Component{

  componentDidMount(){
    this.testLocalServerConnect('http://localhost:5000/test');
  }

  testLocalServerConnect(url, data = {}){

    const response = fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      header : {
        'Content-Type' : 'application/json',
      },
      redirect: 'follow',
      referrerPolicy : 'no-referrer',
      // body : JSON.stringify(data)
    })
    .then(
      response => response.json()
      ).then(data => {
        console.log('Successfully connected to backend server :', data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render(){
    return (
      <div className="App">
          <Dashboard/>
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//         <Dashboard/>
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}
//     </div>
//   );
// }

export default App;
