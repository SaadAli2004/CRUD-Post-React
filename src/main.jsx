import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Input from './Components/Input.jsx'
import PostAPI from './Components/PostAPI.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostAPI/>
  </StrictMode>
)
