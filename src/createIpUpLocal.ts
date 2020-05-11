import * as exec from '@actions/exec'
import writeFile from './writeFile'

export default async function createIpUpLocal(): Promise<void> {
  const content = [
    '#!/bin/bash',
    'case "$6" in',
    'monitor)',
    'sbin/route add -net ${4%.*}.0 netmask 255.255.255.0 gw $4',
    'echo',
    ';;',
    'esac'
  ]
  await writeFile('/etc/ppp/ip-up.local', content.join('\n'))
  await exec.exec('sudo chmod +x /etc/ppp/ip-up.local')
}
