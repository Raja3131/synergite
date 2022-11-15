import { z } from 'zod'

// Activity List Data
const zActivity = z.object({
  uuid: z.string(),
  role_uuid: z.string(),
  immigration_status: z.string(),
  employee_type: z.string(),
  new_client: z.string(),
  default_activity: z.string(),
  // assigneeRole: z.string(),
  department_uuid: z.string(),
  new_subvendor: z.string(),
  // isActiveStatus: z.string(),
  // createdDate: z.string().optional(),
  // modifiedBy: z.string().optional(),
  // modifiedDate: z.string().optional(),
})

// new Activity add
const zActivityCreate = z.object({
  immigration_status: z.string(),
  employee_type: z.string(),
  new_client: z.string(),
  default_activity: z.string(),
  // assigneeRole: z.string(),
  new_subvendor: z.string(),
  department_uuid: z.string(),
})

// Activity edit
const zActivityEdit = z.object({
  immigration_status: z.string(),
  employee_type: z.string(),
  new_client: z.string(),
  default_activity: z.string(),
  // assigneeRole: z.string(),
  department_uuid: z.string(),
  new_subvendor: z.string(),
})

// Activity task
const zTask = z.object({
  uuid: z.string(),
  activity_id: z.string(),
  // created_by: z.number(),
  default_task: z.string(),
  status: z.string(),
  // created_date: z.string(),
  // modified_by: z.string(),
  // modified_date: z.string().optional(),
  // delete_date: z.string().optional(),
})

const zTaskCreate = z.object({
  // onboarding_activity_id: z.number(),
  default_task: z.string(),
  onboarding_activity_id: z.number().optional(),
})

// contacts edit

const zTaskEdit = z.object({
  // onboarding_activity_id: z.number(),
  created_by: z.number(),
  default_task: z.string(),
  status: z.string(),
})

// extend array of objects Activity
const zActivityDetails = zActivity.extend({
  contacts: z.array(zTask),
})

// clients zod types define
type TActivityDetails = z.infer<typeof zActivityDetails>
type TActivityCreate = z.infer<typeof zActivityCreate>
type TActivity = z.infer<typeof zActivity>
type TTasks = z.infer<typeof zTask>
type TTaskCreate = z.infer<typeof zTaskCreate>
type TTaskEdit = z.infer<typeof zTaskEdit>

// Activity T - interface define
interface TActivityFindAll {
  data: TActivity[]
}

interface TActivityCreateResponse {
  data: TActivity
}

interface TActivityFindById {
  data: TActivity
  message: string
  ok: boolean
}

interface TTaskFindById {
  data: TTasks[]
  message: string
  ok: boolean
}

interface IFindTasksByActivityId {
  data: TTasks[]
  ok: boolean
  message: string
}

// export types

export type {
  TActivityDetails,
  TActivity,
  TActivityFindAll,
  TActivityFindById,
  IFindTasksByActivityId,
  TActivityCreateResponse,
  TActivityCreate,
  TTasks,
  TTaskCreate,
  TTaskEdit,
  TTaskFindById,
}

// export ZOD
export { zActivityCreate, zActivityEdit, zTaskCreate, zTaskEdit }
