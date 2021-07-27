import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'

import Home from '../index'

// eslint-disable-next-line react/display-name
jest.mock('next/image', () => ({ src, alt }: never) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} alt={alt} />
))

describe('index', () => {
  test('renders', async () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(<Home />)
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })
})
