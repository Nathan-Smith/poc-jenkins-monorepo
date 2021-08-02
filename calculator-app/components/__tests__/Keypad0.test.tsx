import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'

import { Keypad0 } from '../Keypad0'

describe('Keypad0', () => {
  test('renders', async () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(<Keypad0/>)
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })
})
