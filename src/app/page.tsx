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
    e.preventDefault();
    try {
      const generatedShortUrl = Math.random().toString(36).substr(2, 6);
      const shortUrl = `${window.location.origin}/${generatedShortUrl}`;
      setShortUrl(shortUrl);

      await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalUrl: longUrl,
          shortUrl: generatedShortUrl,
        }),
      });

      console.log('URL saved successfully!');
    } catch (error) {
      console.error('Error saving URL:', error);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-black' : 'bg-white'} transition-colors duration-200`}>
      {/* Header */}
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>URL Shortener</h1>
          <div className="flex items-center space-x-2">
            <a href="https://github.com/prgrmr-jr/url-shortener-web.git" target="_blank" rel="noopener noreferrer">
              <Github className={`h-6 w-6 ${isDarkMode ? 'text-white' : 'text-black'}`} />
            </a>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-grow flex items-center justify-center mt-[300px]">
  <div className="text-center">
    {/* Tagline */}
    <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
  Shorten your URLs in seconds with our <strong>free</strong> and <strong>fast</strong> service. Get started now!
</p>


    {/* Form */}
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="url" className={`block text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Enter your long URL
        </Label>
        <Input
          id="url"
          type="url"
          placeholder="https://example.com/very/long/url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
          className={`w-full p-4 text-lg rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'} focus:ring-2 focus:ring-blue-500`}
        />
      </div>

      <Button
        type="submit"
        className={`w-full py-4 text-lg font-semibold rounded-lg ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} transition-colors hover:opacity-90`}
      >
        Shorten URL
      </Button>
    </form>

            {/* Shortened URL Display */}
            {shortUrl && (
              <div className={`mt-6 p-4 rounded-md ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <Label className={`block text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Shortened URL</Label>
                <div className="mt-2 flex items-center">
                  <Input
                    value={shortUrl}
                    readOnly
                    className={`flex-grow p-3 text-lg rounded-lg ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} border-0`}
                  />
                  <Button
                    type="button"
                    className={`ml-2 p-3 rounded-md  ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
                    onClick={() => navigator.clipboard.writeText(shortUrl)}
                  >
                    <Copy className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`py-4 text-center mt-auto ${isDarkMode ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-700'}`}>
        <p className="text-sm">
          Built with ❤️ by <a href="https://github.com/prgrmr-jr" target='_blank' className="underline">prgrmr-jr</a>. All rights reserved.
        </p>
      </footer>
    </div>
  );
}