import { atom } from "recoil";

const labResultFormAtom = atom({
  key: "labResultFormAtom",
  default: {
    id: null,
    lab_report_id: null,
    parameter_name: null,
    test_name: "",
    test_id: null,
    parameter_id: null,
    result: "",
    unit: "",
    upper_limit: "",
    lower_limit: "",
    remark: "",
    currentParameter: null,
  },
});

export default labResultFormAtom;
