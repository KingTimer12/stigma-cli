import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'remove',
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info },
    } = toolbox

    info(`Remove command`)
  },
}