import {
  AppShell,
  useMantineTheme,
  createStyles,

} from '@mantine/core';

import { Route, Routes } from 'react-router';


// components
import Sidenav from './components/Sidenav/Sidenav';
import AppHeader from './components/AppHeader/AppHeader';
import AppFooter from './components/AppFooter/AppFooter';

// page components
import Dashboard from "./components/Dashboard/Dashboard";
import Login from './components/Login/Login';

export default function Layout() {

  const theme = useMantineTheme();
  
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={ <Sidenav/> }
      footer={ <AppFooter/> }
      header={ <AppHeader/> }
    >
    
    <Routes>
      <Route path="/dashboard" element={ <Dashboard/> } />
      <Route path="/login" element={ <Login/> } />
    </Routes>
      
    </AppShell>
  );
}