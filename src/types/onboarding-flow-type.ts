import { z } from 'zod'

// ? onboarding zod type = Main
// employees: [{ name: '', active: false, key: randomId() }]

const zOnboardingStatus = z.enum([
  'PRE_INITIATED',
  'PRE_INPROGRESS',
  'ONBOARDING_INITIATED',
  'ONBOARDING_IN_PROGRESS',
  'ONBOARDING_COMPLETED',
  'HOLD',
  'REINITIATED',
  'CANCELLED',
])

const zDocument = z.object({
  key: z.string(),
  name: z.string().optional(),
  document_type: z.string(),
  file: z.instanceof(File).optional(),
})
// onboarding flow - Onboarding Validation
const zOnboarding = z.object({
  uuid: z.string(),
  created_by: z.string(),
  created_date: z.date(),
  modified_by: z.string(),
  modified_date: z.date(),

  onboard_status: zOnboardingStatus,

  // Profile
  start_date: z.date(),
  end_date: z.date(),
  work_state: z.string(),
  client_location: z.string(), // Dropdown
  experience: z.string(),
  department: z.string(), // Dropdown
  reporting_to: z.string(), // Dropdown
  designation: z.string(),
  overtime_exemption: z.string(), // Dropdown

  // Job
  name_of_recruiter: z.string(),
  contact_number_of_recruiter: z.string(),
  bill_rate: z.string(),
  pay_rate: z.string(),
  payment_frequency: z.string(), // Dropdown
  account_manager_commission: z.string(),
  recruitment_manager_commission: z.string(),
  recruitment_commission: z.string(),
  additional_information: z.string(),
  additional_commission: z.string(),
  remarks: z.string(),
  vendor: z.string(), // Dropdown

  // Immigration
  processing_type: z.string(), // Dropdown
  who_is_going_to_pay_premium: z.string(),
  immigration_job_title: z.string(),
  current_h1b_validity: z.string(),
  current_lac_number: z.string(),

  // Document
  documents: z.array(zDocument),
})

export interface TOnboardingFindById {
  data: TOnboarding[]
  ok: boolean
  message: string
}

// onboarding flow Onboarding zod types define
export type TOnboarding = z.infer<typeof zOnboarding>
export type TDocument = z.infer<typeof zDocument>
export type TOnboardingStatus = z.infer<typeof zOnboardingStatus>

// export types
// export type { TOnboarding, TOnboardingFindById, TOnboardingStatus }
