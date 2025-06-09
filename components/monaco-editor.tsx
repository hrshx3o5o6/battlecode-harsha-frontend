"use client"

import { useRef, useEffect } from "react"
import Editor, { type OnMount } from "@monaco-editor/react"

interface MonacoEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  theme?: "vs-dark" | "light"
}

export function MonacoEditor({ value, onChange, language = "python", theme = "vs-dark" }: MonacoEditorProps) {
  const editorRef = useRef<any>(null)

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor
    editor.focus()
  }

  useEffect(() => {
    // This ensures the editor resizes properly when its container resizes
    const resizeObserver = new ResizeObserver(() => {
      if (editorRef.current) {
        editorRef.current.layout()
      }
    })

    const editorContainer = document.querySelector(".monaco-editor-container")
    if (editorContainer) {
      resizeObserver.observe(editorContainer)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div className="monaco-editor-container h-full w-full">
      <Editor
        height="100%"
        width="100%"
        language={language}
        value={value}
        theme={theme}
        onChange={(value) => onChange(value || "")}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          tabSize: 4,
          insertSpaces: true,
          automaticLayout: true,
          lineNumbers: "on",
          scrollbar: {
            vertical: "auto",
            horizontal: "auto",
          },
        }}
      />
    </div>
  )
}
