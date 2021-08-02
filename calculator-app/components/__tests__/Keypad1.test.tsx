import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'

import { Keypad1 } from '../Keypad1'

describe('Keypad1', () => {
  test('renders', async () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(<Keypad1/>)
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })
})
