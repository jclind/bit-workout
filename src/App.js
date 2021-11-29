import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import { e1 } from './assets/data/e1'
import WorkoutContainer from './components/Workout/WorkoutContainer'
import Signup from './pages/Signup'
import { AuthProvider } from './contexts/AuthContext'
import Dashboard from './components/Dashboard'
import LoginContainer from './components/Login/LoginContainer'
import PrivateRoute from './components/PrivateRoute'
import ForgotPasswordContainer from './components/ForgotPassword/ForgotPasswordContainer'
import UpdateProfileContainer from './components/UpdateProfile/UpdateProfileContainer'
import SignupAccountContainer from './components/Signup/Account/SignupAccountContainer'
function App() {
  const currExerciseData = e1

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path='/' element={<PrivateRoute />}>
            <Route exact path='/' element={<Dashboard />} />
          </Route>
          <Route exact path='/update-profile' element={<PrivateRoute />}>
            <Route
              exact
              path='/update-profile'
              element={<UpdateProfileContainer />}
            />
          </Route>
          <Route path='/signup' element={<Signup />}>
            <Route path='account-info' element={<SignupAccountContainer />} />
          </Route>
          <Route path='/login' element={<LoginContainer />} />
          <Route
            path='/forgot-password'
            element={<ForgotPasswordContainer />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
