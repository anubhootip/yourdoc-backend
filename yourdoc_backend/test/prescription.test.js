const db = require('../services/db');
const prescription = require('../services/prescription');
const helper = require('../helper');
const config = require('../dbconfig');
const { v4: uuid } = require('uuid');

jest.mock('../services/db');

describe('getByPatientId', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return data for valid patient id', async () => {
    const patientId = uuid();
    const rows = [      { id: uuid(), file_name: 'file1.jpg', uploaded_for: patientId },      { id: uuid(), file_name: 'file2.jpg', uploaded_for: patientId }    ];
    db.query.mockResolvedValue(rows);

    const expectedQuery = `SELECT * FROM upload, user WHERE uploaded_for=user.id and uploaded_for='${patientId}'`;
    const expectedData = { data: helper.emptyOrRows(rows) };
    const result = await prescription.getByPatientId(patientId);

    expect(db.query).toHaveBeenCalledWith(expectedQuery);
    expect(result).toEqual(expectedData);
  });

  test('should return empty data for invalid patient id', async () => {
    const patientId = uuid();
    db.query.mockResolvedValue([]);

    const expectedQuery = `SELECT * FROM upload, user WHERE uploaded_for=user.id and uploaded_for='${patientId}'`;
    const expectedData = { data: [] };
    const result = await prescription.getByPatientId(patientId);

    expect(db.query).toHaveBeenCalledWith(expectedQuery);
    expect(result).toEqual(expectedData);
  });
});