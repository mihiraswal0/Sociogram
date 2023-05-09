import { ThemeProvider } from '@emotion/react';
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { BrowserRouter,Navigate,Route,Routes } from 'react-router-dom'
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';
import { themeSettings } from 'theme';
import { CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material';
const App = () => {
  const mode=useSelector((state)=>state.mode);
  const theme=useMemo(()=>createTheme(themeSettings(mode)),[mode]);

  return (
    <div className='app'> 
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/profile/:userId' element={<ProfilePage/>}/>
    </Routes>
      </CssBaseline>
    
    </ThemeProvider>
    
    </BrowserRouter>   
    </div>
  )
}

export default App
