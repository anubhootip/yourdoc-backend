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

  test('should return a list of unapproved doctors with metadata', async () => {
    const rows = [
      { id: 1, 
        email: 'john@example.com', 
        name: 'Dr John Doe', 
        phone: '1234567890', 
        dob: '1990-01-01', 
        gender: 'male', 
        address: '123 Main St', 
        latlong: '12.345678,-98.765432' 
      },
      { 
        id: 2, 
        email: 'jannet@example.com', 
        name: 'Dr Jannet Smith', 
        phone: '9876543210', 
        dob: '1995-02-01', 
        gender: 'female', 
        address: '456 Elm St', 
        latlong: '23.456789,-87.654321' 
      }
    ];
    const page = 1;
    const meta = { page };
    const expected = { data: rows, meta };

    db.query.mockResolvedValueOnce(rows);
    helper.emptyOrRows.mockReturnValueOnce(rows);

    const result = await admin.getDoctors(page);

    expect(db.query).toHaveBeenCalledWith('SELECT id, email, name, phone, dob, gender, address, latlong FROM user INNER JOIN doctor ON user.id = doctor.user_id WHERE doctor.is_approved = false;');
    expect(helper.emptyOrRows).toHaveBeenCalledWith(rows);
    expect(result).toEqual(expected);
  });


  test('should return an empty list and metadata if there are no unapproved doctors', async () => {
    const rows = [];
    const page = 1;
    const meta = { page };
    const expected = { data: rows, meta };

    db.query.mockResolvedValueOnce(rows);
    helper.emptyOrRows.mockReturnValueOnce(rows);

    const result = await admin.getDoctors(page);

    expect(db.query).toHaveBeenCalledWith('SELECT id, email, name, phone, dob, gender, address, latlong FROM user INNER JOIN doctor ON user.id = doctor.user_id WHERE doctor.is_approved = false;');
    expect(helper.emptyOrRows).toHaveBeenCalledWith(rows);
    expect(result).toEqual(expected);
  });
});


describe('getDoctor', () => {
  test('should fetch a doctor from the database', async () => {
    // Arrange
    const userId = 123;
    const mockRow = [
      {
        id: 1,
        email: 'doctor@example.com',
        name: 'Dr Bhatt',
        phone: '1234567890',
        dob: '1990-01-01',
        gender: 'male',
        address: '123 Main St',
        latlong: '0.000000,0.000000',
        specialization: 'Cardiology',
      },
    ];
    const mockData = {
      id: 1,
      email: 'doctor@example.com',
      name: 'Dr Bhatt',
      phone: '1234567890',
      dob: '1990-01-01',
      gender: 'male',
      address: '123 Main St',
      latlong: '0.000000,0.000000',
      specialization: 'Cardiology',
    };
    const mockEmptyOrRows = jest.spyOn(helper, 'emptyOrRows').mockReturnValue([mockData]);

    db.query.mockResolvedValue(mockRow);

    // Act
    const result = await admin.getDoctor(userId);

    // Assert
    expect(db.query).toHaveBeenCalledWith(`SELECT id, email, name, phone, dob, gender, address, latlong, specialization FROM user INNER JOIN doctor ON user.id = doctor.user_id WHERE doctor.user_id = "${userId}"`);
    expect(mockEmptyOrRows).toHaveBeenCalledWith(mockRow);
    expect(result).toEqual({ data: mockData });

    // Restore mock
    mockEmptyOrRows.mockRestore();
  });
});



