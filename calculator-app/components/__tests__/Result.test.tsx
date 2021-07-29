import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'
import { cleanup, fireEvent, render } from '@testing-library/react'

import { Result } from '../Result'

describe('Result', () => {
  test('renders', async () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(<Result />)
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })

  test('values', async () => {
    const { getByTestId } = render(<Result />)

    expect((getByTestId(/result-input/i) as HTMLInputElement).value).toBe('')

    fireEvent.change(getByTestId(/result-input/i), { target: { value: '42' } })

    expect((getByTestId(/result-input/i) as HTMLInputElement).value).toBe('42')
  })
})
