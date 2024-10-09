'use client'

import { useState } from 'react'
import { usePython, usePythonConsole } from 'react-py'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export default function CodeEditor() {
  const [input, setInput] = useState('')
  const [consoleInput, setConsoleInput] = useState('')
  const { runPython, stdout, stderr, isLoading, isRunning } = usePython()
  const { 
    runPython: runConsole, 
    stdout: consoleStdout, 
    stderr: consoleStderr, 
    isRunning: isConsoleRunning,
    isAwaitingInput,
    sendInput,
    banner,
    consoleState
  } = usePythonConsole()

  const handleRunCode = () => {
    runPython(input)
  }

  const handleConsoleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (isAwaitingInput) {
        sendInput(consoleInput)
      } else {
        runConsole(consoleInput)
      }
      setConsoleInput('')
    }
  }

  return (
    <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
      <Tabs defaultValue="code" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="code">Code Editor</TabsTrigger>
          <TabsTrigger value="console">Python Console</TabsTrigger>
        </TabsList>
        <TabsContent value="code" className="p-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your Python code here"
            className="min-h-[300px] mb-4 font-mono text-sm"
          />
          <Button
            onClick={handleRunCode}
            disabled={isLoading || isRunning}
            className="w-full"
          >
            {isLoading ? 'Loading...' : isRunning ? 'Running...' : 'Run Code'}
          </Button>
          <div className="mt-4 bg-gray-100 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Output:</h2>
            <pre className="whitespace-pre-wrap font-mono text-sm">{stdout}</pre>
          </div>
          {stderr && (
            <div className="mt-4 bg-red-100 p-4 rounded-md">
              <h2 className="text-lg font-semibold mb-2">Error:</h2>
              <pre className="whitespace-pre-wrap text-red-600 font-mono text-sm">{stderr}</pre>
            </div>
          )}
        </TabsContent>
        <TabsContent value="console" className="p-4">
          <div className="bg-gray-800 text-gray-200 p-4 rounded-md min-h-[300px] font-mono text-sm">
            <pre className="whitespace-pre-wrap text-blue-300">{banner}</pre>
            <pre className="whitespace-pre-wrap">{consoleStdout}</pre>
            {consoleStderr && (
              <pre className="whitespace-pre-wrap text-red-400">{consoleStderr}</pre>
            )}
            <div className="flex items-center mt-2">
              <span className="mr-2 text-green-400">{consoleState === 'main' ? '>>>' : '...'}</span>
              <Input
                value={consoleInput}
                onChange={(e) => setConsoleInput(e.target.value)}
                onKeyDown={handleConsoleInput}
                placeholder={isAwaitingInput ? "Enter input..." : "Enter Python code..."}
                className="flex-grow bg-gray-700 border-none text-gray-200 placeholder-gray-500"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}