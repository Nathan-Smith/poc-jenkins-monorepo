import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'

import { KeypadAdd } from '../KeypadAdd'

describe('KeypadAdd', () => {
  test('renders', async () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(<KeypadAdd/>)
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })
})
