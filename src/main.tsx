import React from 'react'
import ReactDOM from 'react-dom/client'
import { BigTaco } from './Mathable'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <BigTaco />
    </div>
  </React.StrictMode>,
)
