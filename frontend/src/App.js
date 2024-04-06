import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <>
                <h1 className="text-3xl font-bold underline">Hello world!</h1>
              </>
            </>
          }
        />
      </Routes>{" "}
    </Router>
  )
}
export default App
