import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'

import { Keypad3 } from '../Keypad3'

describe('Keypad3', () => {
  test('renders', async () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(<Keypad3/>)
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })
})
