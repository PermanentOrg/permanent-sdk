import originalFetch from "node-fetch";
import fetchRetry from "fetch-retry";
import type { ClientConfiguration } from "../types/sdk/ClientConfiguration";
const DEFAULT_RETRIES = 3;
const EXPONENTIAL_BACKOFF_FACTOR = 2;
const MS_PER_SECOND = 1000;

const getFetch = (
	clientConfiguration: ClientConfiguration,
): ReturnType<typeof fetchRetry<typeof originalFetch>> =>
	fetchRetry(originalFetch, {
		retries: clientConfiguration.retries ?? DEFAULT_RETRIES,
		retryDelay:
			clientConfiguration.retryDelay ??
			((attempt) => EXPONENTIAL_BACKOFF_FACTOR ** attempt * MS_PER_SECOND),
		retryOn: clientConfiguration.retryOn ?? [],
	});

export { getFetch };
