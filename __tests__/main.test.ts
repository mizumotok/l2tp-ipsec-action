import * as exec from '@actions/exec'
import writeFile from '../src/writeFile'

jest.mock('@actions/exec', () => ({
  exec: jest.fn()
}))

jest.mock('../src/writeFile')

import createIpsecConf from '../src/createIpsecConf'
import createIpsecSecrets from '../src/createIpsecSecrets'
import createXl2tpdConf from '../src/createXl2tpdConf'
import createOptionsL2tpd from '../src/createOptionsL2tpd'
import createIpUpLocal from '../src/createIpUpLocal'

test('createIpsecConf', async () => {
  await createIpsecConf('10.1.10.1')
  expect(writeFile).toHaveBeenCalledWith(
    '/etc/ipsec.conf',
    expect.stringMatching(/^config setup\n.+\n    right=10\.1\.10\.1$/s)
  )
})

test('createIpsecSecrets', async () => {
  await createIpsecSecrets('pre-shared-key')
  expect(writeFile).toHaveBeenCalledWith(
    '/etc/ipsec.secrets',
    expect.stringMatching(': PSK "pre-shared-key"')
  )
})

test('createXl2tpdConf', async () => {
  await createXl2tpdConf('10.1.10.1')
  expect(writeFile).toHaveBeenCalledWith(
    '/etc/xl2tpd/xl2tpd.conf',
    expect.stringMatching(/^\[lac myvpn\]\nlns = 10\.1\.10\.1/s)
  )
})

test('createOptionsL2tpd', async () => {
  await createOptionsL2tpd('john', 'nhoj')
  expect(writeFile).toHaveBeenCalledWith(
    '/etc/ppp/options.l2tpd.client',
    expect.stringMatching(/^name john\npassword nhoj\n.+\nipparam monitor$/s)
  )
})

test('createIpUpLocal', async () => {
  await createIpUpLocal()
  expect(writeFile).toHaveBeenCalledWith(
    '/etc/ppp/ip-up.local',
    expect.stringMatching(/^#!\/bin\/bash\ncase/s)
  )
  expect(exec.exec).toHaveBeenCalledWith('sudo chmod +x /etc/ppp/ip-up.local')
})
