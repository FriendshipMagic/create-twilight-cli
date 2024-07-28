#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs-extra'
import { execaSync } from 'execa'
import inquirer from 'inquirer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Project name:'
        }
    ])
    const projectName = answers.name || 'my-app'
    const projectPath = path.join(process.cwd(), projectName)

    const { copySync, ensureDirSync, pathExistsSync } = fs
    if (!pathExistsSync(projectPath)) {
        ensureDirSync(projectPath)
    }

    const templatePath = path.join(__dirname, 'template')
    // 递归复制目录
    copySync(templatePath, projectPath)

    console.log(`Creating a new project in ${projectPath}.`)

    execaSync('npm', ['install'], { cwd: projectPath, stdio: 'inherit' })
    console.log('Project setup complete!')
}

main().catch(err => {
    console.error(err)
})
