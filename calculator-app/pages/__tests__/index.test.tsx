import React from 'react'
import { mocked } from 'ts-jest/utils'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Home from '../index'
import useResult from '../../components/useResult'

jest.mock('../../components/useResult')

describe('index', () => {
  test('renders', () => {
    mocked(useResult).mockReturnValue({
      result: '6',
      addInput: jest.fn(),
      calculate: jest.fn(),
    })

    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(<Home />)
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })

  test('clicking 2 sets result to 2', () => {
    const addInput = jest.fn()
    mocked(useResult).mockReturnValue({
      result: '2',
      addInput,
      calculate: jest.fn(),
    })

    const { getByTestId } = render(<Home />)

    fireEvent.click(getByTestId(/keypad-2/i))

    expect(getByTestId(/result/i)).toHaveTextContent(/^2$/)
    expect(addInput).toHaveBeenCalledWith('2')
  })

  test('clicking add keeps the same result', () => {
    const addInput = jest.fn()
    mocked(useResult).mockReturnValue({
      result: '2',
      addInput,
      calculate: jest.fn(),
    })

    const { getByTestId } = render(<Home />)

    fireEvent.click(getByTestId(/keypad-2/i))

    fireEvent.click(getByTestId(/keypad-add/i))

    expect(getByTestId(/result/i)).toHaveTextContent(/^2$/)
    expect(addInput).toHaveBeenNthCalledWith(1, '2')
    expect(addInput).toHaveBeenNthCalledWith(2, 'add')
  })

  test('clicking 4 sets result to 4', () => {
    const addInput = jest.fn()
    mocked(useResult).mockReturnValue({
      result: '4',
      addInput,
      calculate: jest.fn(),
    })

    const { getByTestId } = render(<Home />)

    fireEvent.click(getByTestId(/keypad-4/i))

    expect(getByTestId(/result/i)).toHaveTextContent(/^4$/)
    expect(addInput).toHaveBeenCalledWith('4')
  })

  test('clicking 2, add, 4, equals sets result to 6', () => {
    const addInput = jest.fn()
    const calculate = jest.fn()
    mocked(useResult).mockReturnValue({
      result: '6',
      addInput,
      calculate,
    })

    const { getByTestId } = render(<Home />)

    fireEvent.click(getByTestId(/keypad-2/i))
    fireEvent.click(getByTestId(/keypad-add/i))
    fireEvent.click(getByTestId(/keypad-4/i))
    fireEvent.click(getByTestId(/keypad-equal/i))

    expect(getByTestId(/result/i)).toHaveTextContent(/^6$/)
    expect(addInput).toHaveBeenNthCalledWith(1, '2')
    expect(addInput).toHaveBeenNthCalledWith(2, 'add')
    expect(addInput).toHaveBeenNthCalledWith(3, '4')
    expect(calculate).toHaveBeenCalled()
  })
})
