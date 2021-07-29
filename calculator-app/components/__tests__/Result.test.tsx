import React from 'react'
import renderer, { act, ReactTestRenderer } from 'react-test-renderer'
import { cleanup, fireEvent, render } from '@testing-library/react'

import { Result } from '../Result'

describe('Result', () => {
  test('renders', () => {
    let component: ReactTestRenderer | undefined
    act(() => {
      component = renderer.create(<Result />)
    })

    expect(component?.toJSON()).toMatchSnapshot()
  })

  test.each`
    input                 | expected
    ${'42'}               | ${'42'}
    ${'test'}             | ${''}
    ${'t3st'}             | ${''}
    ${'-42'}              | ${'-42'}
    ${'42.5646'}          | ${'42.5646'}
    ${'-42.5646'}         | ${'-42.5646'}
    ${'-4,242.5646'}      | ${'-4,242.5646'}
    ${'-42,424,242.5646'} | ${'-42,424,242.5646'}
    ${'42...'}            | ${'42.'}
    ${'----42'}           | ${'-'}
    ${'42,,,,'}           | ${'42,'}
    ${'42,,,,42'}         | ${'42,'}
    ${'424242,424242,'}   | ${'424242'}
    ${'424,2424242'}      | ${'424,242'}
    ${',42424242'}        | ${''}
    ${'-4,24'}            | ${'-4,24'}
    ${'-4,24'}            | ${'-4,24'}
    ${'-4,24.242'}        | ${'-4,24'}
    ${'42,'}              | ${'42,'}
    ${'42.'}              | ${'42.'}
  `('"$input" entered should be "$expected"', ({ input, expected }) => {
    const { getByTestId } = render(<Result />)

    expect((getByTestId(/result-input/i) as HTMLInputElement).value).toBe('')

    fireEvent.change(getByTestId(/result-input/i), { target: { value: input } })

    expect((getByTestId(/result-input/i) as HTMLInputElement).value).toBe(
      expected
    )
  })
})
