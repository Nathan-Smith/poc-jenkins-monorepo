import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'

import { Keypad4 } from '../Keypad4'

describe('Keypad4', () => {
  test('renders', async () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(<Keypad4/>)
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })
})
