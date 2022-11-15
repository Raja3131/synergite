import { z } from 'zod'

// Roles List Data
const zRoles = z.object({
  // onboardingActivityId: z.number(),
  // role_uuid: z.string(),
  // immigration_status: z.string(),
  // employee_type: z.string(),
  // new_client: z.string(),
  // default_activity: z.string(),
  // department_uuid: z.string(),
  // new_subvendor: z.string(),
  name: z.string(),
  uuid: z.string(),
})

// new Roles add
const zRolesCreate = z.object({
  // immigration_status: z.string(),
  // employee_type: z.string(),
  // new_client: z.string(),
  // default_activity: z.string(),
  // new_subvendor: z.string(),
  // department_uuid: z.string(),
  name: z.string(),
})

// Roles edit
const zRolesEdit = z.object({
  // immigration_status: z.string(),
  // employee_type: z.string(),
  // new_client: z.string(),
  // default_activity: z.string(),
  // department_uuid: z.string(),
  // new_subvendor: z.string(),
  name: z.string(),
})

// // extend array of objects Roles
// const zRolesDetails = zRoles.extend({
//   contacts: z.array(zTask),
// })

// clients zod types define
// type TRolesDetails = z.infer<typeof zRolesDetails>
type TRolesCreate = z.infer<typeof zRolesCreate>
type TRoles = z.infer<typeof zRoles>

// Roles T - interface define
interface TRolesFindAll {
  data: TRoles[]
}

interface TRolesCreateResponse {
  data: TRoles
}

interface TRolesFindById {
  data: TRoles
  message: string
  ok: boolean
}

// export types

export type {
  TRoles,
  TRolesFindAll,
  TRolesFindById,
  TRolesCreateResponse,
  TRolesCreate,
}

// export ZOD
export { zRolesCreate, zRolesEdit }
