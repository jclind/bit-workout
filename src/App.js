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
import AccountStats from './pages/Account/AccountStats/AccountStats'
import AllExercises from './pages/Account/AccountStats/AllExercises/AllExercises'
import SingleExerciseStats from './pages/Account/AccountStats/SingleExerciseStats/SingleExerciseStats'
import AllChartData from './pages/Account/AccountStats/SingleExerciseStats/AllChartData/AllChartData'

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
    <div className='app-container' id='app-container' ref={appContainerRef}>
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
                exact
                path='/workout'
                element={
                  <>
                    <Workout />
                    <NavbarContainer />
                  </>
                }
              >
                <Route
                  exact
                  path='trending-workouts'
                  element={
                    <TrendingWorkouts appContainerRef={appContainerRef} />
                  }
                />
                <Route
                  exact
                  path='user-workouts'
                  element={<UserWorkouts appContainerRef={appContainerRef} />}
                />
                <Route
                  exact
                  path='liked-workouts'
                  element={<LikedWorkouts appContainerRef={appContainerRef} />}
                />
              </Route>
              <Route
                exact
                path='/create-workout'
                element={
                  <>
                    <CreateWorkout />
                    <NavbarContainer />
                  </>
                }
              >
                <Route exact path='add-exercises' element={<AddExercises />} />
                <Route exact path='rest-time' element={<RestTimeData />} />
                <Route exact path='workout-info' element={<WorkoutInfo />} />
                <Route
                  exact
                  path='selection'
                  element={<WorkoutTypeSelection />}
                />
              </Route>
              <Route
                exact
                path='/past-workouts'
                element={
                  <>
                    <PastWorkouts />
                    <NavbarContainer />
                  </>
                }
              />
            </Route>
            <Route exact path='/account' element={<PrivateRoute />}>
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
              <Route
                exact
                path='/account/stats'
                element={
                  <>
                    <AccountStats />
                    <NavbarContainer />
                  </>
                }
              />
              <Route
                exact
                path='/account/stats/exercises'
                element={<AllExercises />}
              />
              <Route
                exact
                path='/account/stats/exercises/:exerciseID'
                element={<SingleExerciseStats />}
              />
              <Route
                exact
                path='/account/stats/exercises/:exerciseID/chart-data'
                element={<AllChartData appContainerRef={appContainerRef} />}
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
                path='/account/settings/workout-settings'
                element={<WorkoutSettings />}
              />
              <Route
                exact
                path='/account/settings/feedback'
                element={<FeedbackContainer />}
              />
              <Route
                exact
                path='/account/settings/release-notes'
                element={<ReleaseNotes />}
              />
            </Route>
            <Route exact path='/signup' element={<Signup />}>
              <Route exact path='gender' element={<Gender />} />
              <Route exact path='birthday' element={<Birthday />} />
              <Route exact path='height' element={<Height />} />
              <Route exact path='weight' element={<Weight />} />
              <Route exact path='barbell-weight' element={<BarbellWeight />} />
              <Route exact path='username' element={<Username />} />
              <Route
                exact
                path='signup-selection'
                element={<SignupSelection />}
              />
              <Route exact path='email-signup' element={<EmailSignup />} />
            </Route>
            <Route exact path='/auth' element={<AuthLandingPage />} />
            <Route exact path='/login' element={<LoginContainer />} />
            <Route
              exact
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
