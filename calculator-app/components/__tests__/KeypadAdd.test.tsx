import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'
import { fireEvent, render } from '@testing-library/react'

import { KeypadAdd } from '../KeypadAdd'

describe('KeypadAdd', () => {
  test('renders', () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(<KeypadAdd />)
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })

  test('calls onInput with add on click', () => {
    const onInput = jest.fn()
    const { getByTestId } = render(<KeypadAdd onInput={onInput} />)

    fireEvent.click(getByTestId(/keypad-add/i))

    expect(onInput).toBeCalledWith('add')
  })
})
