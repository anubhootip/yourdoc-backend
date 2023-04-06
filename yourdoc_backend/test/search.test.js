const db = require('../services/db');
const searchob = require('../services/search');


describe('searchDocBySpec', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('returns approved doctors based on specialization', async () => {
      const spec = 'cardiology';
      const expectedResult = { result: { rows: [{id: 1, name: 'Dr. Smith', specialization: 'cardiology'}] }};

      const mockResult = { rows: [{id: 1, name: 'Dr. Smith', specialization: 'cardiology'}] };
      const querySpy = jest.spyOn(db, 'query').mockResolvedValue(mockResult);

      const result = await searchob.getDocSpec(spec);

      expect(querySpy).toHaveBeenCalledTimes(1);
      expect(querySpy).toHaveBeenCalledWith("SELECT * FROM doctor WHERE specialization = 'cardiology' and is_approved = 1");

      expect(result).toEqual(expectedResult);
    });

    test('returns empty list for unknown specialization', async () => {
        const spec = 'foot medicine';
        const expectedResult = { result: { rows: [] } };

        const mockResult = { rows: [] };
        const querySpy = jest.spyOn(db, 'query').mockResolvedValue(mockResult);

        const result = await searchob.getDocSpec(spec);

        expect(querySpy).toHaveBeenCalledTimes(1);
        expect(querySpy).toHaveBeenCalledWith("SELECT * FROM doctor WHERE specialization = 'foot medicine' and is_approved = 1");

        expect(result).toEqual(expectedResult);
    });

    test('throws an error if database query fails', async () => {
        const spec = 'cardiology';

        const querySpy = jest.spyOn(db, 'query').mockRejectedValue(new Error('Query failed'));

        await expect(searchob.getDocSpec(spec)).rejects.toThrowError('Query failed');
        expect(querySpy).toHaveBeenCalledWith("SELECT * FROM doctor WHERE specialization = 'cardiology' and is_approved = 1");
    });
});

describe("searchDocByName", () => {
    test("should return the search result if doctor exists and is approved", async () => {
        const docName = "John";
        db.query = jest
            .fn()
            .mockImplementationOnce(() => [{ id: 1, name: "John", is_approved: true }]);

        const result = await searchob.searchName(docName);

        expect(db.query).toHaveBeenCalledWith(
            `SELECT * FROM doctor WHERE name = '${docName}' and is_approved = 1`
        );
        expect(result).toEqual({ result: [{ id: 1, name: "John", is_approved: true}]});
    });

    test("should return an empty array if no doctor was found", async () => {
        const docName = "Mike";
        db.query = jest.fn().mockImplementationOnce(() => []);

        const result = await searchob.searchName(docName);

        expect(db.query).toHaveBeenCalledWith(
            `SELECT * FROM doctor WHERE name = '${docName}' and is_approved = 1`
        );
        expect(result).toEqual({ result: [] });
    });

    test('should throw an error when database query fails', async () => {
        const docName = 'John Doe';
        db.query.mockRejectedValueOnce(new Error('Database error'));

        await expect(searchob.searchName(docName)).rejects.toThrow('Database error');
    });
});

jest.mock('../services/db');
describe('searchDocByPinCode', () => {
    afterEach(() => jest.resetAllMocks());
    test('should return search result when given valid pincode.', async () => {
        const resultMocked = [
            {
                doctorId: 1,
                name: "Dr. John",
                specialization: "General Physician",
                address: "12345"
            },
            {
                doctorId: 2,
                name: "Dr. Julia",
                specialization: "Dermatologist",
                address: "12345"
            }
        ];
        db.query.mockResolvedValueOnce(resultMocked);

        const result = await searchob.searchPinCode('12345');

        expect(db.query).toHaveBeenCalledWith(
            "SELECT * FROM doctor INNER JOIN user ON address = '12345' and is_approved = 1;"
        );

        expect(result.result).toEqual(resultMocked);
    });

    test('should throw error when given an invalid pincode', async () => {
        const err = new Error('Invalid pin code');
        db.query.mockRejectedValueOnce(err);

        await expect(
            searchob.searchPinCode('invalid_pin_code')
        ).rejects.toThrow();

        expect(db.query).toHaveBeenCalledWith(
            "SELECT * FROM doctor INNER JOIN user ON address = 'invalid_pin_code' and is_approved = 1;"
        );
    });
});