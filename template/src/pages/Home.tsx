import { Layout } from 'antd'
import { Link, Outlet } from 'react-router-dom'
import TopNavigator from '../components/TopNavigator.tsx'

const { Header, Content, Footer } = Layout

export default function Home() {
    return (
        <Layout className="min-h-screen">
            <Header className="flex h-16 flex-row items-center bg-white p-5">
                <TopNavigator />
            </Header>
            <Content className="flex grow flex-col p-4">
                <Outlet />
            </Content>
            <Footer className="flex h-10 items-center justify-center bg-white text-center">
                Powered by&nbsp;
                <Link className="text-blue-500" target="_blank" to="https://github.com/FriendshipMagic">
                    FriendshipMagic
                </Link>
            </Footer>
        </Layout>
    )
}
