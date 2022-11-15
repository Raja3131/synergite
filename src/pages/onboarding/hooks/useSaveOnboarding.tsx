import { onboardingQueryKeys } from '@/react-query/queryKeys'
import axiosPrivate from '@/services/axiosPrivate'
import { TOnboarding, TOnboardingFindById } from '@/types/onboarding-flow-type'
import { useMutation, useQueryClient } from 'react-query'

const saveOnboarding = async (
  data: TOnboarding
): Promise<TOnboardingFindById> => {
  return await axiosPrivate.post(`/onboarding/save`, data)
}

const useSaveOnboarding = () => {
  const queryClient = useQueryClient()

  return useMutation(saveOnboarding, {
    onSuccess: () => {
      void queryClient.resetQueries(onboardingQueryKeys.allOnboarding)
      console.log('Onboarding save called successfully')
    },
  })
}

export default useSaveOnboarding
