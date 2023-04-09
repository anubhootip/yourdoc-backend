const helper = require('../helper');
const config = require('../dbconfig');
const db = require('../services/db');
const emailsender = require("../services/Email");
const admin = require('../services/admin');

jest.mock('../helper');
jest.mock('../dbconfig');
jest.mock('../services/db');
jest.mock('../services/Email');

describe('getDoctors', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

  test('should return an object with data and meta properties', async () => {
    const mockPage = 1;
    const expectedData = [{ id: 1, email: 'test@example.com', name: 'Dr John Adams', phone: '555-555-5555', dob: '1990-01-01', gender: 'male', address: '123 Main St', latlong: '40.1234,-74.5678' }];
    const expectedMeta = { page: 1 };
    const mockRows = [
      { id: 1, 
        email: 'test@example.com', 
        name: 'Dr John Adams', 
        phone: '555-555-5555', 
        dob: '1990-01-01', 
        gender: 'male', 
        address: '123 Main St', 
        latlong: '40.1234,-74.5678' 
      }];
    const mockEmptyOrRows = jest.fn(() => expectedData);
    const mockQuery = jest.fn(() => mockRows);
    helper.getOffset.mockReturnValueOnce(0);
    helper.emptyOrRows.mockImplementation(mockEmptyOrRows);
    db.query.mockImplementation(mockQuery);
    config.listPerPage = 10;

    const result = await admin.getDoctors(mockPage);

    expect(result).toEqual({
      data: expectedData,
      meta: expectedMeta
    });
    expect(helper.getOffset).toHaveBeenCalledWith(expectedMeta.page, config.listPerPage);
    expect(db.query).toHaveBeenCalledWith(expect.any(String));
    expect(helper.emptyOrRows).toHaveBeenCalledWith(mockRows);

    mockEmptyOrRows.mockRestore();
    mockQuery.mockRestore();
  });
});



