export interface Account {
	id: number;
	isSftpDeletionEnabled: boolean;
	readonly createdAt: Date;
	readonly updatedAt: Date;
}
