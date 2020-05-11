import writeFile from './writeFile'

export default async function createIpsecConf(
  ipAddress: string
): Promise<void> {
  const content = [
    'config setup',
    '',
    'conn myvpn',
    '    keyingtries=0',
    '    keyexchange=ikev1',
    '    authby=secret',
    '    ike=3des-sha1-modp1024!',
    '    esp=3des-sha1!',
    '    auto=start',
    '    left=%any',
    '    leftprotoport=udp/1701',
    '    rightprotoport=udp/1701',
    '    type=transport',
    `    right=${ipAddress}`
  ]

  await writeFile('/etc/ipsec.conf', content.join('\n'))
}
