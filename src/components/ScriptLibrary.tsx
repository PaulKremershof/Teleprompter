import { useState } from 'react'
import { Plus, FileText, Trash2, Search } from 'lucide-react'
import { Script } from '../types'
import { generateId } from '../utils/storage'

interface ScriptLibraryProps {
  scripts: Script[]
  onSelectScript: (script: Script) => void
  onSaveScript: (script: Script) => void
  onDeleteScript: (id: string) => void
}

export default function ScriptLibrary({
  scripts,
  onSelectScript,
  onSaveScript,
  onDeleteScript,
}: ScriptLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewScript, setShowNewScript] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')

  const filteredScripts = scripts.filter(
    (script) =>
      script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateScript = () => {
    if (!newTitle.trim()) return

    const newScript: Script = {
      id: generateId(),
      title: newTitle.trim(),
      content: newContent.trim() || 'Start typing your script here...',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      fontSize: 32,
      scrollSpeed: 100,
      backgroundColor: '#000000',
      textColor: '#ffffff',
      fontFamily: 'sans-serif',
      mirrored: false,
    }

    onSaveScript(newScript)
    setNewTitle('')
    setNewContent('')
    setShowNewScript(false)
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto h-full flex flex-col p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Teleprompter Pro</h1>
          <p className="text-gray-400">Manage your scripts</p>
        </div>

        <div className="mb-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search scripts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => setShowNewScript(true)}
          className="mb-6 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 px-6 flex items-center justify-center gap-2 font-semibold transition-colors"
        >
          <Plus size={24} />
          New Script
        </button>

        <div className="flex-1 overflow-y-auto no-scrollbar space-y-3">
          {filteredScripts.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <FileText size={64} className="mx-auto mb-4 opacity-50" />
              <p className="text-xl">No scripts yet</p>
              <p className="text-sm mt-2">Create your first script to get started</p>
            </div>
          ) : (
            filteredScripts.map((script) => (
              <div
                key={script.id}
                className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => onSelectScript(script)}
                  >
                    <h3 className="text-xl font-semibold mb-1">{script.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">
                      {formatDate(script.updatedAt)}
                    </p>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {script.content.substring(0, 150)}...
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (confirm('Delete this script?')) {
                        onDeleteScript(script.id)
                      }
                    }}
                    className="ml-4 p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showNewScript && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">New Script</h2>
            <input
              type="text"
              placeholder="Script title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 mb-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <textarea
              placeholder="Script content (optional - you can add it later)"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 mb-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[200px] resize-none"
            />
            <div className="flex gap-3">
              <button
                onClick={handleCreateScript}
                disabled={!newTitle.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg py-3 font-semibold transition-colors"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowNewScript(false)
                  setNewTitle('')
                  setNewContent('')
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg py-3 font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
