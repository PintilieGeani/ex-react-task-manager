import { Route, Routes } from "react-router-dom"
import Layout from "../layout/Layout.jsx"
import AddTask from "../pages/AddTask.jsx"
import TaskList from "../pages/TaskList.jsx"
import DettailPage from "../pages/DettailPage.jsx"

function App() {

  return (
    <>
      <Routes>
        {/* Layout */}
        <Route path="/" element={<Layout />}>
          {/* Pagina Principale */}
          <Route index element={<TaskList />} />
          {/* Pagina di agginta delle task */}
          <Route path="/addTask" element={<AddTask />} />
          <Route path="/task/:id" element={<DettailPage />}/>
        {/* Fine Layout */}
        </Route>
      </Routes>
    </>
  )
}

export default App
