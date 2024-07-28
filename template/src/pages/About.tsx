import { subtitle, title } from '../utils/primitives.ts'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'

export default function About() {
    return (
        <div className="flex h-full w-full grow flex-col items-center justify-center">
            <div className="inline-block max-w-lg justify-center text-center">
                <span className={title({ color: 'violet' })}>Twilight Cli</span>
                <h2 className={subtitle({ class: 'mt-4' })}>Frontend is Magic: 快速构建现代react项目</h2>
            </div>
            <div className="mt-8 flex items-center justify-center gap-3">
                <Link to="doc">
                    <Button shape="round" className="text-lg" type="primary">
                        {/*encode \'*/}
                        Let&apos;s Start!
                        <ArrowRightOutlined />
                    </Button>
                </Link>
            </div>
        </div>
    )
}
