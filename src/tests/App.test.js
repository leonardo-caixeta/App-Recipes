import React from 'react';
import { renderHook } from '@testing-library/react';
import App from '../App';

test('Farewell, front-end', () => {
  renderHook(() => <App />);
});
