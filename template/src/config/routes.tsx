import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home.tsx'
import About from '../pages/About.tsx'
import Doc from '../pages/Doc.tsx'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: '/',
                element: <About />,
            },
            {
                path: 'doc',
                element: <Doc />,
            },
        ],
    },
])
