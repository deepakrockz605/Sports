import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PageNotFound from './Component/PageNotFound/index'

test('renders learn react link', () => {
  const { getByText } = render(<PageNotFound />)
  const linkElement = getByText(/Page /i)
  expect(linkElement).toBeInTheDocument()
})
