import {
  IFindContactsByClientId,
  IFindJobsByClientId,
  TClientCreate,
  TClientCreateResponse,
  TClientFindById,
  TContactCreate,
  TContactCreateResponse,
  TJobCreate,
  TJobCreateResponse,
} from '@/types'
import { IFindSubmissionByJobId } from '@/types/submission-type'
import axiosPrivate from './axiosPrivate'
import apiClient from './base'

// for client contact
const findContactsByClientId = async (
  uuid: string
): Promise<IFindContactsByClientId> => {
  const { data } = await axiosPrivate.get<IFindContactsByClientId>(
    `/contact/client/${uuid}`
  )
  return data
}

const findJobsByClientId = async (
  uuid: string
): Promise<IFindJobsByClientId> => {
  const { data } = await axiosPrivate.get<IFindJobsByClientId>(
    `/jobs/?client-uuid=${uuid}`
  )
  return data
}

// submissions
const findSubmissionByJobId = async (
  client_id: number,
  job_id: number
): Promise<IFindSubmissionByJobId> => {
  const { data } = await axiosPrivate.get<IFindSubmissionByJobId>(
    `submission/get/client/jobs?client_id=${client_id}&job_id=${job_id}`
  )
  return data
}

// add new form services
const createClient = async (
  client: TClientCreate
): Promise<TClientCreateResponse> => {
  const { data } = await apiClient.post<TClientCreateResponse>(
    '/clients',
    client
  )
  return data
}

// new contact create response
const createContact = async (
  client: TContactCreate
): Promise<TContactCreateResponse> => {
  const { data } = await apiClient.post<TContactCreateResponse>(
    '/contacts',
    client
  )
  return data
}

// new job create response
const createJob = async (client: TJobCreate): Promise<TJobCreateResponse> => {
  const { data } = await apiClient.post<TJobCreateResponse>('/contacts', client)
  return data
}

const findClientById = async (id: number) => {
  const response = await apiClient.get<TClientFindById>(`/clients/${id}`)
  return response.data
}

const ClientService = {
  findContactsByClientId,
  findJobsByClientId,
  createClient,
  findClientById,
  createContact,
  createJob,
  findSubmissionByJobId,
}

export default ClientService
