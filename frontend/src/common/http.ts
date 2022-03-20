interface HttpResponse<T> extends Response {
	parsedBody?: T;
	err?: any;
}

export async function http<T>(
	input: RequestInfo,
	settings: RequestInit | undefined = {}
): Promise<HttpResponse<T>> {
	try {
		const res = await fetch(input, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			...settings
		});

		if (!res.ok) {
			throw await res.json();
		}

		return { ...res, parsedBody: await res.json() };
	} catch (err: any) {
		console.log(err);
		throw err;
	}
}
