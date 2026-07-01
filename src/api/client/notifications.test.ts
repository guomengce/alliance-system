import { describe, expect, it } from 'vitest';
import {
  deleteNotification,
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead
} from './notifications';

describe('client notifications api', () => {
  it('loads notifications through the project api request layer', async () => {
    const notifications = await getNotifications();

    expect(Array.isArray(notifications)).toBe(true);
    expect(notifications.length).toBeGreaterThan(0);
    expect(notifications[0]).toEqual(expect.objectContaining({
      id: expect.any(String),
      title: expect.any(String),
      isUnread: expect.any(Boolean)
    }));
  });

  it('updates notification read state through api methods', async () => {
    const before = await getNotifications();
    const unread = before.find((item) => item.isUnread) ?? before[0];

    const after = await markNotificationRead(unread.id);

    expect(after).toEqual(expect.any(Array));
    expect(after.find((item) => item.id === unread.id)?.isUnread).toBe(false);
  });

  it('marks all notifications read and deletes by id', async () => {
    const allRead = await markAllNotificationsRead();
    expect(allRead.every((item) => !item.isUnread)).toBe(true);

    const target = allRead[0];
    const afterDelete = await deleteNotification(target.id);

    expect(afterDelete.some((item) => item.id === target.id)).toBe(false);
  });
});
