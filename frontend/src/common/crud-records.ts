import type { AnyAppRecord } from '../types';

export function createRecord<T extends AnyAppRecord>(currRecords: T[], newRecord: T) {
	return [...currRecords, newRecord];
}

export function updateRecord<T extends AnyAppRecord>(currRecords: T[], updatedRecord: T) {
	return currRecords.map((record) => {
		if (record.id === updatedRecord.id) {
			return updatedRecord;
		}

		return record;
	});
}

export function deleteRecord<T extends AnyAppRecord>(currRecords: T[], deletedRecord: T) {
	return currRecords.filter((record) => record.id !== deletedRecord.id);
}
