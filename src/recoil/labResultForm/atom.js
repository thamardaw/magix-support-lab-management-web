import { atom } from "recoil";

const labResultFormAtom = atom({
  key: "labResultFormAtom",
  default: {
    id: null,
    lab_report_id: null,
    parameter_name: null,
    test_name: "",
    parameter_id: null,
    result: "",
    unit: "",
    upper_limit: "",
    lower_limit: "",
    remark: "",
  },
});

export default labResultFormAtom;
