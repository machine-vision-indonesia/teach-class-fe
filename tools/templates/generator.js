// eslint-disable-next-line @typescript-eslint/no-var-requires
const { program } = require('commander')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

program
  .command('generate')
  .option('-n, --name <type>', 'name of context')
  .option('-t, --type <type>', 'name of type [complex,atom,molecule]')
  .option('-c, --core', 'define if template is core complexes')
  .action(options => {
    generateTemplate(options)
  })

const generateTemplate = options => {
  // console.log('Current working directory:', process.cwd())

  const templatePath = path.join(process.cwd(), '/src/@example/complexes-template')

  const complexPath = options.core
    ? `/src/components/complexes-core/${options.name}`
    : `/src/components/complexes/${options.name}`

  const targetPath = path.join(process.cwd(), complexPath)

  try {
    console.log('Check directory...')
    const stat = fs.statSync(targetPath)
    if (stat.isDirectory()) {
      console.log('Directory exists.')
      console.log('generating complex template...')

      fs.cpSync(templatePath, targetPath, {
        recursive: true,
        overwrite: false
      })
      console.log('done')
    } else {
      console.log('Path exists, but it is not a directory.')
    }

    return
  } catch (err) {
    console.log('err', err)
    if (err.code === 'ENOENT') {
      console.log('Repo belum ada atau belum sesuai dengan namanya, tambahkan submodule dulu !!!!')
      console.log('gagal')
    } else {
      console.error('Error checking directory:', err)
    }

    return
  }
}

program.parse()
