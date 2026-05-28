import { useState, useRef, useEffect } from 'react'
import {
  Play,
  Pause,
  ArrowLeft,
  Settings,
  Plus,
  Minus,
  RotateCcw,
  Edit3,
  Save,
  Maximize,
  Minimize,
} from 'lucide-react'
import { Script } from '../types'

interface PrompterProps {
  script: Script
  onBack: () => void
  onSave: (script: Script) => void
}

export default function Prompter({ script, onBack, onSave }: PrompterProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [scrollSpeed, setScrollSpeed] = useState(script.scrollSpeed)
  const [fontSize, setFontSize] = useState(script.fontSize)
  const [showSettings, setShowSettings] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [backgroundColor, setBackgroundColor] = useState(script.backgroundColor)
  const [textColor, setTextColor] = useState(script.textColor)
  const [fontFamily, setFontFamily] = useState(script.fontFamily)
  const [mirrorHorizontal, setMirrorHorizontal] = useState(script.mirrorHorizontal)
  const [mirrorVertical, setMirrorVertical] = useState(script.mirrorVertical)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(script.content)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  const hideControlsTimeoutRef = useRef<number>()

  const getContrastColor = (hexColor: string) => {
    const hex = hexColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 128 ? '#000000' : '#ffffff'
  }

  const controlsColor = getContrastColor(backgroundColor)
  const isDarkBackground = controlsColor === '#ffffff'

  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = performance.now()
      const animate = (currentTime: number) => {
        const deltaTime = currentTime - lastTimeRef.current
        lastTimeRef.current = currentTime

        if (scrollContainerRef.current) {
          const pixelsPerSecond = scrollSpeed
          const scrollAmount = (pixelsPerSecond * deltaTime) / 1000
          scrollContainerRef.current.scrollTop += scrollAmount
        }

        animationFrameRef.current = requestAnimationFrame(animate)
      }
      animationFrameRef.current = requestAnimationFrame(animate)
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying, scrollSpeed])

  const toggleFullscreen = async () => {
    if (!containerRef.current) return

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (err) {
      console.error('Fullscreen error:', err)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isEditing) {
        e.preventDefault()
        setIsPlaying((prev) => !prev)
      }
      if (e.code === 'ArrowUp' && !isEditing) {
        e.preventDefault()
        setScrollSpeed((prev) => Math.min(prev + 10, 300))
      }
      if (e.code === 'ArrowDown' && !isEditing) {
        e.preventDefault()
        setScrollSpeed((prev) => Math.max(prev - 10, 10))
      }
      if (e.code === 'KeyF' && !isEditing) {
        e.preventDefault()
        toggleFullscreen()
      }
    }

    const handleOrientationChange = () => {
      setShowControls(true)
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current)
      }
      if (isPlaying) {
        hideControlsTimeoutRef.current = window.setTimeout(() => {
          setShowControls(false)
        }, 3000)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    window.addEventListener('orientationchange', handleOrientationChange)
    window.addEventListener('resize', handleOrientationChange)
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('orientationchange', handleOrientationChange)
      window.removeEventListener('resize', handleOrientationChange)
    }
  }, [isEditing, isPlaying])

  const resetScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0
    }
    setIsPlaying(false)
  }

  const handleSave = () => {
    const updatedScript: Script = {
      ...script,
      content: editedContent,
      fontSize,
      scrollSpeed,
      backgroundColor,
      textColor,
      fontFamily,
      mirrorHorizontal,
      mirrorVertical,
      updatedAt: Date.now(),
    }
    onSave(updatedScript)
  }

  const handleSaveAndExit = () => {
    handleSave()
    onBack()
  }

  const showControlsTemporarily = () => {
    setShowControls(true)
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current)
    }
    hideControlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  const handleScreenTap = () => {
    if (isPlaying) {
      showControlsTemporarily()
    }
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden"
      style={{ backgroundColor }}
      onClick={handleScreenTap}
    >
      <div
        ref={scrollContainerRef}
        className="w-full h-full overflow-y-auto no-scrollbar"
      >
        <div 
          className="min-h-full flex items-center justify-center px-4 md:px-8 py-32"
          style={{
            transform: `scale(${mirrorHorizontal ? -1 : 1}, ${mirrorVertical ? -1 : 1})`,
          }}
        >
          {isEditing ? (
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full max-w-4xl min-h-[80vh] bg-transparent border-2 border-gray-600 rounded-lg p-8 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                fontSize: `${fontSize}px`,
                color: textColor,
                fontFamily,
                lineHeight: '1.6',
              }}
              autoFocus
            />
          ) : (
            <div
              className="w-full max-w-4xl text-center whitespace-pre-wrap"
              style={{
                fontSize: `${fontSize}px`,
                color: textColor,
                fontFamily,
                lineHeight: '1.6',
              }}
            >
              {editedContent}
            </div>
          )}
        </div>
      </div>

      {showControls && (
        <div 
          className="absolute inset-x-0 top-0 p-4 transition-opacity"
          style={{
            background: isDarkBackground 
              ? 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)'
              : 'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)'
          }}
        >
          <div className="flex items-center justify-between max-w-6xl mx-auto" style={{ color: controlsColor }}>
            <button
              onClick={onBack}
              className="p-3 rounded-full transition-colors"
              style={{
                backgroundColor: isDarkBackground ? 'rgba(55,65,81,0.8)' : 'rgba(229,231,235,0.8)',
                color: controlsColor
              }}
            >
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl font-semibold truncate mx-4">{script.title}</h2>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (isEditing) {
                    handleSave()
                  }
                  setIsEditing(!isEditing)
                }}
                className="p-3 rounded-full transition-colors"
                style={{
                  backgroundColor: isDarkBackground ? 'rgba(55,65,81,0.8)' : 'rgba(229,231,235,0.8)',
                  color: controlsColor
                }}
              >
                {isEditing ? <Save size={24} /> : <Edit3 size={24} />}
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-3 rounded-full transition-colors"
                style={{
                  backgroundColor: isDarkBackground ? 'rgba(55,65,81,0.8)' : 'rgba(229,231,235,0.8)',
                  color: controlsColor
                }}
                title={isFullscreen ? 'Vollbild verlassen (F)' : 'Vollbild (F)'}
              >
                {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-3 rounded-full transition-colors"
                style={{
                  backgroundColor: isDarkBackground ? 'rgba(55,65,81,0.8)' : 'rgba(229,231,235,0.8)',
                  color: controlsColor
                }}
              >
                <Settings size={24} />
              </button>
            </div>
          </div>
        </div>
      )}

      {showControls && !isEditing && (
        <div 
          className="absolute inset-x-0 bottom-0 p-4 transition-opacity"
          style={{
            background: isDarkBackground 
              ? 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
              : 'linear-gradient(to top, rgba(255,255,255,0.8), transparent)'
          }}
        >
          <div className="max-w-6xl mx-auto" style={{ color: controlsColor }}>
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={resetScroll}
                className="p-4 rounded-full transition-colors"
                style={{
                  backgroundColor: isDarkBackground ? 'rgba(55,65,81,0.8)' : 'rgba(229,231,235,0.8)',
                  color: controlsColor
                }}
              >
                <RotateCcw size={24} />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-6 rounded-full transition-colors"
                style={{
                  backgroundColor: isDarkBackground ? 'rgb(37,99,235)' : 'rgb(59,130,246)',
                  color: '#ffffff'
                }}
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
              </button>
              <button
                onClick={handleSaveAndExit}
                className="p-4 rounded-full transition-colors"
                style={{
                  backgroundColor: isDarkBackground ? 'rgb(22,163,74)' : 'rgb(34,197,94)',
                  color: '#ffffff'
                }}
              >
                <Save size={24} />
              </button>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setScrollSpeed(Math.max(scrollSpeed - 10, 10))}
                  className="p-3 rounded-full transition-colors"
                  style={{
                    backgroundColor: isDarkBackground ? 'rgba(55,65,81,0.8)' : 'rgba(229,231,235,0.8)',
                    color: controlsColor
                  }}
                >
                  <Minus size={20} />
                </button>
                <div className="text-center min-w-[100px]">
                  <div className="text-xs md:text-sm opacity-70">Speed</div>
                  <div className="text-lg md:text-xl font-semibold">{scrollSpeed}</div>
                </div>
                <button
                  onClick={() => setScrollSpeed(Math.min(scrollSpeed + 10, 300))}
                  className="p-3 rounded-full transition-colors"
                  style={{
                    backgroundColor: isDarkBackground ? 'rgba(55,65,81,0.8)' : 'rgba(229,231,235,0.8)',
                    color: controlsColor
                  }}
                >
                  <Plus size={20} />
                </button>
              </div>

              <div 
                className="hidden md:block w-px h-12 mx-2" 
                style={{ backgroundColor: isDarkBackground ? 'rgba(75,85,99,0.8)' : 'rgba(156,163,175,0.8)' }}
              />

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFontSize(Math.max(fontSize - 4, 12))}
                  className="p-3 rounded-full transition-colors"
                  style={{
                    backgroundColor: isDarkBackground ? 'rgba(55,65,81,0.8)' : 'rgba(229,231,235,0.8)',
                    color: controlsColor
                  }}
                >
                  <Minus size={20} />
                </button>
                <div className="text-center min-w-[100px]">
                  <div className="text-xs md:text-sm opacity-70">Font Size</div>
                  <div className="text-lg md:text-xl font-semibold">{fontSize}px</div>
                </div>
                <button
                  onClick={() => setFontSize(Math.min(fontSize + 4, 72))}
                  className="p-3 rounded-full transition-colors"
                  style={{
                    backgroundColor: isDarkBackground ? 'rgba(55,65,81,0.8)' : 'rgba(229,231,235,0.8)',
                    color: controlsColor
                  }}
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Font Family</label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="sans-serif">Sans Serif</option>
                  <option value="serif">Serif</option>
                  <option value="monospace">Monospace</option>
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Text Color</label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-full h-12 bg-gray-900 border border-gray-700 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Background Color</label>
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-full h-12 bg-gray-900 border border-gray-700 rounded-lg cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-400">Horizontal spiegeln</label>
                <button
                  onClick={() => setMirrorHorizontal(!mirrorHorizontal)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    mirrorHorizontal ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      mirrorHorizontal ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-400">Vertikal spiegeln</label>
                <button
                  onClick={() => setMirrorVertical(!mirrorVertical)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    mirrorVertical ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      mirrorVertical ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                handleSave()
                setShowSettings(false)
              }}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-semibold transition-colors"
            >
              Save Settings
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
