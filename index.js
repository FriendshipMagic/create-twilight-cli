#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'
import { existsSync } from 'fs'
import { mkdirSync, copyFileSync, readdirSync } from 'fs'
import { execaSync } from 'execa'
import inquirer from 'inquirer'

// 获取当前文件路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'Project name:',
        },
    ])

    const projectName = answers.projectName || 'my-app'
    const projectPath = path.join(process.cwd(), projectName)

    if (!existsSync(projectPath)) {
        mkdirSync(projectPath)
    }

    const templatePath = path.join(__dirname, 'template')
    const filesToCopy = readdirSync(templatePath)

    filesToCopy.forEach(file => {
        copyFileSync(path.join(templatePath, file), path.join(projectPath, file))
    })

    console.log(`Creating a new project in ${projectPath}.`)

    execaSync('npm', ['install'], { cwd: projectPath, stdio: 'inherit' })

    console.log('Project setup complete!')
}

main().catch(err => {
    console.error(err)
})
