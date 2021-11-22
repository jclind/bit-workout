import { e1 } from './assets/data/e1'
import WorkoutContainer from './components/Workout/WorkoutContainer'

function App() {
  const currExerciseData = e1

  return (
    <div className='App'>
      <WorkoutContainer exerciseData={currExerciseData} />
    </div>
  )
}

export default App
