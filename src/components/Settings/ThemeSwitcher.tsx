'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import { useThemeStore } from '@/stores/useThemeStore'

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { setThemeStore } = useThemeStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div>
      {theme === 'dark' ? (
        <Button
          className="w-full"
          onClick={() => {
            setTheme('light')
            setThemeStore('light')
          }}
        >
          Light Mode
        </Button>
      ) : (
        <Button
          className="w-full"
          onClick={() => {
            setTheme('dark')
            setThemeStore('dark')
          }}
        >
          Dark Mode
        </Button>
      )}
    </div>
  )
}
