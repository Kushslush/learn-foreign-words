import { useState } from 'react';
import { InProgressPage } from '../InProgressPage/InProgressPage';

export const MemoryTestPage = () => {
    const [state, setState] = useState('');

    return <InProgressPage />;
};
