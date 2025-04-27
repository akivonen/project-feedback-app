// jest.setup-env.js
import { configure } from '@testing-library/react';

// Force React 18 concurrent rendering support
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
process.env.IS_REACT_ACT_ENVIRONMENT = 'true';

// Configure testing-library
configure({ asyncUtilTimeout: 2000 });
