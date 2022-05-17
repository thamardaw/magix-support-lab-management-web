import { atom } from "recoil";

const parameterFormAtom = atom({
  key: "parameterFormAtom",
  default: {
    id: null,
    name: "",
    unit: "",
    lab_test_id: null,
    result_type: "",
    result_default_text: "",
    parameter_ranges: [],
  },
});

export default parameterFormAtom;
