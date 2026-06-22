import { describe, expect, it } from 'vitest';
import type { DownlineMember } from './types';
import { applyKycAudit, buildUpdatedUserFromForm, inferUserKycL2 } from './utils';

const baseUser: DownlineMember = {
  uid: '1001',
  level: 'L1',
  tier: '标准账户',
  registrationDate: '2026-01-01',
  nodeSize: 2,
  volume: 1200,
  avatarLetter: 'A',
  invested: 100
};

describe('admin user helpers', () => {
  it('applies KYC audit decisions without mutating other users', () => {
    const otherUser = { ...baseUser, uid: '1002' };
    const accepted = applyKycAudit([baseUser, otherUser], '1001', true);
    const rejected = applyKycAudit([baseUser, otherUser], '1001', false);

    expect(accepted[0]).toMatchObject({ tier: '已认证', kycL2: 'verified' });
    expect(rejected[0]).toMatchObject({ tier: '标准账户', kycL2: 'unverified' });
    expect(accepted[1]).toBe(otherUser);
  });

  it('infers missing KYC L2 status from tier or volume', () => {
    expect(inferUserKycL2({ ...baseUser, tier: '已认证' })).toBe('verified');
    expect(inferUserKycL2({ ...baseUser, tier: '标准账户', volume: 3000 })).toBe('pending');
    expect(inferUserKycL2({ ...baseUser, tier: '标准账户', volume: 100 })).toBe('unverified');
    expect(inferUserKycL2({ ...baseUser, kycL2: 'verified' })).toBe('verified');
  });

  it('builds a saved user from form values and preserves password when blank', () => {
    const updated = buildUpdatedUserFromForm(
      { ...baseUser, password: 'old-password' },
      {
        nickname: 'Alice',
        email: 'alice@example.com',
        phone: '123',
        sponsor: '999001 (SYS)',
        password: '',
        status: 'frozen',
        registrationDate: '2026-02-02',
        tier: '标准账户',
        usdtBalance: 10,
        frozenBalance: 2,
        trooBalance: 3,
        pendingBalance: 4,
        nodeSize: 5,
        volume: 6,
        kycL1: 'verified',
        kycL2: 'pending'
      }
    );

    expect(updated).toMatchObject({
      nickname: 'Alice',
      status: 'frozen',
      tier: '待认证',
      password: 'old-password',
      usdtBalance: 10,
      nodeSize: 5,
      volume: 6,
      kycL2: 'pending'
    });
  });
});
