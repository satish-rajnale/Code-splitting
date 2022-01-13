import './App.css';
// import jsondata from "./user.json"
// import { makeUpperCase } from './utilities';
import React, {useState} from "react"
// import MyDefaultComponent from './MyDefaultComponent';


function loadAsyncComponent(importFunc) {
  return class WrappedComponent extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        Component : null
      }
    }

    componentDidMount(){
      importFunc().then((mod) => this.setState({Component : mod.default}))
    }
render(){
  return this.state.Component ? <this.state.Component  {...this.props} /> : null
}

  }
}

const MyDefaultComponent = loadAsyncComponent(()=> import("./MyDefaultComponent"))
function App() {
  const [state, setstate] = useState(null);
  // const [MyDefaultComponent, setmydefaultComponent] = useState(null);

  const onLoad = async() =>{
    const names = (await import("./user.json")).default;
    const makeUpperCase = (await import("./utilities" /* webpackChunkName: "utilities"*/)).makeUpperCase ;
    setstate(makeUpperCase(names));

//     const MyDefaultComponent = (await import("./MyDefaultComponent")).default;
// setmydefaultComponent(loadAsyncComponent(await import("./MyDefaultComponent")));
  }

  // const onLoad = () =>{
  //   import("./user.json").then((module)=> setstate(module.default));
  //   import("./utilities" /* webpackChunkName: "utilities"*/).then(({makeUpperCase})=> setstate((value) =>makeUpperCase(value)))
  // }
  return (
    <div className="App">
      <header className="App-header">
      HOME App
      <button onClick={onLoad}>Load</button>
      <p>{JSON.stringify(state)}</p>
      
      <br/>
      {MyDefaultComponent && <MyDefaultComponent/>}
      </header>
    </div>
  );
}

export default App;
