import { useState, useEffect } from 'react'
import ScriptLibrary from './components/ScriptLibrary'
import Prompter from './components/Prompter'
import { Script } from './types'
import { getScripts, saveScript, deleteScript } from './utils/storage'

function App() {
  const [scripts, setScripts] = useState<Script[]>([])
  const [currentScript, setCurrentScript] = useState<Script | null>(null)
  const [showLibrary, setShowLibrary] = useState(true)

  useEffect(() => {
    loadScripts()
  }, [])

  const loadScripts = async () => {
    const loadedScripts = await getScripts()
    setScripts(loadedScripts)
  }

  const handleSaveScript = async (script: Script) => {
    await saveScript(script)
    await loadScripts()
  }

  const handleDeleteScript = async (id: string) => {
    await deleteScript(id)
    await loadScripts()
    if (currentScript?.id === id) {
      setCurrentScript(null)
      setShowLibrary(true)
    }
  }

  const handleSelectScript = (script: Script) => {
    setCurrentScript(script)
    setShowLibrary(false)
  }

  const handleBack = () => {
    setShowLibrary(true)
    setCurrentScript(null)
  }

  return (
    <div className="w-full h-full">
      {showLibrary ? (
        <ScriptLibrary
          scripts={scripts}
          onSelectScript={handleSelectScript}
          onSaveScript={handleSaveScript}
          onDeleteScript={handleDeleteScript}
        />
      ) : currentScript ? (
        <Prompter
          script={currentScript}
          onBack={handleBack}
          onSave={handleSaveScript}
        />
      ) : null}
    </div>
  )
}

export default App
