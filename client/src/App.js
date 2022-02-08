import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";

function App() {
  const [state, setState] = useState({
    data: null
  });

  useEffect(() => {
    testBackendApi()
      .then((res) => setState({ data: res.message }))
      .catch((error) => console.log(error));
  }, []);

  const testBackendApi = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3 className="text-3xl font-bold underline">{state.data}</h3>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
