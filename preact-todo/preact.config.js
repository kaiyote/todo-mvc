import { resolve } from 'path'

const preactContextFile = resolve(__dirname, 'aliases', 'createPreactContext')

export default function (config) {
  config.resolve.alias['create-react-context'] = preactContextFile
  config.resolve.alias['react-dom'] = preactContextFile
  config.resolve.alias.react = preactContextFile
  return config
}
