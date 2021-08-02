import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'
import { fireEvent, render } from '@testing-library/react'

import { Keypad2 } from '../Keypad2'

describe('Keypad2', () => {
  test('renders', () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(<Keypad2 />)
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })

  test('renders', () => {
    const onClick = jest.fn()
    const { getByTestId } = render(<Keypad2 onClick={onClick} />)

    fireEvent.click(getByTestId(/keypad-2/i))

    expect(onClick).toBeCalledWith('2')
  })
})
