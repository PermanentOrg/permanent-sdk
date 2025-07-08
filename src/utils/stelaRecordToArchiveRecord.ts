import {
	ArchiveRecordType,
	Status,
	isArchiveRecordType,
	isStatus,
} from "../types";
import { stelaFileToFile } from "./stelaFileToFile";
import { formatTimestampAsUtc } from "./formatTimestampAsUtc";
import type { ArchiveRecord, StelaRecord } from "../types";

const stelaRecordTypeToArchiveRecordType = (
	recordType: string,
): ArchiveRecordType =>
	isArchiveRecordType(recordType) ? recordType : ArchiveRecordType.Unknown;

const stelaStatusToStatus = (status: string): Status =>
	isStatus(status) ? status : Status.Undefined;

export const stelaRecordToArchiveRecord = (
	stelaRecord: StelaRecord,
): ArchiveRecord => {
	const createdAt = new Date(formatTimestampAsUtc(stelaRecord.createdAt));
	const updatedAt =
		stelaRecord.updatedAt === null || stelaRecord.updatedAt === undefined
			? createdAt
			: new Date(formatTimestampAsUtc(stelaRecord.updatedAt));
	const displayDate =
		stelaRecord.displayDate === null || stelaRecord.displayDate === undefined
			? null
			: new Date(formatTimestampAsUtc(stelaRecord.displayDate));
	const type = stelaRecordTypeToArchiveRecordType(stelaRecord.type);
	const status = stelaStatusToStatus(stelaRecord.status);
	const files = stelaRecord.files.map((stelaFile) =>
		stelaFileToFile(stelaFile),
	);
	return {
		id: stelaRecord.recordId,
		fileSystemId: stelaRecord.folderLinkId,
		displayName: stelaRecord.displayName,
		fileSystemCompatibleName: stelaRecord.downloadName,
		type,
		status,
		files,
		createdAt,
		updatedAt,
		displayDate,
	};
};
