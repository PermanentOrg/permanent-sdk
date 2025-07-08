import { isAccountVo } from "../types";
import { makePermanentApiCall, typedJsonParse } from "../utils";
import type { ClientConfiguration, AccountVo } from "../types";

export const getAuthenticatedAccountVo = async (
	clientConfiguration: ClientConfiguration,
): Promise<AccountVo> => {
	const response = await makePermanentApiCall(
		clientConfiguration,
		"/account/getAuthenticatedAccount",
		{ method: "GET" },
	);
	const responseText = await response.text();
	return typedJsonParse(responseText, isAccountVo);
};
