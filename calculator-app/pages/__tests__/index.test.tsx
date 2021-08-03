import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Home from '../index'

describe('index', () => {
  test('renders', () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(<Home />)
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })

  test('clicking 2 sets result to 2', () => {
    const { getByTestId } = render(<Home />)

    fireEvent.click(getByTestId(/keypad-2/i))

    expect(getByTestId(/result/i)).toHaveTextContent('2')
  })
})
