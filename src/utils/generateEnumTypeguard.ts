import { RecordType, Status } from '../types';

// This is a modified version of code written by StackOverflow user @jcalz
// https://stackoverflow.com/a/58278753/159522
export const generateEnumTypeguard = <GenericEnum>(genericEnum: GenericEnum) =>
  (value: unknown): value is GenericEnum[keyof GenericEnum] => {
    const token = value as GenericEnum[keyof GenericEnum];
    const validTokens = Object.values(genericEnum);
    return validTokens.includes(token);
  };

export const isRecordType = generateEnumTypeguard(RecordType);
export const isStatus = generateEnumTypeguard(Status);
