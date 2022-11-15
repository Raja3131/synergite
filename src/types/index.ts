import { z } from 'zod'

// Client List Data
// Validation
const zClient = z.object({
  id: z.number(),
  profile_image: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  city: z.string(),
  state: z.string(),
  primary_email: z.string().email(),
  primary_phone: z.string(),
  address_line1: z.string(),
  address_line2: z.string(),
  zip: z.string(),
  country: z.string(),
  fax: z.string(),
  status: z.string(),
  created_date: z.string(),
  date_created: z.string(),
  date_updated: z.string().optional(),
  uuid: z.string(),
})

// new client add
const zClientCreate = z.object({
  first_name: z.string().min(2, { message: 'F_N should be >= 10' }),
  last_name: z.string().min(2, { message: 'L_N should be >= 2' }),
  primary_email: z.string().email({ message: 'Invalid email address' }),
  primary_phone: z
    .string()
    .min(10, { message: 'Phone number should be >= 10' }),
  city: z.string(),
  state: z.string(),
  address_line2: z.string(),
  zip: z.string(),
  country: z.string(),
})

// client edit
const zClientEdit = z.object({
  first_name: z.string().min(2, { message: 'F_N should be >= 2' }),
  last_name: z.string().min(2, { message: 'L_N should be >= 2' }),
  primary_email: z.string().email({ message: 'Invalid email address' }),
  primary_phone: z
    .string()
    .min(10, { message: 'Phone number should be >= 10' }),
  city: z.string(),
  state: z.string(),
  address_line2: z.string(),
  zip: z.string(),
  country: z.string(),
  fax: z.string(),
  status: z.string(),
  created_date: z.string(),
  date_created: z.string(),
})

// client contacts
const zContacts = z.object({
  id: z.number(),
  profile_image: z.string().url(),
  fname: z.string(),
  lname: z.string(),
  email1: z.string().email(),
  phone1: z.string(),
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  county: z.string(),
  state: z.string(),
  country: z.string(),
  zip: z.string(),
  date_created: z.string(),
  date_updated: z.string().optional(),
  uuid: z.string(),
})

// new create contact

const zContactCreate = z.object({
  fname: z.string().min(2, { message: 'F_N should have 2 letters' }),
  lname: z.string().min(2, { message: 'L_N should have 2 letters' }),
  email1: z.string().email({ message: 'Invalid email address' }),
  phone1: z.string().min(10, { message: 'Phone Number should have 10' }),
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  state: z.string(),
  county: z.string(),
  country: z.string(),
  zip: z.string(),
})

// contacts edit

const zContactEdit = z.object({
  fname: z.string().min(2, { message: 'F_N should have 2 letters' }),
  lname: z.string().min(2, { message: 'L_N should have 2 letters' }),
  email1: z.string().email({ message: 'Invalid email address' }),
  phone1: z.string().min(10, { message: 'Phone Number should have 10' }),
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  state: z.string(),
  county: z.string(),
  country: z.string(),
  zip: z.string(),
  uuid: z.string(),
  id: z.number(),
})

// client list with jobs
const zJobs = z.object({
  id: z.number(),
  uuid: z.string(),
  title: z.string(),
  client_req_id: z.string(),
  city: z.string(),
  country: z.string(),
  state: z.string(),
  primary_skills: z.string(),
  secondary_skills: z.string(),
  start_date: z.string(),
  visa_status: z.string(),
  job_type: z.string(),
  pay_rate: z.string(),
  job_status: z.string(),
  created_by: z.string(),
  date_created: z.string(),
  date_updated: z.string().optional(),
})

// Job create - new job
const zJobCreate = z.object({
  // job_name: z.string().min(3, { message: 'J_N should have 3 letters' }),
  // location: z.string(),
  // category: z.string(),
  // job_status: z.string(),
  title: z.string().min(3, { message: 'Title should have 3 letters' }),
  city: z.string(),
  country: z.string(),
  state: z.string(),
  primary_skills: z.string(),
  secondary_skills: z.string(),
  start_date: z.string(),
  visa_status: z.string(),
  job_type: z.string(),
  pay_rate: z.string(),
  job_status: z.string(),
})

// Job edit - edit job
const zJobEdit = z.object({
  // job_name: z.string().min(3, { message: 'J_N should have 3 letters' }),
  // location: z.string(),
  // category: z.string(),
  // job_status: z.string(),
  id: z.number(),
  title: z.string().min(3, { message: 'Title should have 3 letters' }),
  city: z.string(),
  country: z.string(),
  state: z.string(),
  // primary_skills: z.string(),
  secondary_skills: z.string(),
  // start_date: z.string(),
  visa_status: z.string(),
  job_type: z.string(),
  pay_rate: z.string(),
  job_status: z.string(),
  date_created: z.string(),
  date_updated: z.string().optional(),
  uuid: z.string(),
})

// extend array of objects client
const zClientDetails = zClient.extend({
  contacts: z.array(zContacts),
  jobs: z.array(zJobs),
})

// clients zod types define
type TClientDetails = z.infer<typeof zClientDetails>
type TClient = z.infer<typeof zClient>
type TJobs = z.infer<typeof zJobs>
type TContacts = z.infer<typeof zContacts>
type TClientCreate = z.infer<typeof zClientCreate>
type TContactCreate = z.infer<typeof zContactCreate>
type TContactEdit = z.infer<typeof zContactEdit>
type TJobCreate = z.infer<typeof zJobCreate>
type TJobEdit = z.infer<typeof zJobEdit>

// client interface define
interface TClientFindAll {
  data: TClient[]
}

interface TClientCreateResponse {
  data: TClient
}

interface TContactCreateResponse {
  data: TContacts
}

interface TJobCreateResponse {
  data: TJobs
}
interface TRemoveClientDataById {
  data: TClient
}

interface TContactsFindAll {
  data: TContacts[]
}

interface TContactsFindById {
  data: TContacts[]
  ok: boolean
  message: string
}

interface TJobsFindAll {
  data: TJobs[]
}

interface TJobsFindById {
  data: TJobs
  ok: boolean
  message: string
}

interface TClientFindById {
  data: TClient
  ok: boolean
  message: string
}

// I - interface define
interface IFindContactsByClientId {
  data: TContacts[]
  ok: boolean
  message: string
}

interface IFindJobsByClientId {
  data: TJobs[]
}

// vendor start here

// Vendor List Data
const zVendor = z.object({
  id: z.number(),
  profile_image: z.string().url(),
  first_name: z.string(),
  last_name: z.string(),
  primary_email: z.string().email(),
  primary_phone: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  date_created: z.string(),
  date_updated: z.string().optional(),
  uuid: z.string(),
})

// new Vendor add
const zVendorCreate = z.object({
  first_name: z.string().min(2, { message: 'F_N should have 2 letters' }),
  last_name: z.string().min(2, { message: 'L_N should have 2 letters' }),
  primary_email: z.string().email({ message: 'Invalid email address' }),
  primary_phone: z.string().min(10, { message: 'Phone Number should have 10' }),
  city: z.string(),
  state: z.string(),
  country: z.string(),
})

// vendor edit
const zVendorEdit = z.object({
  first_name: z.string().min(2, { message: 'F_N should have 2 letters' }),
  last_name: z.string().min(2, { message: 'L_N should have 2 letters' }),
  primary_email: z.string().email({ message: 'Invalid email address' }),
  primary_phone: z.string().min(10, { message: 'Phone Number should have 10' }),
  city: z.string(),
  state: z.string(),
  country: z.string(),
})

// vendor contacts
const zVContacts = z.object({
  id: z.number(),
  // profile_image: z.string().url(),
  fname: z.string(),
  lname: z.string(),
  email1: z.string().email(),
  phone1: z.string(),
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  state: z.string(),
  county: z.string(),
  zip: z.string(),
  country: z.string(),
  date_created: z.string(),
  date_updated: z.string().optional(),
  uuid: z.string(),
})

// extend array of objects vendor
const zVendorDetails = zVendor.extend({
  contacts: z.array(zVContacts),
})

// clients zod types define
type TVendorDetails = z.infer<typeof zVendorDetails>
type TVendorCreate = z.infer<typeof zVendorCreate>
type TVendor = z.infer<typeof zVendor>
type TVContacts = z.infer<typeof zVContacts>

// vendor T - interface define
interface TVendorFindAll {
  data: TVendor[]
}

interface TVendorCreateResponse {
  data: TVendor
}

interface TVendorFindById {
  data: TVendor
  message: string
  ok: boolean
}

interface IFindContactsByVendorId {
  data: TContacts[]
  ok: boolean
  message: string
}

// export types

export type {
  TClient,
  TClientDetails,
  TVendorDetails,
  TContacts,
  TVContacts,
  TJobs,
  TClientFindAll,
  TContactsFindAll,
  TContactsFindById,
  TJobsFindById,
  TVendor,
  TVendorFindAll,
  TJobsFindAll,
  TClientFindById,
  TVendorFindById,
  IFindContactsByClientId,
  IFindContactsByVendorId,
  IFindJobsByClientId,
  TRemoveClientDataById,
  TClientCreateResponse,
  TContactCreateResponse,
  TVendorCreateResponse,
  TJobCreateResponse,
  TClientCreate,
  TVendorCreate,
  TContactCreate,
  TContactEdit,
  TJobCreate,
  TJobEdit,
}

// export ZOD
export {
  zClientCreate,
  zContactCreate,
  zContactEdit,
  zJobCreate,
  zJobEdit,
  zClientEdit,
  // vendor
  zVendorCreate,
  zVendorEdit,
}

// "fname": "Ranjit",
// "lname": "K",
// "address1": null,
// "address2": null,
// "city": null,
// "state": null,
// "county": null,
// "country": null,
// "zip": null,
// "fax": null,
// "email1": "rj@xyz.com",
// "phone1": null,
// "created_date": "2022-08-30 12:57:20",
// "modified_date": null,
// "created_by": 1,
// "modified_by": null,
// "delete_date": null,
// "status": "Y",
// "client_id": 2,
// "vendor_id": 2
