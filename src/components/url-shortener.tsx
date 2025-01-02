'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Sun, Moon, Github } from 'lucide-react'

export default function URLShortener() {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true)
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      setIsDarkMode(e.matches)
    })
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShortUrl(`https://short.url/${Math.random().toString(36).substr(2, 6)}`)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-white'} transition-colors duration-200 flex flex-col`}>
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>URL Shortener</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className={isDarkMode ? 'text-white' : 'text-black'}
            >
              <a href="https://github.com/yourusername/your-repo" target="_blank" rel="noopener noreferrer">
                <Github className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">GitHub repository</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className={isDarkMode ? 'text-white' : 'text-black'}>
              {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
          </div>
        </header>
      </div>
      
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url" className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Enter your long URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com/very/long/url"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                required
                className={`w-full p-2 rounded-md border ${
                  isDarkMode 
                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-black placeholder-gray-400'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <Button 
              type="submit" 
              className={`w-full py-2 px-4 rounded-md ${
                isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-black hover:bg-gray-900 text-white'
              } transition-colors duration-200`}
            >
              Shorten URL
            </Button>
          </form>
          
          {shortUrl && (
            <div className={`mt-8 p-4 rounded-md ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
              <Label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Shortened URL</Label>
              <div className="mt-2 flex items-center">
                <Input
                  value={shortUrl}
                  readOnly
                  className={`flex-grow pr-10 ${
                    isDarkMode 
                      ? 'bg-gray-800 text-white' 
                      : 'bg-white text-black'
                  } rounded-md border-0 focus:ring-2 focus:ring-blue-500`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  className={`ml-2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
                  onClick={() => navigator.clipboard.writeText(shortUrl)}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

