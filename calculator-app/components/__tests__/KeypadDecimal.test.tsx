import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'

import { KeypadDecimal } from '../KeypadDecimal'

describe('KeypadDecimal', () => {
  test('renders', async () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(<KeypadDecimal/>)
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })
})
