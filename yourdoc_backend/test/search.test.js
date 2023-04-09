const db = require('../services/db');
const { search } = require("../services/search");
const { getDocSpec } = require("../services/search");
const { searchName } = require("../services/search");
const { searchPinCode } = require("../services/search");

describe("search", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns search results based on query", async () => {
    const q = "cardiology";
    const expectedResult = {
      data: {
        rows: [
          {
            address: "123 Main St",
            email: "johndoe@example.com",
            id: 1,
            name: "Dr. John Doe",
            specialization: "cardiology",
            user_id: 1,
          },
        ],
      },
    };

    const mockResult = { rows: expectedResult.data.rows };
    const querySpy = jest.spyOn(db, "query").mockResolvedValue(mockResult);

    const result = await search(q);

    expect(querySpy).toHaveBeenCalledTimes(1);
    expect(querySpy).toHaveBeenCalledWith(
      "SELECT * FROM doctor,user WHERE id=user_id AND is_approved = 1 AND (specialization like 'cardiology%' OR name like 'cardiology%' OR email like 'cardiology%' OR address like '%cardiology%' )"
    );
    expect(result).toEqual(expectedResult);
  });

  test("It will return empty list if unknown query entered", async () => {
    const q = "foobar";
    const expectedResult = {
      data: {
        rows: [],
      },
    };

    const mockResult = { rows: [] };
    const querySpy = jest.spyOn(db, "query").mockResolvedValue(mockResult);

    const result = await search(q);

    expect(querySpy).toHaveBeenCalledTimes(1);
    expect(querySpy).toHaveBeenCalledWith(
      "SELECT * FROM doctor,user WHERE id=user_id AND is_approved = 1 AND (specialization like 'foobar%' OR name like 'foobar%' OR email like 'foobar%' OR address like '%foobar%' )"
    );
    expect(result).toEqual(expectedResult);
  });

  test('It will throw an error if database query fails', async () => {
    const q = 'cardiology';

    const querySpy = jest.spyOn(db, 'query').mockRejectedValue(new Error('Query failed'));

    await expect(search(q)).rejects.toThrowError('Query failed');
    expect(querySpy).toHaveBeenCalledWith("SELECT * FROM doctor,user WHERE id=user_id AND is_approved = 1 AND (specialization like 'cardiology%' OR name like 'cardiology%' OR email like 'cardiology%' OR address like '%cardiology%' )");
  });
});

describe('searchDocBySpec', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns doctors with matching specialization', async () => {
    const mockResult = {
      rows: [
        { id: 1, name: 'Dr. John Doe', specialization: 'cardiology', is_approved: true },
        { id: 2, name: 'Dr. Jane Smith', specialization: 'cardiology', is_approved: true },
      ],
    };
    db.query = jest.fn().mockResolvedValue(mockResult);
    const result = await getDocSpec('cardiology');
    expect(result).toEqual({ result: { rows: mockResult.rows } });
  });

  test('returns empty list for unknown specialization', async () => {
    const mockResult = {
      data: { rows: [], },
    };
    db.query = jest.fn().mockResolvedValue(mockResult);

    const result = await getDocSpec('unknown');

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith(
      `SELECT * FROM doctor WHERE specialization = 'unknown' and is_approved = 1`
    );
    expect(result).toEqual({ result: { data: { rows: [] } } });
  });

  test('throws an error if database query fails', async () => {
    const mockError = new Error('Database query error');
    db.query.mockRejectedValue(mockError);

    await expect(getDocSpec('cardiology')).rejects.toThrow(mockError);

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith(
      `SELECT * FROM doctor WHERE specialization = 'cardiology' and is_approved = 1`
    );
  });
});

describe('searchDocByPinCode', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('It will return an object with return key', async () => {
    db.query = jest.fn(() => Promise.resolve([]));
    const pinCode = '123456';

    const response = await searchPinCode(pinCode);

    expect(response).toEqual(expect.objectContaining({
      result: expect.any(Array)
    }));
  });

  test('It should call db.query for correct query', async () => {
    const mockDbQuery = jest.fn(() => Promise.resolve([]));
    db.query = mockDbQuery;
    const pinCode = '123456';

    await searchPinCode(pinCode);

    expect(mockDbQuery).toHaveBeenCalledWith(`SELECT * FROM doctor INNER JOIN user ON address = '${pinCode}' and is_approved = 1;`);
  });

  test('It should return data from db.query', async () => {
    // Arrange
    const mockData = [{ id: 1, name: 'Dr. John Doe' }];
    db.query = jest.fn(() => Promise.resolve(mockData));
    const pinCode = '123456';

    // Act
    const response = await searchPinCode(pinCode);

    // Assert
    expect(response.result).toEqual(mockData);
  });
});

describe("searchDocByName", () => {

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

