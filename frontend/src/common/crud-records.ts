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

// export const editRecord: SwrHelperFunction =
// (mutate, data?) => async (updatedRecord: AnyAppRecord) => {
//   if (!data) return;
//   const updatedData = data.map((item) => {
//     if (item.id === updatedRecord.id) return updatedRecord;
//     return item;
//   });
//   await mutate([...updatedData], { revalidate: false });
// };

// export const deleteRecord: SwrHelperFunction =
// (mutate, data?) => async (deletedRecord: AnyAppRecord) => {
//   if (!data) return;
//   const filteredData = data.filter((item) => item.id !== deletedRecord.id);
//   await mutate(filteredData, { revalidate: false });
// };

// export const addRecord: SwrHelperFunction =
// (mutate, data?) => async (newRecord: AnyAppRecord) => {
//   if (!data) return;
//   await mutate([...data, newRecord], { revalidate: false });
// };
