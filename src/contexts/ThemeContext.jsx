import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

const THEME_KEY = 'hiarte-theme'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => 
    localStorage.getItem(THEME_KEY) || 'light'
  )

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
