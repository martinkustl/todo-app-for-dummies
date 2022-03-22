import { writable, derived, type Readable } from 'svelte/store';

type Notification = {
	id: string;
	message: string;
	type: string;
	timeout: number;
};

const createNotificationStore = (timeout = 2000) => {
	const _notifications = writable<Notification[]>([]);

	function send(message: string, type = 'default', timeout: number) {
		_notifications.update((state) => {
			return [...state, { id: id(), type, message, timeout }];
		});
	}

	const notifications: Readable<Notification[]> = derived(
		_notifications,
		($_notifications, set) => {
			set($_notifications);
			if ($_notifications.length > 0) {
				const timer = setTimeout(() => {
					_notifications.update((state) => {
						state.shift();
						return state;
					});
				}, $_notifications[0].timeout);
				return () => {
					clearTimeout(timer);
				};
			}
		}
	);
	const { subscribe } = notifications;

	return {
		subscribe,
		send,
		default: (msg: string) => send(msg, 'default', timeout),
		danger: (msg: string) => send(msg, 'danger', timeout),
		warning: (msg: string) => send(msg, 'warning', timeout),
		info: (msg: string) => send(msg, 'info', timeout),
		success: (msg: string) => send(msg, 'success', timeout)
	};
};
function id() {
	return '_' + Math.random().toString(36).substring(2, 9);
}

export const notifications = createNotificationStore();
