import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'

import { Keypad5 } from '../Keypad5'

describe('Keypad5', () => {
  test('renders', async () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(<Keypad5/>)
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })
})
