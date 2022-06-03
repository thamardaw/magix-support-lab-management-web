export const constants = {
  name: process.env.REACT_APP_TITLE || "Magix Support",
  hospital_name: `${process.env.REACT_APP_TITLE || "Magix Support"} Hospital`,
  hospital_name_symbol: process.env.REACT_APP_TITLE_SHORT || "MS",
  hospital_logo: process.env.REACT_APP_LOGO,
  hospital_desc:
    process.env.REACT_APP_DESC || "Specialist Clinic and Diagnostic Center",
  primary_color: process.env.REACT_APP_THEME || "#1976d2",
  hospital_phones:
    process.env.REACT_APP_PHONES || "09-97-8396650, 09-94-3031598 (Viber)",
  hospital_address:
    process.env.REACT_APP_ADDRESS ||
    "No.3 A, Kan Taw Mon Housing, Lay Daung Kan Road, Thingangyun township (Near May Ka Housing)",
  hospital_email: process.env.REACT_APP_EMAILS || "kantawmon.clinic@gmail.com",
  hospital_fb:
    process.env.REACT_APP_FB ||
    "https://www.facebook.com/KanTawMonSpecialistClinic/",
};
