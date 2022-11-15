import { z } from 'zod'

// Submission Validation
const zSubmission = z.object({
  first_name: z.string(),
  last_name: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  status: z.string(),
  remarks: z.string(),
  rejection_reason: z.string(),
  recruiters: z.string(),
  recruitment_mgr_id: z.string(),
  acct_mgr_id: z.string(),
  job_id: z.string(),
  job_uuid: z.string(),
  client_id: z.string(),
  client_uuid: z.string(),
  employee_id: z.string(),
  employee_uuid: z.string(),
  emp_first_name: z.string().optional(),
  emp_last_name: z.string().optional(),
  vendor_id: z.string(),
  vendor_uuid: z.string(),
  vendor_first_name: z.string().optional(),
  vendor_last_name: z.string().optional(),
  uuid: z.string(),
})

// new Submission crate
const zSubmissionCreate = z.object({
  first_name: z.string(),
  last_name: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  status: z.string(),
  remarks: z.string(),
  rejection_reason: z.string(),
  recruiters: z.string(),
})

// Submission update
const zSubmissionEdit = z.object({
  first_name: z.string(),
  last_name: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  status: z.string(),
  remarks: z.string(),
  rejection_reason: z.string(),
  recruiters: z.string(),
})

// submission zod types define
type TSubmission = z.infer<typeof zSubmission>
type TSubmissionCreate = z.infer<typeof zSubmissionCreate>

// Active submission (T) interface define
interface TSubmissionFindAll {
  data: TSubmission[]
}

interface TSubmissionFindById {
  data: TSubmission[]
  ok: boolean
  message: string
}

interface IFindSubmissionByJobId {
  data: TSubmission[]
  ok: boolean
  message: string
}

// export types
export type {
  TSubmission,
  TSubmissionFindAll,
  TSubmissionFindById,
  TSubmissionCreate,
  IFindSubmissionByJobId,
}

// export ZOD submission
export { zSubmissionEdit, zSubmissionCreate }
