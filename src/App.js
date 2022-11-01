import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Content from './Content'
import Header from './Header';
import {useState} from 'react';

function App() {
  let checkLogin = localStorage.getItem('username');
  checkLogin = checkLogin ? checkLogin : false;
  const [isLoggedIn, setIsLoggedIn] = useState(checkLogin);
  


  return (
    <div className="App">
      {<Header isLoggedIn={isLoggedIn}/>}
      {!isLoggedIn && <Login setIsLoggedIn={setIsLoggedIn} />}
      {isLoggedIn && <Content/>}
    </div>
  );
}

export default App;
