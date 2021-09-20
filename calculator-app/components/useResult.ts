import { useState } from 'react'
import { last, trimStart } from 'lodash'

interface UseResult {
  result: string
  addInput: (input: string) => void
  calculate: () => void
}

export default function useResult(): UseResult {
  const [inputs, setInputs] = useState<string[]>([])
  const [result, setResult] = useState<string>('0')

  function calculate() {
    fetch('/api/calculate', {
      method: 'POST',
      body: JSON.stringify({ inputs }),
    })
      .then((res) => res.json())
      .then(setResult)
  }

  function addInput(input: string) {
    let newResult = result
    setInputs([...inputs, input])
    if (input === 'add') return
    if (last(inputs) === 'add') {
      newResult = input
    } else {
      newResult = result + input
    }
    newResult = trimStart(newResult, '0') || '0'
    setResult(newResult)
  }

  return {
    addInput,
    result,
    calculate,
  }
}
