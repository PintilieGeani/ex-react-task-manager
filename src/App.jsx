import { Route, Routes } from "react-router-dom"
import Layout from "../layout/Layout.jsx"
import AddTask from "../pages/AddTask.jsx"
import TaskList from "../pages/TaskList.jsx"

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
        {/* Fine Layout */}
        </Route>
      </Routes>
    </>
  )
}

export default App
