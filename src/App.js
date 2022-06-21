import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Account from './pages/Account/Account'
import Workout from './pages/Workout/Workout'
import Signup from './pages/Auth/Signup/Signup'
import Dashboard from './components/Dashboard'
import Login from './pages/Auth/Login/Login'
import PrivateRoute from './components/PrivateRoute'
import ForgotPasswordContainer from './components/AuthForms/ForgotPassword/ForgotPasswordContainer'
import SignupAccountContainer from './components/AuthForms/Signup/Account/SignupAccountContainer'
import SignupPersonalContainer from './components/AuthForms/Signup/Personal/SignupPersonalContainer'
import Settings from './pages/Settings/Settings'
import ManageAccount from './pages/Settings/ManageAccount'
import UpdateName from './pages/Settings/UpdateName'
import UpdateUsername from './pages/Settings/UpdateUsername'
import UpdateEmail from './pages/Settings/UpdateEmail'
import SecurityContainer from './pages/Settings/Security/SecurityContainer'
import NavbarContainer from './components/Navbar/Navbar'
import WeightDataContainer from './pages/Account/WeightData/WeightDataContainer'
import AddWeightInputContainer from './pages/Account/WeightData/AddWeightInput/AddWeightInputContainer'
import CreateWorkoutContainer from './pages/CreateWorkout/CreateWorkoutContainer'
import Auth from './Auth'
import AppLoadingScreen from './components/AppLoadingScreen/AppLoadingScreen'
import FeedbackContainer from './pages/Settings/Feedback/FeedbackContainer'
import PastWorkouts from './pages/PastWorkouts/PastWorkouts'

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <div className='app-container'>
      <Helmet>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, viewport-fit=cover'
        />
      </Helmet>
      <Auth setLoading={setLoading} />
      {loading ? (
        <AppLoadingScreen />
      ) : (
        <Router>
          <Routes>
            <Route exact path='/' element={<PrivateRoute />}>
              <Route exact path='/' element={<Dashboard />} />
            </Route>
            <Route
              path='/past-workouts'
              element={
                <>
                  <PastWorkouts />
                  <NavbarContainer />
                </>
              }
            />
            <Route path='/account' element={<PrivateRoute />}>
              <Route exact path='/account' element={<Account />} />
              <Route
                exact
                path='/account/weight'
                element={<WeightDataContainer />}
              />
              <Route
                exact
                path='/account/weight/add-weight'
                element={<AddWeightInputContainer />}
              />
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
                element={<SecurityContainer />}
              />
              <Route
                exact
                path='/account/settings/feedback'
                element={<FeedbackContainer />}
              />
            </Route>
            <Route path='/signup' element={<Signup />}>
              <Route path='account-info' element={<SignupAccountContainer />} />
              <Route
                path='personal-info'
                element={<SignupPersonalContainer />}
              />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route
              path='/forgot-password'
              element={<ForgotPasswordContainer />}
            />
            <Route
              path='/workout'
              element={
                <>
                  <Workout />
                  <NavbarContainer />
                </>
              }
            />
            <Route
              path='/create-workout'
              element={
                <>
                  <CreateWorkoutContainer />
                  <NavbarContainer />
                </>
              }
            />
          </Routes>
        </Router>
      )}
    </div>
  )
}

export default App
