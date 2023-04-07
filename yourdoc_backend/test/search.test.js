const db = require('../services/db');
const { search } = require("../services/search");
const { getDocSpec } = require("../services/search");
const { searchName } = require("../services/search");
const { searchPinCode } = require("../services/search");

describe("search", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("returns search results based on query", async () => {
    const q = "cardiology";
    const expectedResult = {
      data: {
        rows: [
          {
            address: "123 Main St",
            email: "johndoe@example.com",
            id: 1,
            name: "Dr. John Doe",
            specialization: "cardiology",
            user_id: 1,
          },
        ],
      },
    };

    const mockResult = { rows: expectedResult.data.rows };
    const querySpy = jest.spyOn(db, "query").mockResolvedValue(mockResult);

    const result = await search(q);

    expect(querySpy).toHaveBeenCalledTimes(1);
    expect(querySpy).toHaveBeenCalledWith(
      "SELECT * FROM doctor,user WHERE id=user_id AND is_approved = 1 AND (specialization like 'cardiology%' OR name like 'cardiology%' OR email like 'cardiology%' OR address like '%cardiology%' )"
    );
    expect(result).toEqual(expectedResult);
  });
});