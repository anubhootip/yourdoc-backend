const db = require('../services/db');
const userob = require('../services/user');
const helper = require('../helper');
const config = require('../dbconfig');
const { v4: uuid } = require('uuid');

describe('getMultiple', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return first page of users', async () => {
    db.query = jest.fn();
    const users = [      
        { name: 'John Doe', email: 'john@example.com' },      
        { name: 'Jane Smith', email: 'jane@example.com' },      
        { name: 'Bob Johnson', email: 'bob@example.com' },    
    ];
    db.query.mockResolvedValueOnce(users);

    const expected = {
      data: users,
      meta: { page: 1 },
    };

    const output = await userob.getMultiple();

    expect(output).toEqual(expected);

    const expectedQuery = `SELECT name, email FROM user LIMIT 0,${config.listPerPage}`;
    expect(db.query).toHaveBeenNthCalledWith(1, expectedQuery);
  });

  test('should return second page of users', async () => {
    db.query = jest.fn();
    const users = [      
        { name: 'Alice Brown', email: 'alice@example.com' },      
        { name: 'Charlie Davis', email: 'charlie@example.com' },    
    ];
    db.query.mockResolvedValueOnce(users);

    const expected = {
      data: users,
      meta: { page: 2 },
    };

    const output = await userob.getMultiple(2);

    expect(output).toEqual(expected);

    const expectedQuery = `SELECT name, email FROM user LIMIT ${config.listPerPage},${config.listPerPage}`;
    expect(db.query).toHaveBeenNthCalledWith(1, expectedQuery);
  });

  test('should return empty data for invalid page number', async () => {
    db.query = jest.fn();
    db.query.mockResolvedValueOnce([]);

    const expected = {
      data: [],
      meta: { page: 4 },
    };

    const output = await userob.getMultiple(4);

    expect(output).toEqual(expected);

    const expectedQuery = `SELECT name, email FROM user LIMIT ${config.listPerPage * 3},${config.listPerPage}`;
    expect(db.query).toHaveBeenNthCalledWith(1, expectedQuery);
  });
});


describe('getById', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('should return user with valid ID', async () => {
      const user = { name: 'John Doe', email: 'john@example.com' };
      db.query.mockResolvedValueOnce([user]);
  
      const expected = {
        data: user,
      };
  
      const output = await userob.getById(1);
  
      expect(output).toEqual(expected);
  
      const expectedQuery = `SELECT name, email FROM user where id=1`;
      expect(db.query).toHaveBeenNthCalledWith(1, expectedQuery);
    });
  
    test('should return empty data for invalid ID', async () => {
      db.query.mockResolvedValueOnce([]);
  
      const expected = {
        data: null,
      };
  
      const output = await userob.getById(999);
  
      expect(output).toEqual(expected);
  
      const expectedQuery = `SELECT name, email FROM user where id=999`;
      expect(db.query).toHaveBeenNthCalledWith(1, expectedQuery);
    });
  });


  describe('getByIdNType', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('should return patient with valid ID', async () => {
      const patient = { id: 1, name: 'John Doe', email: 'john@example.com', address: '123 Main St' };
      db.query.mockResolvedValueOnce([patient]);
  
      const expected = {
        data: patient,
      };
  
      const output = await userob.getByIdNType(1, 'patient');
  
      expect(output).toEqual(expected);
  
      const expectedQuery = `select * from user u, patient p where u.id=p.user_id and u.id='1'`;
      expect(db.query).toHaveBeenNthCalledWith(1, expectedQuery);
    });
  
    test('should return doctor with valid ID', async () => {
      const doctor = { id: 2, name: 'Jane Smith', email: 'jane@example.com', specialty: 'cardiology' };
      db.query.mockResolvedValueOnce([doctor]);
  
      const expected = {
        data: doctor,
      };
  
      const output = await userob.getByIdNType(2, 'doctor');
  
      expect(output).toEqual(expected);
  
      const expectedQuery = `select * from user u, doctor d where u.id=d.user_id and u.id='2'`;
      expect(db.query).toHaveBeenNthCalledWith(1, expectedQuery);
    });
  
    test('should return admin with valid ID', async () => {
      const admin = { id: 3, name: 'Bob Smith', email: 'bob@example.com' };
      db.query.mockResolvedValueOnce([admin]);
  
      const expected = {
        data: admin,
      };
  
      const output = await userob.getByIdNType(3, 'admin');
  
      expect(output).toEqual(expected);
  
      const expectedQuery = `select * from user where u.id='3'`;
      expect(db.query).toHaveBeenNthCalledWith(1, expectedQuery);
    });
  
    test('should return empty data for invalid ID', async () => {
        db.query.mockResolvedValueOnce([]);
      
        const expected = {
          data: null,
        };
      
        const output = await userob.getByIdNType(999, 'patient');
      
        expect(output).toEqual(expected);
      
        const expectedQuery = `select * from user u, patient p where u.id=p.user_id and u.id='999'`;
        expect(db.query).toHaveBeenNthCalledWith(1, expectedQuery);
      });
      
      test('should return empty data for invalid type', async () => {
        const output = await userob.getByIdNType(1, 'invalid-type');
      
        const expected = {
          data: null,
        };
      
        expect(output).toEqual(expected);
      });      
  });


jest.mock('../services/db');
jest.mock('uuid');

  describe('create', () => {
    beforeAll(() => {
      jest.resetAllMocks();
    });
  
    it('should create a user successfully', async () => {
      const user = {
        email: 'test@test.com',
        password: 'password',
        name: 'John Doe',
        type: 'customer',
        phone: '123-456-7890',
        dob: '2000-01-01',
        gender: 'male',
        address: '123 Main St.',
        latlong: '0,0',
        avatar_url: 'http://example.com/avatar.jpg'
      };
      const id = '12345';
  
      db.query.mockResolvedValue({ affectedRows: 1 });
      uuid.mockReturnValue(id);
  
      const result = await userob.create(user, db);
  
      expect(result.message).toEqual('User created successfully');
      expect(result.id).toEqual(id);
  
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(db.query).toHaveBeenCalledWith(expect.any(String));
    });
  
    it('should return an error message if user creation fails', async () => {
        db.query.mockReset();
      const user = {
        email: 'test@test.com',
        password: 'password',
        name: 'John Doe',
        type: 'customer',
        phone: '123-456-7890',
        dob: '2000-01-01',
        gender: 'male',
        address: '123 Main St.',
        latlong: '0,0',
        avatar_url: 'http://example.com/avatar.jpg'
      };
  
      db.query.mockResolvedValue({ affectedRows: 0 });
  
      const result = await userob.create(user, db);
  
      expect(result.message).toEqual('Error in creating user');
      expect(result.id).not.toBe(null);
  
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(db.query).toHaveBeenCalledWith(expect.any(String));
    });
  });