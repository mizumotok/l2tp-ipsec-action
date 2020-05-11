import * as exec from '@actions/exec'

jest.mock('@actions/exec', () => ({
  exec: jest.fn()
}))

import writeFile from '../src/writeFile'

test('writeFile', () => {
  writeFile('/tmp/testfile', ['#!/bin/bash', 'line2'].join('\n'))
  expect(exec.exec).toHaveBeenCalledWith(
    expect.stringMatching(/^sudo mv .+ \/tmp\/testfile$/)
  )
})
