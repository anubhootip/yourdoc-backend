const db = require('../services/db');
const bcrypt = require('bcryptjs');
const helper = require('../helper');
const patient = require('../services/patient_login');
const doctor = require('../services/doctorlogin');
const admin = require('../services/adminlogin');


jest.mock('bcryptjs', () => ({
  compare: jest.fn()
}));

jest.mock('../services/db', () => ({
  query: jest.fn()
}));

jest.mock('../helper', () => ({
  emptyOrRows: jest.fn()
}));

describe('patientInfo function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns an error message when given wrong email and password', async () => {
    const email = 'nonexistent@example.com';
    const password = 'wrongpassword';
    const queryResult = [];

    db.query.mockResolvedValue(queryResult);
    helper.emptyOrRows.mockReturnValue(queryResult);

    const result = await patient.patientInfo({ email, password });

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(helper.emptyOrRows).toHaveBeenCalledTimes(1);
    expect(helper.emptyOrRows).toHaveBeenCalledWith(queryResult);
    expect(result).toEqual({ message: 'Wrong email/password' });
  });

  test('returns patient data when given correct email and password', async () => {
    const email = 'foo@example.com';
    const password = 'bar';
    const creds = { email, password };
    const data = {
      id: 1,
      name: 'John Doe',
      email,
      password: '$2b$10$123456789012345678901234567890123456789012345678901234567890',
      user_id: 1,
      age: 30
    };
    db.query.mockResolvedValue([{ ...data }]);

    helper.emptyOrRows.mockReturnValue([data]);

    bcrypt.compare.mockResolvedValue(true);

    const result = await patient.patientInfo(creds);

    expect(db.query).toHaveBeenCalledWith(
      `SELECT * FROM user u, patient p where u.id=p.user_id and u.email='${email}'`
    );
    expect(helper.emptyOrRows).toHaveBeenCalledWith([{ ...data }]);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, data.password);
    expect(result).toEqual({ data, message: 'success' });
  });

  test('returns an error message when given correct email but wrong password', async () => {
    const email = 'foo@example.com';
    const password = 'bar';
    const creds = { email, password };
    const data = {
      id: 1,
      name: 'John Doe',
      email,
      password: '$2b$10$123456789012345678901234567890123456789012345678901234567890',
      user_id: 1,
      age: 30
    };

    db.query.mockResolvedValue([{ ...data }]);

    helper.emptyOrRows.mockReturnValue([data]);

    bcrypt.compare.mockResolvedValue(false);

    const result = await patient.patientInfo(creds);

    expect(db.query).toHaveBeenCalledWith(
      `SELECT * FROM user u, patient p where u.id=p.user_id and u.email='${email}'`
    );
    expect(helper.emptyOrRows).toHaveBeenCalledWith([{ ...data }]);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, data.password);
    expect(result).toEqual({ message: 'Wrong email/password' });
  });

});


describe('doctorInfo function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns an error message when given wrong email and password', async () => {
    const email = 'nonexistent@example.com';
    const password = 'wrongpassword';
    const queryResult = [];

    db.query.mockResolvedValue(queryResult);
    helper.emptyOrRows.mockReturnValue(queryResult);

    const result = await doctor.doctorInfo({ email, password });

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(helper.emptyOrRows).toHaveBeenCalledTimes(1);
    expect(helper.emptyOrRows).toHaveBeenCalledWith(queryResult);
    expect(result).toEqual({ message: 'Wrong email or password!!' });
  });

  test('returns patient data when given correct email and password', async () => {
    const email = 'foo@example.com';
    const password = 'bar';
    const creds = { email, password };
    const data = {
      id: 1,
      name: 'John Doe',
      email,
      password: '$2b$10$123456789012345678901234567890123456789012345678901234567890',
      user_id: 1,
      age: 30
    };
    db.query.mockResolvedValue([{ ...data }]);

    helper.emptyOrRows.mockReturnValue([data]);

    bcrypt.compare.mockResolvedValue(true);

    const result = await doctor.doctorInfo(creds);

    expect(db.query).toHaveBeenCalledWith(
      `SELECT * FROM user, doctor where email='${email}' and user_id=id and is_approved=1`
    );
    expect(helper.emptyOrRows).toHaveBeenCalledWith([{ ...data }]);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, data.password);
    expect(result).toEqual({ data, message: 'success' });
  });

  test('returns an error message when given correct email but wrong password', async () => {
    const email = 'foo@example.com';
    const password = 'bar';
    const creds = { email, password };
    const data = {
      id: 1,
      name: 'John Doe',
      email,
      password: '$2b$10$123456789012345678901234567890123456789012345678901234567890',
      user_id: 1,
      age: 30
    };

    db.query.mockResolvedValue([{ ...data }]);

    helper.emptyOrRows.mockReturnValue([data]);

    bcrypt.compare.mockResolvedValue(false);

    const result = await doctor.doctorInfo(creds);

    expect(db.query).toHaveBeenCalledWith(
      `SELECT * FROM user, doctor where email='${email}' and user_id=id and is_approved=1`
    );
    expect(helper.emptyOrRows).toHaveBeenCalledWith([{ ...data }]);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, data.password);
    expect(result).toEqual({ message: 'Wrong email or password!!' });
  });

});


describe('doctorInfo function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns an error message when given wrong email and password', async () => {
    const email = 'nonexistent@example.com';
    const password = 'wrongpassword';
    const queryResult = [];

    db.query.mockResolvedValue(queryResult);
    helper.emptyOrRows.mockReturnValue(queryResult);

    const result = await doctor.doctorInfo({ email, password });

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(helper.emptyOrRows).toHaveBeenCalledTimes(1);
    expect(helper.emptyOrRows).toHaveBeenCalledWith(queryResult);
    expect(result).toEqual({ message: 'Wrong email or password!!' });
  });

  test('returns patient data when given correct email and password', async () => {
    const email = 'foo@example.com';
    const password = 'bar';
    const creds = { email, password };
    const data = {
      id: 1,
      name: 'John Doe',
      email,
      password: '$2b$10$123456789012345678901234567890123456789012345678901234567890',
      user_id: 1,
      age: 30
    };
    db.query.mockResolvedValue([{ ...data }]);

    helper.emptyOrRows.mockReturnValue([data]);

    bcrypt.compare.mockResolvedValue(true);

    const result = await doctor.doctorInfo(creds);

    expect(db.query).toHaveBeenCalledWith(
      `SELECT * FROM user, doctor where email='${email}' and user_id=id and is_approved=1`
    );
    expect(helper.emptyOrRows).toHaveBeenCalledWith([{ ...data }]);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, data.password);
    expect(result).toEqual({ data, message: 'success' });
  });

  test('returns an error message when given correct email but wrong password', async () => {
    const email = 'foo@example.com';
    const password = 'bar';
    const creds = { email, password };
    const data = {
      id: 1,
      name: 'John Doe',
      email,
      password: '$2b$10$123456789012345678901234567890123456789012345678901234567890',
      user_id: 1,
      age: 30
    };

    db.query.mockResolvedValue([{ ...data }]);

    helper.emptyOrRows.mockReturnValue([data]);

    bcrypt.compare.mockResolvedValue(false);

    const result = await doctor.doctorInfo(creds);

    expect(db.query).toHaveBeenCalledWith(
      `SELECT * FROM user, doctor where email='${email}' and user_id=id and is_approved=1`
    );
    expect(helper.emptyOrRows).toHaveBeenCalledWith([{ ...data }]);
    expect(bcrypt.compare).toHaveBeenCalledWith(password, data.password);
    expect(result).toEqual({ message: 'Wrong email or password!!' });
  });

});

describe('getById function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns user data when given valid email', async () => {
    const expectedRows = [{
      name: 'John Doe',
      type: 'patient',
      email: 'johndoe@example.com',
      password: 'password123',
      dob: '1990-01-01',
      address: '123 Main St',
      latlong: '0.000000,0.000000',
      blood_group: 'AB+'
    }];
    db.query.mockResolvedValue(expectedRows);

    const result = await patient.getById({ email: 'johndoe@example.com' });

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith(expect.any(String));
    expect(result).toEqual({ result: expectedRows, message: 'User found successfully' });
  });

  test('returns an error message when user is not found', async () => {
    const email = 'nonexistent.user@example.com';
    db.query.mockResolvedValueOnce([]);

    const result = await patient.getById({ email });

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith(expect.any(String));
    expect(result).toEqual({ result: [], message: 'User not found!' });
  });

});

describe('doctor getById function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns user data when given valid email', async () => {
    const expectedRows = [{
      name: 'John Doe',
      type: 'patient',
      email: 'johndoe@example.com',
      password: 'password123',
      dob: '1990-01-01',
      address: '123 Main St',
      latlong: '0.000000,0.000000',
      blood_group: 'AB+'
    }];
    db.query.mockResolvedValue(expectedRows);

    const result = await doctor.getById({ email: 'johndoe@example.com' });

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith(expect.any(String));
    expect(result).toEqual({ result: expectedRows, message: 'User found successfully' });
  });

  test('returns an error message when user is not found', async () => {
    const email = 'nonexistent.user@example.com';
    db.query.mockResolvedValueOnce([]);

    const result = await doctor.getById({ email });

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith(expect.any(String));
    expect(result).toEqual({ result: [], message: 'User not found!' });
  });

});



describe('admin getById function', () => {

  test('should return a result object', async () => {
    db.query = jest.fn(() => Promise.resolve([{ name: 'John Doe', type: 'Doctor', specialization: 'Gynecologist', hospital_id: '543210' }]));
    const result = await admin.getById();

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ result: [{ name: 'John Doe', type: 'Doctor', specialization: 'Gynecologist', hospital_id: '543210' }] });
  });

  test('should throw an error for empty result', async () => {
    db.query = jest.fn(() => Promise.resolve(null));
    await expect(admin.getById()).rejects.toThrowError('User not found');

    expect(db.query).toHaveBeenCalledTimes(1);
  });
});
