import type { DerivativeType } from "./DerivativeType";

export interface File {
	id: number;
	size: number;
	contentType: string;
	readonly derivativeType: DerivativeType;
	readonly fileUrl: string;
	readonly downloadUrl: string;
	readonly checksum: string;
	readonly createdAt: Date;
	readonly updatedAt: Date;
}
