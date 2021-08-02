import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'

import { Keypad9 } from '../Keypad9'

describe('Keypad9', () => {
  test('renders', async () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(<Keypad9/>)
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })
})
