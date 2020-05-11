import * as exec from '@actions/exec'
import * as fs from 'fs'
import * as tmp from 'tmp'

export default async function writeFile(
  file: string,
  data: string
): Promise<void> {
  const tmpobj = tmp.fileSync()
  fs.writeFileSync(tmpobj.name, data)

  await exec.exec(`sudo mv ${tmpobj.name} ${file}`)
}
