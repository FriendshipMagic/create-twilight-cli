#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs'
import { execaSync } from 'execa'
import inquirer from 'inquirer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function copyRecursiveSync(src, dest) {
    const exists = existsSync(src)
    const stats = exists && statSync(src)
    const isDirectory = exists && stats.isDirectory()
    if (isDirectory) {
        if (!existsSync(dest)) {
            mkdirSync(dest)
        }
        readdirSync(src).forEach(childItemName => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName))
        })
    } else {
        copyFileSync(src, dest)
    }
}

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

    if (!existsSync(projectPath)) {
        mkdirSync(projectPath)
    }

    const templatePath = path.join(__dirname, 'template')

    copyRecursiveSync(templatePath, projectPath)

    console.log(`Creating a new project in ${projectPath}.`)

    execaSync('npm', ['install'], { cwd: projectPath, stdio: 'inherit' })

    console.log('Project setup complete!')
}

main().catch(err => {
    console.error(err)
})
