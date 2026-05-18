import { useRef, useCallback } from 'react'

export function useJsonFile() {
  const fileHandleRef = useRef(null)

  const saveToFile = useCallback(async (entries) => {
    if (!fileHandleRef.current) return
    try {
      const writable = await fileHandleRef.current.createWritable()
      await writable.write(JSON.stringify(entries, null, 2))
      await writable.close()
    } catch (err) {
      console.error('Auto-save failed:', err)
    }
  }, [])

  const pickSaveFile = useCallback(async (entries) => {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: 'payrate-data.json',
        types: [{ description: 'JSON file', accept: { 'application/json': ['.json'] } }],
      })
      fileHandleRef.current = handle
      await saveToFile(entries)
      return true
    } catch {
      return false
    }
  }, [saveToFile])

  const openFile = useCallback(async () => {
    try {
      const [handle] = await window.showOpenFilePicker({
        types: [{ description: 'JSON file', accept: { 'application/json': ['.json'] } }],
      })
      fileHandleRef.current = handle
      const file = await handle.getFile()
      const text = await file.text()
      return JSON.parse(text)
    } catch {
      return null
    }
  }, [])

  const hasFileHandle = () => !!fileHandleRef.current
  const getFileName = () => fileHandleRef.current?.name || null

  return { saveToFile, pickSaveFile, openFile, hasFileHandle, getFileName }
}
