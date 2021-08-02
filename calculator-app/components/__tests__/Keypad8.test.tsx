import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'

import { Keypad8 } from '../Keypad8'

describe('Keypad8', () => {
  test('renders', async () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(<Keypad8/>)
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })
})
