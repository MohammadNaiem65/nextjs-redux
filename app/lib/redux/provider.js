'use client';

import { Provider } from 'react-redux';
import { getStore } from './store';
import { useRef } from 'react';

export function ReduxProvider({ children }) {
    // Use useRef to ensure consistent store reference
    const storeRef = useRef(getStore());

    return <Provider store={storeRef.current}>{children}</Provider>;
}
