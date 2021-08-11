import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'
import { fireEvent, render } from '@testing-library/react'

import { KeypadEqual } from '../KeypadEqual'

describe('KeypadEqual', () => {
  test('renders', () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(<KeypadEqual />)
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })

  test('calls onInput on click', () => {
    const onInput = jest.fn()
    const { getByTestId } = render(<KeypadEqual onInput={onInput} />)

    fireEvent.click(getByTestId(/keypad-equal/i))

    expect(onInput).toBeCalled()
  })
})
