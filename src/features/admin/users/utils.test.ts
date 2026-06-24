import { describe, expect, it } from 'vitest';
import type { DownlineMember } from './types';
import {
  applyKycAudit,
  buildUpdatedUserFromForm,
  inferUserKycL2,
  transformAdminUsersResponse,
} from './utils';

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
  it('transforms backend-like users response into list members', () => {
    const result = transformAdminUsersResponse({
      users: [
        {
          uid: 'U1001',
          level: 'L2',
          tierName: 'Gold',
          registeredAt: '2026-06-01 10:00',
          avatarLetter: 'AL',
          investedAmount: 1200,
          profile: {
            nickname: 'Alice',
            email: 'alice@example.com',
            phone: '18800001111',
            sponsor: '999001',
            status: 'normal',
          },
          wallet: {
            usdtBalance: 100,
            frozenBalance: 5,
            trooBalance: 200,
            pendingBalance: 8,
          },
          team: {
            nodeSize: 12,
            volume: 3400,
          },
          kyc: {
            l1: 'verified',
            l2: 'pending',
          },
        },
      ],
      teamMembers: [
        {
          uid: 'T1001',
          name: 'Team Alice',
          level: 'L1',
          nodes: 6,
          volume: 900,
        },
      ],
    });

    expect(result.downlines[0]).toMatchObject({
      uid: 'U1001',
      level: 'L2',
      tier: 'Gold',
      registrationDate: '2026-06-01 10:00',
      nickname: 'Alice',
      email: 'alice@example.com',
      status: 'normal',
      usdtBalance: 100,
      nodeSize: 12,
      volume: 3400,
      kycL2: 'pending',
    });
    expect(result.teamMembers[0]).toEqual({
      uid: 'T1001',
      name: 'Team Alice',
      level: 'L1',
      nodes: '6人',
      volume: '900.00',
    });
  });

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
