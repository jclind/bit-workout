import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import { e1 } from './assets/data/e1'
import WorkoutContainer from './components/Workout/WorkoutContainer'
import Signup from './pages/Signup'
import Account from './pages/Account'
import { AuthProvider } from './contexts/AuthContext'
import Dashboard from './components/Dashboard'
import LoginPage from './pages/LoginPage'
import PrivateRoute from './components/PrivateRoute'
import ForgotPasswordContainer from './components/ForgotPassword/ForgotPasswordContainer'
import UpdateProfileContainer from './components/UpdateProfile/UpdateProfileContainer'
import SignupAccountContainer from './components/Signup/Account/SignupAccountContainer'
import SignupPersonalContainer from './components/Signup/Personal/SignupPersonalContainer'
import Settings from './pages/Settings/Settings'
import ManageAccount from './pages/Settings/ManageAccount'
import UpdateName from './pages/Settings/UpdateName'
import UpdateUsername from './pages/Settings/UpdateUsername'
import UpdateEmail from './pages/Settings/UpdateEmail'
import Security from './pages/Settings/Security'

function App() {
  const currExerciseData = e1

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path='/' element={<PrivateRoute />}>
            <Route exact path='/' element={<Dashboard />} />
          </Route>
          <Route path='/account' element={<PrivateRoute />}>
            <Route exact path='/account' element={<Account />} />
            <Route exact path='/account/settings' element={<Settings />} />
            <Route
              exact
              path='/account/settings/manage-account'
              element={<ManageAccount />}
            />
            <Route
              exact
              path='/account/settings/manage-account/update-name'
              element={<UpdateName />}
            />
            <Route
              exact
              path='/account/settings/manage-account/update-name'
              element={<UpdateName />}
            />
            <Route
              exact
              path='/account/settings/manage-account/update-username'
              element={<UpdateUsername />}
            />
            <Route
              exact
              path='/account/settings/manage-account/update-email'
              element={<UpdateEmail />}
            />
            <Route
              exact
              path='/account/settings/security'
              element={<Security />}
            />
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
            <Route path='personal-info' element={<SignupPersonalContainer />} />
          </Route>
          <Route path='/login' element={<LoginPage />} />
          <Route
            path='/forgot-password'
            element={<ForgotPasswordContainer />}
          />
          <Route
            path='/workout'
            element={<WorkoutContainer exerciseData={e1} />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
