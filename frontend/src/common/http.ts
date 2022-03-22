import { HttpError } from '../common/errors';
import { notifications } from '../stores/notifications';

interface HttpResponse<T> extends Response {
	parsedBody?: T;
}

type Http = {
	input: RequestInfo;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	body?: any;
	method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE';
	settings?: RequestInit;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onError?: (err: HttpError) => void;
};

export async function http<T>({
	input,
	body,
	method,
	settings,
	onError
}: Http): Promise<HttpResponse<T>> {
	try {
		// body?: BodyInit | null;

		const res = await fetch(input, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			method,
			body: JSON.stringify(body),
			...settings
		});

		if (!res.ok) {
			// throw await res.json();
			throw new HttpError(400, 'Unknown error');
		}

		const parsedBody = await res.json();

		if (!parsedBody) return { ...res };

		return { ...res, parsedBody };
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		if (err instanceof HttpError && onError) {
			onError(err);
		}

		console.log(err);

		if (err instanceof HttpError) {
			console.log('got here!');
			notifications.danger(`Error! Code: ${err.statusCode}, Message: ${err.message}`);
		}

		console.log(err);
		throw new Error(err);
	}
}
