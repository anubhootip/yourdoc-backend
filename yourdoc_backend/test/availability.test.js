const db = require('../services/db');
const available = require('../services/availability');
const helper = require('../helper');
const config = require('../dbconfig');
const { v4: uuid } = require('uuid');


jest.mock('../services/db');
jest.mock('../helper');
jest.mock('uuid');

describe('getByDoctorId', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return data when query is successful', async () => {
    const doctorId = 1;
    const rows = [{ day: 'Monday', from_time: '09:00', to_time: '12:00' }];
    const emptyOrRows = jest.fn().mockReturnValue(rows);
    db.query.mockResolvedValue(rows);
    helper.emptyOrRows.mockReturnValue(emptyOrRows(rows));

    const result = await available.getByDoctorId(doctorId);

    expect(db.query).toHaveBeenCalledWith(`SELECT day, from_time, to_time FROM availability WHERE user_id='${doctorId}'`);
    expect(helper.emptyOrRows).toHaveBeenCalledWith(rows);
    expect(result).toEqual({ data: rows });
  });

  test('should return empty data when query returns empty', async () => {
    const doctorId = 2;
    const rows = [];
    const emptyOrRows = jest.fn().mockReturnValue(rows);
    db.query.mockResolvedValue(rows);
    helper.emptyOrRows.mockReturnValue(emptyOrRows(rows));

    const result = await available.getByDoctorId(doctorId);

    expect(db.query).toHaveBeenCalledWith(`SELECT day, from_time, to_time FROM availability WHERE user_id='${doctorId}'`);
    expect(helper.emptyOrRows).toHaveBeenCalledWith(rows);
    expect(result).toEqual({ data: rows });
  });

  test('should throw error when query fails', async () => {
    const doctorId = 3;
    const error = new Error('Query failed');
    db.query.mockRejectedValue(error);

    await expect(available.getByDoctorId(doctorId)).rejects.toThrow(error);
    expect(db.query).toHaveBeenCalledWith(`SELECT day, from_time, to_time FROM availability WHERE user_id='${doctorId}'`);
    expect(helper.emptyOrRows).not.toHaveBeenCalled();
  });
});


describe('create', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });
  
    test('should create availability when inputs are valid', async () => {
      const availability = { day: 'Monday', from_time: '09:00', to_time: '12:00', doctor_id: 1 };
      const id = '123';
      const result = { affectedRows: 1 };
      db.query.mockResolvedValue(result);
      uuid.mockReturnValue(id);
  
      const output = await available.create(availability);
  
      expect(db.query).toHaveBeenCalledWith(
        `INSERT INTO availability (id, day, from_time, to_time, user_id) VALUES ('${id}', '${availability.day}', '${availability.from_time}', '${availability.to_time}', '${availability.doctor_id}');`
      );
      expect(output).toEqual({ message: 'Availability created successfully', id });
    });
  
    test('should return error message when create query returns affectedRows 0', async () => {
      const availability = { day: 'Tuesday', from_time: '10:00', to_time: '13:00', doctor_id: 2 };
      const id = '456';
      const result = { affectedRows: 0 };
      db.query.mockResolvedValue(result);
      uuid.mockReturnValue(id);
  
      const output = await available.create(availability);
  
      expect(db.query).toHaveBeenCalledWith(
        `INSERT INTO availability (id, day, from_time, to_time, user_id) VALUES ('${id}', '${availability.day}', '${availability.from_time}', '${availability.to_time}', '${availability.doctor_id}');`
      );
      expect(output).toEqual({ message: 'Error in creating availability', id });
    });
  
    test('should throw error when create query fails', async () => {
      const availability = { day: 'Wednesday', from_time: '11:00', to_time: '14:00', doctor_id: 3 };
      const error = new Error('Create query failed');
      db.query.mockRejectedValue(error);
  
      await expect(available.create(availability)).rejects.toThrow(error);
      expect(db.query).toHaveBeenCalledWith(
        `INSERT INTO availability (id, day, from_time, to_time, user_id) VALUES ('${undefined}', '${availability.day}', '${availability.from_time}', '${availability.to_time}', '${availability.doctor_id}');`
      );
    });
  });

  describe('updateOrCreate', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });
  
    test('should update availability when it exists', async () => {
      const availability = { day: 'Monday', from_time: '09:00', to_time: '12:00', doctor_id: 1 };
      const result = { affectedRows: 1 };
      db.query.mockResolvedValue(result);
  
      const output = await available.updateOrCreate(availability);
  
      expect(db.query).toHaveBeenCalledWith(
        `UPDATE availability SET from_time='${availability.from_time}',to_time='${availability.to_time}' WHERE day='${availability.day}' and user_id='${availability.doctor_id}';`
      );
      expect(output).toEqual({ message: 'Availability updated successfully' });
    });
  
    test('should throw error when update or create query fails', async () => {
      const availability = { day: 'Wednesday', from_time: '11:00', to_time: '14:00', doctor_id: 3 };
      const error = new Error('Update or create query failed');
      db.query.mockRejectedValue(error);
  
      await expect(available.updateOrCreate(availability)).rejects.toThrow(error);
      expect(db.query).toHaveBeenCalledWith(
        `UPDATE availability SET from_time='${availability.from_time}',to_time='${availability.to_time}' WHERE day='${availability.day}' and user_id='${availability.doctor_id}';`
      );
    });
  });