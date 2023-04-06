const db = require('../services/db');
const bcrypt = require('bcrypt');
const patient = require('../services/patientRegistration');
const doctor = require('../services/doctorRegistration');
const uuid = require('uuid');

// Mock the dependencies
jest.mock('bcrypt');
jest.mock('../services/db');

jest.mock('uuid', () => {
    return {
      v4: jest.fn(),
    };
  });
  

describe('createUserPatient', () => {
    test('should create a new patient', async () => {
        // Arrange
        const creds = {
          name: 'John',
          email: 'john@example.com',
          password: 'password',
          blood_group: 'A+'
        };
        const userId = 'cd9a66f9-c6a3-4d62-8744-e66114547b94';
        uuid.v4.mockReturnValueOnce(userId);
        bcrypt.hash.mockResolvedValueOnce('hashedPassword');
        db.query.mockResolvedValueOnce({ affectedRows: 1 });
        db.query.mockResolvedValueOnce({ affectedRows: 1 });
      
        // Act
        const result = await patient.createUserPatient(creds);
      
        // Assert
        expect(result).toEqual({ message: 'Patient added successfully', id: userId, email: creds.email });
        expect(bcrypt.hash).toHaveBeenCalledWith(creds.password, 7);
        expect(db.query).toHaveBeenCalledTimes(2);
        expect(db.query).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO user'));
        expect(db.query).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO patient'));
      });

      test('should return an error message if there is an error creating the user', async () => {
        // Arrange
        const creds = {
          name: 'John Doe',
          dob: '1990-01-01',
          gender: 'male',
          phone: '1234567890',
          address: '123 Main St',
          latlong: '0,0',
          avatar_url: 'https://example.com/avatar.jpg',
          email: 'john@example.com',
          password: 'password',
          blood_group: 'A+',
        };
        const errorMessage = 'Error creating user';
        jest.spyOn(bcrypt, 'hash').mockRejectedValue(new Error(errorMessage));
        jest.spyOn(db, 'query').mockRejectedValue(new Error(errorMessage));
      
        // Act and Assert
        await expect(patient.createUserPatient(creds)).rejects.toThrow(errorMessage);
      
        // Verify that the mocked functions were called with the correct arguments
        expect(bcrypt.hash).toHaveBeenCalledWith(creds.password, 7);
        expect(db.query).toHaveBeenCalledTimes(2);
    });

});


describe('getRegistrationInfo', () => {
  const creds = { id: '123' };

  beforeAll(() => {
    // Mock the db.query method to return a user object
    db.query = jest.fn().mockResolvedValue({
      result: {
        rows: [{
          name: 'John Doe',
          dob: '1990-01-01',
          phone: '1234567890',
          address: '123 Main St',
          latlong: '0,0',
          avatar_url: 'https://example.com/avatar.jpg',
          blood_group: 'A+'
        }]
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return registration info when user is found', async () => {
    // Arrange
    const expected = {
      name: 'John Doe',
      dob: '1990-01-01',
      phone: '1234567890',
      address: '123 Main St',
      latlong: '0,0',
      avatar_url: 'https://example.com/avatar.jpg',
      blood_group: 'A+'
    };

    // Act
    const registrationInfo = await patient.getRegistrationInfo(creds);

    // Assert
    expect(registrationInfo.result.result.rows[0]).toEqual(expected);
    expect(db.query).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith(`select * from user inner join patient on user.id = patient.user_id where user.id = '${creds.id}'`);
  });

  test('should throw an error when user is not found', async () => {
    // Arrange
    db.query = jest.fn().mockResolvedValue({ result: { rows: [] } });
    const expectedError = new Error('User not found');

    // Act & Assert
    await expect(patient.getRegistrationInfo(creds)).rejects.toThrow(expectedError);
    expect(db.query).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith(`select * from user inner join patient on user.id = patient.user_id where user.id = '${creds.id}'`);
  });

});