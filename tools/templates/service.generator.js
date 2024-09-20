/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv')
const axios = require('axios')
const { program } = require('commander')
const fs = require('fs')
const path = require('path')

dotenv.config() // Load environment variables from .env file
const apiUrl = process.env.MVTOOL_URL
const token = process.env.MVTOOL_KEY
const fileKey = process.env.FIQMA_KEY

function convertToKebabCase(str) {
  // Convert to lower case and replace spaces with hyphens
  return str
    .replace(/[\s_]+/g, '-')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

function groupByParentName(array) {
  const grouped = {}
  array.forEach(item => {
    const parentName = item.parent_id.name
    if (!grouped[parentName]) {
      grouped[parentName] = []
    }
    grouped[parentName].push(item)
  })

  return grouped
}

// Function to fetch data from the API
async function fetchData() {
  try {
    console.log('Fetching data...')
    const { data } = await axios.get(apiUrl + '/items/figma_frame', {
      headers: {
        Authorization: `Bearer ${token}` // Include token in the request headers
      },
      params: {
        fields: ['service_hooks.*', 'name', 'parent_id.name'],
        'filter[_and][0][fileKey][_contains]': fileKey,
        'filter[_and][1][count(service_hooks)][_gt]': 0
      }
    })

    console.log('Data fetched successfully!', data?.data?.length)

    return data?.data
  } catch (error) {
    throw new Error('Error fetching data:', error)
  }
}

program
  .command('generate')

  // .option('-p, --project <type>', 'name of project')
  .option('-n, --name <type>', 'name of complex')
  .action(options => {
    generateTemplate(options)
  })

const generateTemplate = async options => {
  console.log('Current working directory:', process.cwd())
  console.log('Data:', options)

  try {
    const data = await fetchData()
    const features = groupByParentName(data)
    const featureskeys = Object.keys(features)

    console.log('Grouped data:', groupByParentName(data))

    for (const featureskey of featureskeys) {
      const featurePath = `./src/components/complexes/${options.name}/service/${convertToKebabCase(featureskey)}/`

      // Check if the directory exists
      if (!fs.existsSync(featurePath)) {
        // If it doesn't exist, create the directory
        fs.mkdirSync(featurePath, { recursive: true })
        console.log(`Directory ${featurePath} created successfully.`)
      } else {
        console.log(`Directory ${featurePath} already exists.`)
      }

      for (const feature of features[featureskey]) {
        const sectionPath = `${featurePath}/${convertToKebabCase(feature.name)}/`

        // Check if the directory exists
        if (!fs.existsSync(sectionPath)) {
          // If it doesn't exist, create the directory
          fs.mkdirSync(sectionPath, { recursive: true })
          console.log(`Directory ${sectionPath} created successfully.`)
        } else {
          console.log(`Directory ${sectionPath} already exists.`)
        }

        // console.log(options.project)

        for (const service_hook of feature.service_hooks) {
          // Content to be written to the file
          const content = service_hook.content

          // File path where you want to create the file
          // const words = service_hook.name.split(' ') // Split the string by spaces
          // const lastWord = words[words.length - 1]
          const fileName = `${service_hook.type}-${convertToKebabCase(service_hook.name)}.service.ts`
          const filePath = path.join(sectionPath, fileName)

          // Check if the file already exists
          if (!fs.existsSync(filePath)) {
            // If the file does not exist, write content to the file
            // Write content to the file
            fs.writeFile(filePath, content, err => {
              if (err) {
                console.error('Error writing to file:', err)
              } else {
                console.log(filePath + ' created successfully!')
              }
            })
          } else {
            console.log(`File ${fileName} already exists in ${sectionPath}. It will not be overwritten.`)
          }
        }
      }
    }
  } catch (error) {
    console.error(error)
  }
}

program.parse()
