import originalFetch from "node-fetch";
import fetchRetry from "fetch-retry";
import type { ClientConfiguration } from "../types/sdk/ClientConfiguration";

const getFetch = (clientConfiguration: ClientConfiguration) =>
	fetchRetry(originalFetch, {
		retries: clientConfiguration.retries ?? 3,
		retryDelay:
			clientConfiguration.retryDelay ?? ((attempt) => 2 ** attempt * 1000),
		retryOn: clientConfiguration.retryOn ?? [],
	});

export { getFetch };
