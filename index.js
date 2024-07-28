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
    const templatePath = path.join(__dirname, 'template')

    const { copySync, ensureDirSync, pathExistsSync } = fs
    if (!pathExistsSync(projectPath)) {
        ensureDirSync(projectPath, undefined)
    }

    // 递归复制目录
    // 排除 .git 目录
    copySync(templatePath, projectPath, {
        filter: (src) => !src.includes('.git')
    })


    console.log(`Creating a new project in ${projectPath}.`)

    execaSync('npm', ['install'], { cwd: projectPath, stdio: 'inherit' })
    console.log('Project setup complete!')

    // 初始化 Git 仓库并进行初次提交
    execaSync('git', ['init'], { cwd: projectPath, stdio: 'inherit' })
    execaSync('git', ['add', '.'], { cwd: projectPath, stdio: 'inherit' })
    execaSync('git', ['commit', '-m', 'feat: twilight app init'], { cwd: projectPath, stdio: 'inherit' })
    console.log('Git repository initialized and initial commit made!')
}

main().catch(err => {
    console.error(err)
})
