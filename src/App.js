import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { e1 } from './assets/data/e1'
import WorkoutContainer from './components/Workout/WorkoutContainer'
import SignupFormContainer from './components/Signup/SignupFormContainer'
import { AuthProvider } from './contexts/AuthContext'
import Dashboard from './components/Dashboard'
import LoginContainer from './components/Login/LoginContainer'
import PrivateRoute from './components/PrivateRoute'

function App() {
  const currExerciseData = e1

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path='/' element={<PrivateRoute />}>
            <Route exact path='/' element={<Dashboard />} />
          </Route>
          <Route path='/signup' element={<SignupFormContainer />} />
          <Route path='/login' element={<LoginContainer />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
