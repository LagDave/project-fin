import Layout from "./Layout";
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core'
import { useState } from "react";
import { useEffect } from "react"
import { onAuthStateChangedListener } from "./utils/firebase"
import { useDispatch } from "react-redux"
import { setUser } from "./utils/slices/userSlice"


export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));


  const dispatch = useDispatch();

  // listen to auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: any) => {
      if(user && user.uid){
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
        }))
      }
    })

    return unsubscribe;
  }, [])

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
          fontFamily: 'Varela Round, sans-serif',
        }}
      >
        <Layout/>
      </MantineProvider>
    </ColorSchemeProvider>
  )

}
