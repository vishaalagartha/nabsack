import './App.css'
import Header from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Knapsack from './pages/Knapsack'
import BFS from './pages/BFS'


const App = () => {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route Component={Home} path='/' exact />
          <Route Component={Knapsack} path='/knapsack' exact />
          <Route Component={BFS} path='/bfs' exact />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
