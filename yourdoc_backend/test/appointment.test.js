const db = require('../services/db');
const appointmentob = require('../services/appointment');
const helper = require('../helper');
const config = require('../dbconfig');
const { v4: uuid } = require('uuid');

describe('getByDoctorId', () => {

  it('returns data and meta object with valid doctor id', async () => {
    const doctorId = '1234';
    const page = 1;
    const rows = [
      { name: 'John Doe', specialization: 'Cardiologist', datetime: '2022-01-01', description: 'Routine checkup' },
      { name: 'Jane Smith', specialization: 'Dermatologist', datetime: '2022-01-02', description: 'Skin irritation' },
    ];
    jest.spyOn(db, 'query').mockResolvedValue(rows);

    const result = await appointmentob.getByDoctorId(doctorId, page);

    expect(db.query).toHaveBeenCalledWith(expect.any(String));
    expect(result).toEqual({
      data: rows,
      meta: { page }
    });
  });

  it('returns empty data array and meta object with invalid doctor id', async () => {

    const doctorId = '5678';
    const page = 1;
    const rows = [];
    jest.spyOn(db, 'query').mockResolvedValue(rows);


    const result = await appointmentob.getByDoctorId(doctorId, page);


    expect(db.query).toHaveBeenCalledWith(expect.any(String));
    expect(result).toEqual({
      data: rows,
      meta: { page }
    });
  });

});



jest.mock('../services/db', () => ({
  query: jest.fn(),
}));

describe('getByPatientId', () => {

  const patientId = '123';
  const page = 1;

  const MOCK_ROWS = [
    {
      name: "Dr. John",
      doctor_id: 456,
      datetime: "2022-01-01T10:00:00Z",
      description: "Check up",
    },
    {
      name: "Dr. Jane",
      doctor_id: 789,
      datetime: "2022-01-02T14:30:00Z",
      description: "Follow-up",
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('should return an object with data and meta properties', async () => {

    const result = await appointmentob.getByPatientId(patientId, page);


    expect(result).toBeDefined();
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('meta');
  });

  it('should retrieve appointments from the database for given patient', async () => {

    const expectedResult = {
      data: MOCK_ROWS,
      meta: {
        page,
      },
    };

    db.query.mockResolvedValue(MOCK_ROWS);


    const result = await appointmentob.getByPatientId(patientId, page);


    expect(db.query).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith(expect.any(String));
    expect(result.data).toEqual(expectedResult.data);
    expect(result.meta.page).toEqual(expectedResult.meta.page);
  });

  it('should return empty data if no appointments found for given patient', async () => {

    db.query.mockResolvedValue([]);


    const result = await appointmentob.getByPatientId("100", page);


    expect(db.query).toHaveBeenCalledTimes(1);
    expect(db.query).toHaveBeenCalledWith(expect.any(String));
    expect(result.data).toEqual([]);
    expect(result.meta.page).toEqual(page);
  });

});


afterAll(() => {
  jest.resetAllMocks();
});



describe('create', () => {
  const appointment = {
    patient_id: "123",
    doctor_id: "456",
    datetime: "2022-01-01T10:00:00Z",
    description: "Check up",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should save a new appointment to the database", async () => {

    db.query.mockResolvedValue({ affectedRows: 1 });


    const result = await appointmentob.create(appointment);


    expect(db.query).toHaveBeenCalledWith(expect.any(String));
    expect(result.message).toBe("Appointment created successfully");
    expect(typeof result.id).toBe("string");
  });

  it("should save an appointment without description to the database", async () => {

    const appointmentWithoutDescription = { ...appointment, description: undefined };
    db.query.mockResolvedValue({ affectedRows: 1 });


    const result = await appointmentob.create(appointmentWithoutDescription);


    expect(db.query).toHaveBeenCalledWith(expect.any(String));
    expect(result.message).toBe("Appointment created successfully");
    expect(typeof result.id).toBe("string");
  });
});


jest.mock('../services/db', () => ({
  query: jest.fn(),
}));

describe('deleteA', () => {
  afterEach(() => jest.clearAllMocks());

  test('successful deletion', async () => {
    const mockQuery = db.query.mockResolvedValue({ affectedRows: 1 });
    const result = await appointmentob.deleteA(1);
    expect(mockQuery).toHaveBeenCalledWith("DELETE FROM appointment WHERE id= ?", [1]);
    expect(result).toEqual({ message: 'Appointment deleted successfully' });
  });

  test('deletion of non-existent appointment', async () => {
    const mockQuery = db.query.mockResolvedValue({ affectedRows: 0 });
    const result = await appointmentob.deleteA(100);
    expect(mockQuery).toHaveBeenCalledWith("DELETE FROM appointment WHERE id= ?", [100]);
    expect(result).toEqual({ message: 'Error in deleting appointment' });
  });

  test('invalid input', async () => {
    await expect(appointmentob.deleteA('abc')).rejects.toThrow('Invalid input');
  });
});