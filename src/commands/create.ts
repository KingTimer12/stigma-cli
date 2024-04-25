import { GluegunToolbox, filesystem } from 'gluegun'

module.exports = {
  name: 'create',
  description: "Create your API project.",
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { info, error },
      parameters,
      prompt: { ask },
      filesystem: { isDirectory, dir }
    } = toolbox

    const { project_name } = !parameters.first ? await ask({
        type: "input",
        name: "project_name",
        message: "Project name:",
        required: true
    }) : { project_name: parameters.first }

    if (isDirectory(project_name)) {
        return error(`A project with name ${project_name} already exists`)
    }

    const {
        project_version, 
        project_author, 
        project_packager, 
        project_framework 
    } = !parameters.options.y ? await ask([
        {
            type: "input",
            name: "project_version",
            message: "Project version:",
            required: false
        },
        {
            type: "input",
            name: "project_author",
            message: "Project author:",
            required: false
        },
        {
            type: "select",
            name: "project_packager",
            message: "Packager manager:",
            required: true,
            choices: [
                "npm",
                "pnpm",
                "yarn",
                "bun"
            ]
        },
        {
            type: "select",
            name: "project_framework",
            message: "Framework:",
            required: true,
            choices: [
                "express",
                "fastify"
            ]
        }
    ]) : {
        project_version: "0.0.1",
        project_author: "",
        project_packager: "npm",
        project_framework: "express"
    }

    const cwd = filesystem.cwd()
    dir(`${cwd}${filesystem.separator}${project_name}`)

    info(`${project_author} ${project_framework} ${project_packager} ${project_version}`)
  },
}