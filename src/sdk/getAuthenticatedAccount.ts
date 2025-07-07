import { getAuthenticatedAccountVo } from "../api";
import { accountVoToAccount } from "../utils";
import type { Account, ClientConfiguration } from "../types";

export const getAuthenticatedAccount = async (
	clientConfiguration: ClientConfiguration,
): Promise<Account> => {
	const accountVo = await getAuthenticatedAccountVo(clientConfiguration);
	const account = accountVoToAccount(accountVo);
	return account;
};
