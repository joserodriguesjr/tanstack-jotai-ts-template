/// <reference types="vinxi/types/client" />
import { StartClient } from '@tanstack/react-start';
import { hydrateRoot } from 'react-dom/client';

import '@/shared/lib/i18n';
import { createRouter } from '@/router';

const router = createRouter();

hydrateRoot(document, <StartClient router={router} />);
