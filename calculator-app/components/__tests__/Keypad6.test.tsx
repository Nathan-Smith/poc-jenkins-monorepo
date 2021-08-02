import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'

import { Keypad6 } from '../Keypad6'

describe('Keypad6', () => {
  test('renders', async () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(<Keypad6/>)
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })
})
