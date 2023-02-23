import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset } from '@/features/store'

function Counter() {

  const count = useSelector((state:any) => state.counter.count)
  const dispatch = useDispatch()

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  )
}

export default Counter