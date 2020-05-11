import writeFile from './writeFile'

export default async function createXl2tpdConf(
  ipAddress: string
): Promise<void> {
  const content = [
    '[lac myvpn]',
    `lns = ${ipAddress}`,
    'ppp debug = yes',
    'pppoptfile = /etc/ppp/options.l2tpd.client',
    'length bit = yes',
    'autodial = yes',
    'redial = yes',
    'redial timeout = 10',
    'max redials = 6'
  ]

  await writeFile('/etc/xl2tpd/xl2tpd.conf', content.join('\n'))
}
