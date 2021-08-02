import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'

import { Keypad7 } from '../Keypad7'

describe('Keypad7', () => {
  test('renders', async () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(<Keypad7/>)
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })
})
