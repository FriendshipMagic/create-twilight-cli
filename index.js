#!/usr/bin/env node

const { program } = require('commander')
const execa = require('execa')
const fs = require('fs-extra')
const path = require('path')

program.version('1.0.0').argument('<project-name>', 'Name of the new project').action((projectName) => {
    const projectPath = path.join(process.cwd(), projectName)
    const templatePath = path.join(__dirname, 'template')

    if (fs.existsSync(projectPath)) {
        console.error(`Project "${projectName}" already exists.`)
        process.exit(1)
    }

    fs.copySync(templatePath, projectPath)

    execa.sync('npm', ['install'], { cwd: projectPath, stdio: 'inherit' })

    console.log(`Project "${projectName}" created successfully!`)
})

program.parse(process.argv)
