import { useState } from 'react'

interface UseResult {
  result: string
  addInput: (input: string) => void
  calculate: () => void
}

export default function useResult(): UseResult {
  const [inputs, setInputs] = useState<string[]>([])
  const [result, setResult] = useState<string>('42')

  function calculate () {
    setResult(`${Number.parseInt(inputs[0]) + Number.parseInt(inputs[1])}`)
  }

  function addInput(input: string) {
    if (input === 'add') return
    const newInputs = [...inputs, input]
    setInputs(newInputs)
    setResult(newInputs[newInputs.length - 1])
  }

  return {
    addInput,
    result,
    calculate,
  }
}
