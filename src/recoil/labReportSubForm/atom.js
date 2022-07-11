import { atom } from "recoil";

const labReportSubFormAtom = atom({
  key: "labReportSubFormAtom",
  default: {
    patient_id: null,
    doctor_name: "",
    sample_id: "",
    sample_type: "",
    patient_type: "",
    test_date: null,
    currentPatient: null,
  },
});

export default labReportSubFormAtom;
