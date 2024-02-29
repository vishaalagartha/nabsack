import './App.css'
import { ConfigProvider } from 'antd'
import Header from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Knapsack from './pages/Knapsack'
import BFS from './pages/BFS'
import Network from './pages/Network'
import Statstionary from './pages/Statstionary'


const App = () => {
  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#0d6efd',
      },
      components: {
        Collapse: {
          headerBg: '#0d6efd',
        },
        Select: {
          optionSelectedBg: '#0d6efd',
        }
      }
    }}>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route Component={Home} path='/' exact />
          <Route Component={Network} path='/network' exact />
          <Route Component={Knapsack} path='/knapsack' exact />
          <Route Component={BFS} path='/bfs' exact />
          <Route Component={Statstionary} path='/statstionary' exact />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
