#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs-extra'
import { execaSync } from 'execa'
import inquirer from 'inquirer'
import chalk from 'chalk'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Project name:'
        },
        {
            type: 'select',
            name: 'package',
            message: 'yarn/npm',
            choices: ['yarn', 'npm']
        }
    ])
    const projectName = answers.name || 'my-app'
    const projectPackage = answers.package || ''
    const projectPath = path.join(process.cwd(), projectName)
    const templatePath = path.join(__dirname, 'template')

    const { copySync, ensureDirSync, pathExistsSync } = fs
    if (!pathExistsSync(projectPath)) {
        ensureDirSync(projectPath, undefined)
    }

    // 递归复制目录
    // 排除 .git 目录或文件
    copySync(templatePath, projectPath, {
        filter: (src) => path.basename(src) !== '.git'
    })

    console.log(chalk.green(`Creating a new project in ${projectPath}.`))

    // 初始化 Git 仓库并进行初次提交
    execaSync('git', ['init'], { cwd: projectPath, stdio: 'inherit' })
    execaSync('git', ['add', '.'], { cwd: projectPath, stdio: 'inherit' })
    execaSync('git', ['commit', '-m', 'feat: twilight app init'], { cwd: projectPath, stdio: 'inherit' })
    console.log(chalk.green('Git repository initialized and initial commit made!'))

    // 安装 node modules
    execaSync(projectPackage, ['install'], { cwd: projectPath, stdio: 'inherit' })
    console.log(chalk.green('Project setup complete!'))
}

main().catch(err => {
    console.error(chalk.red(err))
})
