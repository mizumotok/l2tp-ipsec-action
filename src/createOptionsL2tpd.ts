import writeFile from './writeFile'

export default async function createOptionsL2tpd(
  username: string,
  password: string
): Promise<void> {
  const content = [
    `name ${username}`,
    `password ${password}`,
    'ipcp-accept-local',
    'ipcp-accept-remote',
    'refuse-eap',
    'require-pap',
    'noccp',
    'noauth',
    'idle 1800',
    'mtu 1410',
    'mru 1410',
    'defaultroute',
    'usepeerdns',
    'debug',
    'connect-delay 5000',
    'multilink',
    'ipparam monitor'
  ]

  await writeFile('/etc/ppp/options.l2tpd.client', content.join('\n'))
}
