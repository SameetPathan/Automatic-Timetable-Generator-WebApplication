import logo from './logo.svg';
import './App.css';
import NavbarComponent from './components/NavbarComponent';

function App() {
  return (
    <div className="App">
    <NavbarComponent></NavbarComponent>
      <header className="App-header text-center">
        <h1>Welcome to the Automatic Timetable Generator</h1>
        <p className="lead">
          Generate your timetable effortlessly with our advanced generator.
        </p>
       
      </header>
    </div>
  );
}


export default App;
