import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'

import { KeypadEqual } from '../KeypadEqual'

describe('KeypadEqual', () => {
  test('renders', async () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(<KeypadEqual/>)
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })
})
