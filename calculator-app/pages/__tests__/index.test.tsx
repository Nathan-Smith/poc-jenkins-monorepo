import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'

import Home from '../index'

jest.mock("next/image", () => ({ src, alt }: any) => <img src={src} alt={alt} />)

test('a', async () => {
  let component: ReactTestRenderer
  act(() => {
    component = renderer.create(<Home />)
  })

  expect(component!.toJSON()).toMatchSnapshot()
})
