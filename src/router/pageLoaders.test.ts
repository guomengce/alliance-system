import { describe, expect, it } from 'vitest';
import { ADMIN_ROUTE_ENTRIES, CLIENT_ROUTE_ENTRIES } from './routes';
import { ADMIN_PAGE_COMPONENTS, CLIENT_PAGE_COMPONENTS } from './pageLoaders';

describe('page loaders', () => {
  it('registers a lazy component for every client route', () => {
    expect(Object.keys(CLIENT_PAGE_COMPONENTS).sort()).toEqual(
      CLIENT_ROUTE_ENTRIES.map((entry) => entry.routeId).sort()
    );
  });

  it('registers a lazy component for every admin route', () => {
    expect(Object.keys(ADMIN_PAGE_COMPONENTS).sort()).toEqual(
      ADMIN_ROUTE_ENTRIES.map((entry) => entry.routeId).sort()
    );
  });
});
