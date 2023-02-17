import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './components/MainLayout/MainLayout';
import { LearnPage } from './components/LearnPage/LearnPage';
import { MemoryCardsPage } from './components/MemoryCardsPage/MemoryCardsPage';
import { MemoryTestPage } from './components/MemoryTestPage/MemoryTestPage';
import { InProgressPage } from './components/InProgressPage/InProgressPage';

function App() {
    const element = createBrowserRouter([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    path: 'memory-cards',
                    element: <MemoryCardsPage />,
                },
                {
                    path: 'test',
                    element: <MemoryTestPage />,
                },
                {
                    path: 'folders',
                    element: <InProgressPage />,
                },
            ],
        },
    ]);

    return <RouterProvider router={element} />;
}

export default App;
