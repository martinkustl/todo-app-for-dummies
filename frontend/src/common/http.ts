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
};

export async function http<T>({ input, body, method, settings }: Http): Promise<HttpResponse<T>> {
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

		const jsonResponse = await res.json();

		if (!res.ok) {
			throw new HttpError(400, JSON.stringify(jsonResponse.errors));
		}

		if (!jsonResponse) return { ...res };

		return { ...res, parsedBody: jsonResponse };
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (err: any) {
		if (err instanceof HttpError) {
			notifications.danger(`Error! Code: ${err.statusCode}, Message: ${err.message}`);
		}

		console.log(err);
		throw new Error(err);
	}
}
