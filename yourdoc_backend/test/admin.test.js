const helper = require('../helper');
const config = require('../dbconfig');
const db = require('../services/db');
const admin = require('../services/admin');

jest.mock('../helper');
jest.mock('../dbconfig');
jest.mock('../services/db');

describe('getDoctors', () => {
    afterEach(() => {
      jest.clearAllMocks();
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

  test('should return undefined if no doctor is found in the database', async () => {
    const mockUserId = '1';
    const mockRow = [];
    const mockEmptyOrRows = jest.spyOn(helper, 'emptyOrRows').mockReturnValue(mockRow);
    const mockQuery = jest.spyOn(db, 'query').mockResolvedValue(mockRow);

    const result = await admin.getDoctor(mockUserId);

    expect(mockQuery).toHaveBeenCalledWith(
      `SELECT id, email, name, phone, dob, gender, address, latlong, specialization FROM user INNER JOIN doctor ON user.id = doctor.user_id WHERE doctor.user_id = "${mockUserId}"`
    );
    expect(mockEmptyOrRows).toHaveBeenCalledWith(mockRow);
    expect(result).toEqual({ data: undefined });
    mockEmptyOrRows.mockRestore();
    mockQuery.mockRestore();
  });
});


describe('approveDoctor', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should update the doctor record and return a success message', async () => {
    const userId = 123;
    db.query.mockResolvedValueOnce({ affectedRows: 1 });
    helper.emptyOrRows.mockReturnValueOnce([{ id: 1, user_id: userId, is_approved: true }]);

    const result = await admin.approveDoctor(userId);

    expect(db.query).toHaveBeenCalledWith(`UPDATE doctor SET is_approved = true WHERE user_id="${userId}"`);
    expect(helper.emptyOrRows).toHaveBeenCalledWith({ affectedRows: 1 });
    expect(result.message).toEqual('Doctor Registeration Sucessfull!');
    expect(result.data).toEqual([{ id: 1, user_id: userId, is_approved: true }]);
  });

  test('should return an error message if the doctor record was not updated', async () => {
    const userId = 123;
    db.query.mockResolvedValueOnce({affectedRows: 0});
    helper.emptyOrRows.mockReturnValueOnce(undefined);
  
    const result = await admin.approveDoctor(userId);
  
    expect(db.query).toHaveBeenCalledWith(`UPDATE doctor SET is_approved = true WHERE user_id="${userId}"`);
    expect(helper.emptyOrRows).toHaveBeenCalledTimes(1);
    expect(result.message).toEqual('Error in Updating Doctor');
    expect(result.data).toEqual(undefined);
  });
});


describe('rejectDoctor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should remove the doctor record from the database and return a success message', async () => {
    const userId = 123;
    const update = { affectedRows: 1 };
    db.query.mockResolvedValueOnce(update);
    helper.emptyOrRows.mockReturnValueOnce([]);

    const result = await admin.rejectDoctor(userId);

    expect(db.query).toHaveBeenCalledWith(`DELETE FROM doctor WHERE user_id="${userId}"`);
    expect(helper.emptyOrRows).toHaveBeenCalledWith(update);
    expect(result.message).toEqual('Doctor Rejected Sucessfull!');
    expect(result.data).toEqual([]);
  });


  test('should return an error message if the doctor record was not removed', async () => {
    const userId = 123;
    const update = { affectedRows: 0 };
    db.query.mockResolvedValueOnce(update);
    helper.emptyOrRows.mockReturnValueOnce([]);

    const result = await admin.rejectDoctor(userId);

    expect(db.query).toHaveBeenCalledWith(`DELETE FROM doctor WHERE user_id="${userId}"`);
    expect(helper.emptyOrRows).toHaveBeenCalledWith(update);
    expect(result.message).toEqual('Error in Removing Doctor');
    expect(result.data).toEqual([]);
  });
});



