import { accountVoToAccount } from "..";

describe("accountVoToAccount", () => {
	it("should properly populate an Account based on AccountVo data", () => {
		const accountVo = {
			accountId: 0,
			allowSftpDeletion: true,
			createdDT: "2022-07-10T14:59:03.853Z",
			updatedDT: "2022-08-10T14:59:03.853Z",
		};
		const account = accountVoToAccount(accountVo);
		expect(account).toEqual({
			id: 0,
			isSftpDeletionEnabled: true,
			createdAt: new Date("2022-07-10T14:59:03.853Z"),
			updatedAt: new Date("2022-08-10T14:59:03.853Z"),
		});
	});
});
