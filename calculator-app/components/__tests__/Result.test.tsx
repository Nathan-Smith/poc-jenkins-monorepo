import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'

import { Result } from '../Result'

describe('Result', () => {
  test('renders', () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(<Result value="42" />)
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })

  test('update value', () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(<Result value="42" />)
    })

    act(() => {
      component?.update(<Result value="69" />)
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })
})
