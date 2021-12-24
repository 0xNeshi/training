import { getNewBlockSuggestedValues } from "../utilities";

const defaultSuggestionsInput = [[], undefined, null];

describe("getNewBlockSuggestedValues", () => {
  test.each(defaultSuggestionsInput)(
    "no sections should return empty suggestions",
    (sections) => {
      const output = {
        nextBlockNumber: 1,
        squatMax: "",
        overheadMax: "",
        deadliftMax: "",
        benchMax: "",
      };

      expect(getNewBlockSuggestedValues(sections)).toEqual(output);
    }
  );
});
