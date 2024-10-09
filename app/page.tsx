'use client'

import { PythonProvider } from 'react-py'
import CodeEditor from '../components/CodeEditor'

export default function Home() {
  return (
    <PythonProvider>
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Python Code Editor</h1>
        <CodeEditor />
      </main>
    </PythonProvider>
  )
}