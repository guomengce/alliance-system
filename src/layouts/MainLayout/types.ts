import type { useAppContext } from '../../context/AppContext';

export type AppStateContext = ReturnType<typeof useAppContext>;

export type LangCode = 'zh' | 'en' | 'zht';

