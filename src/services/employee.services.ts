import { TAEmployee } from '@/types/employee-type'
import axiosPrivate from './axiosPrivate'

export type TDepartment = 'Accounts' | 'Contracts' | 'HR' | 'Immigration'

export const getEmployeeByUUID = async (employeeUUID: string) => {
  try {
    const { data } = await axiosPrivate.get<{ data: TAEmployee }>(
      `/employee/${employeeUUID}`
    )
    return data.data
  } catch (error) {
    console.log(error)
  }
} // End of getEmployeeByUUID
