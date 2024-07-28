import { GithubOutlined } from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
    {
        label: <Link to="doc">文档</Link>,
        key: '/doc',
    },
]

export default function TopNavigator() {
    const { pathname } = useLocation()

    return (
        <div className="flex w-full flex-row items-center justify-between">
            <div className="flex grow flex-row items-center space-x-2">
                <Link className="flex flex-row items-center gap-1" to="/">
                    <Icon icon="fluent-emoji-high-contrast:unicorn" fontSize={24} />
                    <p className="text-xl font-bold text-inherit">Twilight Cli</p>
                </Link>
                <div>
                    <Menu className="grow" selectedKeys={[pathname]} mode="horizontal" items={items} />
                </div>
            </div>
            <Link target="_blank" to="https://github.com/FriendshipMagic/twilight-cli">
                <GithubOutlined className="flex flex-col justify-center text-2xl" />
            </Link>
        </div>
    )
}
