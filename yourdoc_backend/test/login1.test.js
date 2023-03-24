const db = require('../services/db');
const bcrypt = require('bcrypt');
const helper = require('../helper');
const patient = require('../services/patient_login');
const doctor = require('../services/doctorlogin');
const admin = require('../services/adminlogin');


jest.mock('bcrypt', () => ({
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


describe('adminInfo function', () => {

  const creds = {
  email: 'example@mail.com',
  password: '123456'
  };
  
  test('should return a result object', async () => {
  db.query = jest.fn(() => Promise.resolve([{ id: 1, email: 'example@mail.com', password: '123456' }]));
  const result = await admin.adminInfo(creds);

  expect(db.query).toHaveBeenCalledTimes(2);
  expect(result).toEqual({result: [{ id: 1, email: 'example@mail.com', password: '123456' }], result1: undefined});
  });
});