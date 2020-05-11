import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as process from 'process'
import createIpsecConf from './createIpsecConf'
import createIpsecSecrets from './createIpsecSecrets'
import createXl2tpdConf from './createXl2tpdConf'
import createOptionsL2tpd from './createOptionsL2tpd'
import createIpUpLocal from './createIpUpLocal'

const env = process.env
if (env.RUNNER_OS !== 'Linux') {
  core.setFailed(`Unsupported Platform: ${env.RUNNER_OS}`)
  process.exit(1)
}

async function run(): Promise<void> {
  try {
    const psk = core.getInput('pre-shared-key', {required: true})
    const ipAddress = core.getInput('ip-address', {required: true})
    const username = core.getInput('username', {required: true})
    const password = core.getInput('password', {required: true})

    await exec.exec('sudo apt-get install strongswan xl2tpd apparmor-utils')
    await exec.exec('sudo aa-complain /usr/lib/ipsec/charon')

    await createIpsecConf(ipAddress)
    await createIpsecSecrets(psk)
    await createXl2tpdConf(ipAddress)
    await createOptionsL2tpd(username, password)
    await createIpUpLocal()

    await exec.exec('sudo systemctl enable ipsec xl2tpd')
    await exec.exec('sudo systemctl restart ipsec xl2tpd')
    await exec.exec(
      'sudo sh -c "echo \'c myvpn\' > /var/run/xl2tpd/l2tp-control"'
    )
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
