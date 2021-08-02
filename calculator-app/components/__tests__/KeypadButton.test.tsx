import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'

import { KeypadButton, MDCButtonVariant } from '../KeypadButton'

describe('KeypadButton', () => {
  test('renders', async () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(
        <KeypadButton testid="a-class-name" gridArea="a-grid-area">
          a
        </KeypadButton>
      )
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })

  test('renders raised variant', async () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(
        <KeypadButton
          testid="a-class-name"
          gridArea="a-grid-area"
          variant={MDCButtonVariant.raised}
        >
          a
        </KeypadButton>
      )
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })
})
