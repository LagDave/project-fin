import Layout from "./Layout";
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core'
import { useState } from "react";


export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
      >
        <Layout/>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}