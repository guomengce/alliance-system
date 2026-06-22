import { describe, expect, it } from 'vitest';
import { getInitialAdminLogs } from './admin/logs';
import { getInitialAdminReportData } from './admin/reports';
import { getInitialAdminTrendData } from './admin/dashboard';
import { getInitialTeamMembers } from './admin/users';
import { getInitialClientCommissionData } from './client/commission';
import { getInitialClientHomeData } from './client/home';
import { getInitialClientMemberData } from './client/member';
import { getInitialClientSettingsData } from './client/settings';

describe('page seed data', () => {
  it('returns admin page seed arrays from mock modules', () => {
    expect(getInitialAdminTrendData().length).toBeGreaterThan(0);
    expect(getInitialAdminReportData().metrics.length).toBeGreaterThan(0);
    expect(getInitialAdminLogs().length).toBeGreaterThan(0);
    expect(getInitialTeamMembers().length).toBeGreaterThan(0);
  });

  it('returns client page seed arrays from mock modules', () => {
    expect(getInitialClientCommissionData().history.length).toBeGreaterThan(0);
    expect(getInitialClientHomeData().marketData.length).toBeGreaterThan(0);
    expect(getInitialClientMemberData().recentActivities.length).toBeGreaterThan(0);
    expect(getInitialClientSettingsData().activeDevices.length).toBeGreaterThan(0);
  });
});
