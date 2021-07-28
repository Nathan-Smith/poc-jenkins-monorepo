import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'

import { KeypadButton } from '../KeypadButton'

describe('KeypadButton', () => {
  test('renders', async () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(<KeypadButton gridArea="a">a</KeypadButton>)
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })
})
