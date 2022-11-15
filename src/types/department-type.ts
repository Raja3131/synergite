import { z } from 'zod'

// Department List Data
const zDepartment = z.object({
  // onboardingActivityId: z.number(),
  // role_uuid: z.string(),
  // immigration_status: z.string(),
  // employee_type: z.string(),
  // new_client: z.string(),
  // default_activity: z.string(),
  // department_uuid: z.string(),
  // new_subvendor: z.string(),
  uuid: z.string(),
  name: z.string(),
  status: z.string(),
})

// new Department add
const zDepartmentCreate = z.object({
  // immigration_status: z.string(),
  // employee_type: z.string(),
  // new_client: z.string(),
  // default_activity: z.string(),
  // new_subvendor: z.string(),
  // department_uuid: z.string(),
  name: z.string(),
  // status: z.string(),
})

// Department edit
const zDepartmentEdit = z.object({
  // immigration_status: z.string(),
  // employee_type: z.string(),
  // new_client: z.string(),
  // default_activity: z.string(),
  // department_uuid: z.string(),
  // new_subvendor: z.string(),
  name: z.string(),
  status: z.string(),
})

// // extend array of objects Department
// const zDepartmentDetails = zDepartment.extend({
//   contacts: z.array(zTask),
// })

// clients zod types define
// type TDepartmentDetails = z.infer<typeof zDepartmentDetails>
type TDepartmentCreate = z.infer<typeof zDepartmentCreate>
type TDepartment = z.infer<typeof zDepartment>

// Department T - interface define
interface TDepartmentFindAll {
  data: TDepartment[]
}

interface TDepartmentCreateResponse {
  data: TDepartment
}

interface TDepartmentFindById {
  data: TDepartment
  message: string
  ok: boolean
}

// export types

export type {
  TDepartment,
  TDepartmentFindAll,
  TDepartmentFindById,
  TDepartmentCreateResponse,
  TDepartmentCreate,
}

// export ZOD
export { zDepartmentCreate, zDepartmentEdit }
