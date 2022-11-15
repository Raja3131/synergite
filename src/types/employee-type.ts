import { z } from 'zod'

// Active employees List Data
// Validation
const zAEmployee = z.object({
  id: z.number(),
  // profile_image: z.string(),
  employee_id: z.string(),
  fname: z.string(),
  lname: z.string(),
  email: z.string(),
  phone: z.string(),
  ssn_no: z.string(),
  dob: z.string(),
  gender: z.string(),
  ethnic_origin: z.string(),
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  state: z.string(),
  county: z.string(),
  country: z.string(),
  zip: z.string(),
  // date_created: z.string(),
  // date_updated: z.string().optional(),
  uuid: z.string(),
})

// new Active Employees add and validation
const zAEmployeeCreate = z.object({
  employee_id: z.string(),
  fname: z.string().min(2, { message: 'F_N should have 2 letters' }),
  lname: z.string().min(2, { message: 'L_N should have 2 letters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Phone Number should have 10' }),
  ssn_no: z.string(),
  dob: z.string(),
  gender: z.string(),
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  state: z.string(),
  county: z.string(),
  country: z.string(),
  ethnic_origin: z.string(),
  zip: z.string(),
})

// employee edit
const zEmployeeEdit = z.object({
  employee_id: z.string(),
  fname: z.string().min(2, { message: 'F_N should have 2 letters' }),
  lname: z.string().min(2, { message: 'L_N should have 2 letters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Phone Number should have 10' }),
  ssn_no: z.string(),
  dob: z.string(),
  gender: z.string(),
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  state: z.string(),
  county: z.string(),
  country: z.string(),
  ethnic_origin: z.string(),
  zip: z.string(),
})

// Active Employees zod types define
type TAEmployee = z.infer<typeof zAEmployee>
type TAEmployeeCreate = z.infer<typeof zAEmployeeCreate>

// Active Employees (T) interface define
interface TAEmployeeFindAll {
  data: TAEmployee[]
}

interface TAEmployeeFindById {
  data: TAEmployee
  message: string
  ok: boolean
}

// Active Employees export (T) Types
export type {
  TAEmployee,
  TAEmployeeFindAll,
  TAEmployeeFindById,
  TAEmployeeCreate,
}

// Active Employees export ZOD
export { zAEmployeeCreate, zEmployeeEdit }

// "id": 14,
// "user_id": 8,
// "uuid": "A17A812A:292A:583C:79B8:19E6DBB8B5EA64471C971E915178B925CEE959FF1",
// "fname": null,
// "mname": null,
// "lname": null,
// "email": null,
// "phone": null,
// "ssn_no": null,
// "dob": null,
// "gender": null,
// "address1": null,
// "address2": null,
// "city": null,
// "county": null,
// "state": null,
// "zip": null,
// "country": null,
// "employee_type": null,
// "employment_start_date": null,
// "payrate": null,
// "job_title": null,
// "visa_status": null,
// "work_state": null,
// "work_location": null,
// "client_location": null,
// "candidate_status": null,
// "skills": null,
// "experience": null,
// "dept_id": null,
// "reporting_to": null,
// "designation": null,
// "status": "Y",
// "created_by": 1,
// "created_date": "2022-09-13 12:48:15",
// "modified_by": null,
// "modified_date": null,
// "delete_date": null

// ? client
// first_name: '',
// last_name: '',
// address_line2: '',
// zip: '',
// country: '',
// fax: '',
// city: '',
// state: '',
// primary_email: '',
// primary_phone: '',
// status: '',
// created_date: '',
