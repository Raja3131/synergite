import { z } from 'zod'

// Active Candidate List Data
// Validation
const zCandidate = z.object({
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
  uuid: z.string(),
})

// new Active Candidate add and validation
const zCandidateCreate = z.object({
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
const zCandidateEdit = z.object({
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

// Active Candidate zod types define
type TCandidate = z.infer<typeof zCandidate>
type TCandidateCreate = z.infer<typeof zCandidateCreate>

// Active Candidate (T) interface define
interface TCandidateFindAll {
  data: TCandidate[]
}

interface TCandidateFindById {
  data: TCandidate
  message: string
  ok: boolean
}

// Active Candidate export (T) Types
export type {
  TCandidate,
  TCandidateFindAll,
  TCandidateFindById,
  TCandidateCreate,
}

// Active Candidate export ZOD
export { zCandidateCreate, zCandidateEdit }
