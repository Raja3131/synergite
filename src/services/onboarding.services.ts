import { TOnboarding } from '@/types/onboarding-flow-type'
import axiosPrivate from './axiosPrivate'

export type TDepartment = 'Accounts' | 'Contracts' | 'HR' | 'Immigration'

interface IOnboardingResponse {
  id: string
  uuid: string
  onboard_status: string
}

interface IActivityResponse {
  id: string
  uuid: string
  assigned_to: string
  assigned_by: string
  activity_status: string
}

export interface ITaskResponse {
  id: string
  task_name: string
  is_complete: string
  completed_datetime: string
  need_by_datetime: string
}

const getFormattedDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDay()

  return `${year}-${month > 9 ? month : '0' + month.toString()}-${
    day > 9 ? day : '0' + day.toString()
  } 00:00:00`
}

export const createOnboarding = async (onboarding: TOnboarding) => {
  const onboardingData: { start_date?: string; end_date?: string } = {}

  if (onboarding.start_date) {
    onboardingData.start_date = getFormattedDate(
      new Date(onboarding.start_date)
    )
  }
  if (onboarding.end_date) {
    onboardingData.end_date = getFormattedDate(new Date(onboarding.end_date))
  }

  try {
    const { data } = await axiosPrivate.post<{
      data: { uuid: string }
    }>('/onboarding', {
      ...onboarding,
      ...onboardingData,
      documents: undefined,
    })
    return data.data
  } catch (error) {
    console.log(error)
  }
} // End of createOnboarding

export const getOnboardingList = async () => {
  try {
    const { data } = await axiosPrivate.get<{ data: TOnboarding[] }>(
      '/onboarding'
    )
    return data.data
  } catch (error) {
    console.log(error)
  }
} // End of getOnboardingList

export const getOnboardingByUUID = async (onboardingUUID: string) => {
  try {
    const { data } = await axiosPrivate.get<{ data: TOnboarding }>(
      `/onboarding/${onboardingUUID}`
    )
    return data.data
  } catch (error) {
    console.log(error)
  }
} // End of getOnboardingByUUID

export const getActivitiesByOnboardingId = async (
  onboardingId: string,
  department: TDepartment
) => {
  try {
    const { data } = await axiosPrivate.get<{ data: IActivityResponse[] }>(
      `/activity/filter/dept?onboarding_id=${onboardingId}&dept_uuid=${department}`
    )
    return data.data
  } catch (error) {
    console.log(error)
  }
} // End of getActivitiesByOnboardingId

export const getTasksByActivityId = async (activityId: string) => {
  try {
    const { data } = await axiosPrivate.get<{ data: ITaskResponse[] }>(
      `/task/${activityId}`
    )
    console.log(data)
    return data.data
  } catch (error) {
    console.log(error)
  }
} // End of getTasksByActivityId

export const updateTaskStatusByTaskId = async (
  taskId: string,
  status: 'Y' | 'N'
) => {
  try {
    const { data } = await axiosPrivate.post<{ data: { message: string } }>(
      `/onboarding/status/update?task_id=${taskId}&is_complete=${status}`
    )
    console.log(data)
    return data.data.message
  } catch (error) {
    console.log(error)
  }
} // End of updateTaskStatusByTaskId
