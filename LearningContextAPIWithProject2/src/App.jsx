import { useEffect, useState } from 'react'
import { ThemeProvider } from './contexts/Theme/theme'
import './App.css'
import ThemeBtn from './components/ThemeButton'
import Card from './components/Card'

// This Project shows a second method of using contextAPI

function App() {

  const [themeMode, setThemeMode] = useState('light')

  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark")

    document.querySelector('html').classList.add(themeMode)
  }, [themeMode])

  const lightTheme = () => {
    setThemeMode("light")
  }
  const darkTheme = () => {
    setThemeMode("dark")
  }

  // lightTheme and darkTheme are empty methods which were created while creating ThemeContext in the theme.js file
  // Since they are empty, they can be defined here by using their same names, and their functionality will directly go to the context

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }} >

      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn/>

          </div>

          <div className="w-full max-w-sm mx-auto">
            <Card/>
          </div>
        </div>
      </div>
    </ThemeProvider>

  )
}

export default App
