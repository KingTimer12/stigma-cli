import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'add',
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info },
    } = toolbox

    info(`Add command`)
  },
}