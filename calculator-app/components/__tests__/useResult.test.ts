import { renderHook, act } from '@testing-library/react-hooks'

import useResult from '../useResult'

describe('useResult', () => {
  test('initial result', () => {
    const { result } = renderHook(() => useResult())

    expect(result.current.result).toBe('42')
  })

  test('addInput 2', () => {
    const { result } = renderHook(() => useResult())

    act(() => {
      result.current.addInput('2')
    })

    expect(result.current.result).toBe('2')
  })

  test('addInput add', () => {
    const { result } = renderHook(() => useResult())

    act(() => {
      result.current.addInput('add')
    })

    expect(result.current.result).toBe('42')
  })

  test('calculate 6', () => {
    const { result } = renderHook(() => useResult())

    act(() => {
      result.current.addInput('2')
    })
    act(() => {
      result.current.addInput('add')
    })
    act(() => {
      result.current.addInput('4')
    })
    act(() => {
      result.current.calculate()
    })

    expect(result.current.result).toBe('6')
  })

  // test.each`
  //   inputs               | expected
  //   ${['4', 'add', '2']} | ${'6'}
  // `(
  //   'result is "$expected when inputs are "$inputs" on calculate',
  //   async ({ inputs, expected }: { inputs: string[]; expected: string }) => {
  //     const { result, waitForNextUpdate } = renderHook(() => useResult())

  //     act(() => {
  //       result.current.addInput('6')
  //       // result.current.calculate()
  //     })

  //     expect(result.current.result).toBe('6')

  //     // act(() => {
  //     //   inputs.map((input) => result.current.addInput(input))
  //     //   result.current.calculate()
  //     // })

  //     // // await waitForNextUpdate()

  //     // expect(result.current.result).toBe(expected)
  //   }
  // )
})
