import {
  IFindContactsByVendorId,
  TContactCreate,
  TContactCreateResponse,
} from '@/types'
import { IFindTasksByActivityId } from '@/types/activity-type'
import axiosPrivate from './axiosPrivate'
import apiClient from './base'

const findContactsByVendorId = async (
  id: string
): Promise<IFindContactsByVendorId> => {
  const { data } = await axiosPrivate.get<IFindContactsByVendorId>(
    `/contact/vendor/${id}`
  )
  return data
}

const findTaskByActivityId = async (
  id: number
): Promise<IFindTasksByActivityId> => {
  const { data } = await axiosPrivate.get<IFindTasksByActivityId>(
    `/contact/vendor/${id}`
  )
  return data
}

const createContact = async (
  vendor: TContactCreate
): Promise<TContactCreateResponse> => {
  const { data } = await apiClient.post<TContactCreateResponse>(
    '/contacts',
    vendor
  )
  return data
}

const VendorService = {
  findContactsByVendorId,
  createContact,
  findTaskByActivityId,
}

export default VendorService
