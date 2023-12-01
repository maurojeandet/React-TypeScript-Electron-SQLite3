import { HashRouter, Route, Routes } from 'react-router-dom'
import Layout from '@components/Layout'
import Home from '@/components/Home'
import DBEntities from '@/components/DBEntities'
import AddDBEntity from '@/components/DBEntities/add'
import UpdateDBEntity from '@/components/DBEntities/update'

const AppRoutes = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path='/' element={<Layout page={<Home />} />} />
                <Route path='/db-entities' element={<Layout page={<DBEntities />} />} />
                <Route path='/db-entities/add' element={<Layout page={<AddDBEntity />} />} />
                <Route path='/db-entities/:id/edit' element={<Layout page={<UpdateDBEntity />} />} />
            </Routes>
        </HashRouter>
    )
}

export default AppRoutes

export const Paths = [
    {
        path: '/',
        name: 'Home'
    },
    {
        path: '/db-entities',
        name: 'DB Entities'
    }
]