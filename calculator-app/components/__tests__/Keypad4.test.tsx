import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'
import { fireEvent, render } from '@testing-library/react'

import { Keypad4 } from '../Keypad4'

describe('Keypad4', () => {
  test('renders', () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(<Keypad4 />)
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })

  test('calls onInput with 4 on click', () => {
    const onInput = jest.fn()
    const { getByTestId } = render(<Keypad4 onInput={onInput} />)

    fireEvent.click(getByTestId(/keypad-4/i))

    expect(onInput).toBeCalledWith('4')
  })
})
