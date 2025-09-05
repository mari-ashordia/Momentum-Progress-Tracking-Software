import Header from './components/Header'
import CurrentTasksPage from './pages/CurrentTasksPage'
import CreateTaskPage from './pages/CreateTaskPage'
import TaskDetailsPage from './pages/TaskDetailsPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <div className = "w-screen h-screen px-[63px] py-[20px] overflow-x-hidden">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route  path = '/' element = {<CurrentTasksPage />}/>
          <Route  path = '/tasks/new' element = {<CreateTaskPage />}/>
          <Route  path = '/tasks/:taskId' element = {<TaskDetailsPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
    
}

export default App
