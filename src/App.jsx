import React, {Suspense} from 'react'
import Router from './router'

import Loading from './components/loading'

export default function App() {
  return (
    <Suspense fallback={<Loading/>}>
      <Router/>
    </Suspense>
    
  )
}

