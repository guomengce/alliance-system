import { describe, expect, it } from 'vitest';
import { INITIAL_ADMIN_BROADCAST_CONFIG_DTO } from '../../mock/admin/broadcast';
import { getInitialAdminBroadcastConfig, mapAdminBroadcastConfigDto } from './broadcast';

describe('admin broadcast mappers', () => {
  it('maps broadcast config DTO into the broadcast config view model', () => {
    expect(mapAdminBroadcastConfigDto({
      notificationTemplate: 'Template',
      broadcastTitle: 'Title',
      broadcastBody: 'Body',
      broadcastTarget: 'all'
    })).toEqual({
      notificationTemplate: 'Template',
      broadcastTitle: 'Title',
      broadcastBody: 'Body',
      broadcastTarget: 'all'
    });
  });

  it('returns the initial broadcast config from mock DTO data', () => {
    expect(getInitialAdminBroadcastConfig()).toEqual(INITIAL_ADMIN_BROADCAST_CONFIG_DTO);
  });
});
