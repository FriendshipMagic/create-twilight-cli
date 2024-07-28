import 'tailwindcss/tailwind.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './config/routes.tsx'

export default function App() {
    return <RouterProvider router={router} />
}
