import React, { useState, useEffect, useRef } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Helmet } from 'react-helmet'
import Account from './pages/Account/Account'
import Workout from './pages/Workout/Workout'
import Signup from './pages/Auth/Signup/Signup'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import ForgotPasswordContainer from './pages/Auth/ForgotPassword/ForgotPasswordContainer'
import Settings from './pages/Settings/Settings'
import ManageAccount from './pages/Settings/ManageAccount'
import UpdateName from './pages/Settings/UpdateName'
import UpdateUsername from './pages/Settings/UpdateUsername'
import UpdateEmail from './pages/Settings/UpdateEmail'
import SecurityContainer from './pages/Settings/Security/SecurityContainer'
import NavbarContainer from './components/Navbar/Navbar'
import WeightDataContainer from './pages/Account/WeightData/WeightDataContainer'
import AddWeightInputContainer from './pages/Account/WeightData/AddWeightInput/AddWeightInputContainer'
import Auth from './Auth'
import AppLoadingScreen from './components/AppLoadingScreen/AppLoadingScreen'
import FeedbackContainer from './pages/Settings/Feedback/FeedbackContainer'
import PastWorkouts from './pages/PastWorkouts/PastWorkouts'
import Gender from './pages/Auth/Signup/Gender/Gender'
import Birthday from './pages/Auth/Signup/Birthday/Birthday'
import Weight from './pages/Auth/Signup/Weight/Weight'
import Height from './pages/Auth/Signup/Height/Height'
import BarbellWeight from './pages/Auth/Signup/BarbellWeight/BarbellWeight'
import Username from './pages/Auth/Signup/Username/Username'
import SignupSelection from './pages/Auth/Signup/SignupSelection/SignupSelection'
import EmailSignup from './pages/Auth/Signup/EmailSignup/EmailSignup'
import AuthLandingPage from './pages/Auth/AuthLandingPage/AuthLandingPage'
import CreateWorkout from './pages/CreateWorkout/CreateWorkout'
import WorkoutTypeSelection from './pages/CreateWorkout/WorkoutTypeSelection/WorkoutTypeSelection'
import AddExercises from './pages/CreateWorkout/AddExercises/AddExercises'
import RestTimeData from './pages/CreateWorkout/RestTimeData/RestTimeData'
import WorkoutInfo from './pages/CreateWorkout/WorkoutInfo/WorkoutInfo'
import TrendingWorkouts from './components/Workout/WorkoutSelection/TrendingWorkouts'
import UserWorkouts from './components/Workout/WorkoutSelection/UserWorkouts'
import LikedWorkouts from './components/Workout/WorkoutSelection/LikedWorkouts'
import WorkoutSettings from './pages/Settings/Workout/WorkoutSettings'
import ReleaseNotes from './pages/Settings/ReleaseNotes/ReleaseNotes'
import LoginContainer from './pages/Auth/Login/LoginContainer'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    document.querySelector('.app-container').scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  const [loading, setLoading] = useState(true)

  const appContainerRef = useRef()

  return (
    <div className='app-container' ref={appContainerRef}>
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
          <ScrollToTop />
          <Routes>
            <Route exact path='/' element={<PrivateRoute />}>
              <Route exact path='/' element={<Dashboard />} />
              <Route
                path='/workout'
                element={
                  <>
                    <Workout />
                    <NavbarContainer />
                  </>
                }
              >
                <Route
                  path='trending-workouts'
                  element={<TrendingWorkouts />}
                />
                <Route
                  path='user-workouts'
                  element={<UserWorkouts appContainerRef={appContainerRef} />}
                />
                <Route
                  path='liked-workouts'
                  element={<LikedWorkouts appContainerRef={appContainerRef} />}
                />
              </Route>
              <Route
                path='/create-workout'
                element={
                  <>
                    <CreateWorkout />
                    <NavbarContainer />
                  </>
                }
              >
                <Route path='add-exercises' element={<AddExercises />} />
                <Route path='rest-time' element={<RestTimeData />} />
                <Route path='workout-info' element={<WorkoutInfo />} />
                <Route path='selection' element={<WorkoutTypeSelection />} />
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
            </Route>
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
                path='/account/settings/workout-settings'
                element={<WorkoutSettings />}
              />
              <Route
                exact
                path='/account/settings/feedback'
                element={<FeedbackContainer />}
              />
              <Route
                path='/account/settings/release-notes'
                element={<ReleaseNotes />}
              />
            </Route>
            <Route path='/signup' element={<Signup />}>
              <Route path='gender' element={<Gender />} />
              <Route path='birthday' element={<Birthday />} />
              <Route path='height' element={<Height />} />
              <Route path='weight' element={<Weight />} />
              <Route path='barbell-weight' element={<BarbellWeight />} />
              <Route path='username' element={<Username />} />
              <Route path='signup-selection' element={<SignupSelection />} />
              <Route path='email-signup' element={<EmailSignup />} />
            </Route>
            <Route path='/auth' element={<AuthLandingPage />} />
            <Route path='/login' element={<LoginContainer />} />
            <Route
              path='/forgot-password'
              element={<ForgotPasswordContainer />}
            />
          </Routes>
        </Router>
      )}

      <ToastContainer
        position='bottom-center'
        theme='colored'
        autoClose={3000}
        hideProgressBar
        className='toast-alerts-container'
      />
    </div>
  )
}

export default App
