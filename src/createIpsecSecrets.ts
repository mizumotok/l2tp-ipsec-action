import writeFile from './writeFile'

export default async function createIpsecConf(psk: string): Promise<void> {
  const content = `: PSK "${psk}"`

  await writeFile('/etc/ipsec.secrets', content)
}
