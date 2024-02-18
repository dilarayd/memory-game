import './App.css';
import Cards from './components/Cards';
import Score from './components/Score';

function App() {
  return (
    <>
    <Score/>
    <div className='App-cards'>
    <Cards/>
    </div>
    </>
  );
}

export default App;
