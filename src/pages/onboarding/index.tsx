import { useEffect } from 'react'
import { TClient, TVendor } from '@/types'
import { TCandidate } from '@/types/candidate-type'
import { TOnboarding } from '@/types/onboarding-flow-type'
import {
  Button,
  Group,
  createStyles,
  Stepper,
  TextInput,
  Accordion,
  Text,
  Divider,
  Box,
  Tooltip,
  Drawer,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useState } from 'react'
import Payment from './onboarding-flow/payment'
import Documents from './onboarding-flow/document'
import Immigration from './onboarding-flow/immigration'
import Job from './onboarding-flow/job'

import { useNavigate, useSearchParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import Review from './onboarding-flow/review'

import {
  createOnboarding,
  getOnboardingByUUID,
} from '@/services/onboarding.services'

import {
  IconBriefcase,
  IconChevronsRight,
  IconFileDots,
  IconShieldCheck,
  IconWallet,
  IconWorldUpload,
} from '@tabler/icons'

import useGetClientById from '../client/hooks/useGetClientById'
import useGetVendorById from '../vendor/hooks/useGetVendorById'
import useGetCandidateById from '../candidate/hooks/useGetCandidateById'

import { openConfirmModal } from '@mantine/modals'

import CandidateDetails from '@/components/form/details/candidate-details/candidateDetails'
import ClientDetails from '@/components/form/details/client-details/clientDetails'
import VendorDetails from '@/components/form/details/vendor-details/vendorDetails'
import { randomId } from '@mantine/hooks'

const useStyles = createStyles((theme) => ({
  onboarding: {
    display: 'flex',
    paddingLeft: '10px',
    paddingRight: '10px',
    gap: '20px',
    width: '100%',

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },
  tabs: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.35)',
    flex: 1,
    height: '88vh',
    display: 'none',
  },
  stepperMain: {
    boxShadow: '1px 1px 12px rgba(152, 195, 255, 0.35)',
    width: '100%',
    padding: 20,
    borderRadius: 'sm',
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
    },
  },
  stepper: {
    height: '65vh',
  },
  dividerText: {
    color: theme.colors.blue[9],
  },
  detailHead: {
    border: `1px solid ${theme.colors.blue[1]}`,
    padding: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '5px',
  },
  iconCheck: {
    cursor: 'pointer',
  },
}))

export default function Onboarding() {
  const { classes } = useStyles()
  const [candidateDetailsOpened, setCandidateDetailsIsOpened] = useState(false)
  const [clientDetailsOpened, setClientDetailsIsOpened] = useState(false)
  const [vendorDetailsOpened, setVendorDetailsIsOpened] = useState(false)

  // details states
  const [active, setActive] = useState(0)

  const draft_onboarding_uuid =
    localStorage.getItem('draft_onboarding_uuid') || ''
  const { data: onboardingData } = useQuery(
    `/onboarding/${draft_onboarding_uuid}`,
    () =>
      draft_onboarding_uuid ? getOnboardingByUUID(draft_onboarding_uuid) : null
  )

  const [onboardingStepperData, setOnboardingStepperData] =
    useState<TOnboarding>({} as TOnboarding)

  const [isOnboardingInitiated, setIsOnboardingInitiated] =
    useState<boolean>(false)

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const clientUUID = searchParams.get('client_uuid')
  const vendorUUID = searchParams.get('vendor_uuid')
  const employeeUUID = searchParams.get('employee_uuid')
  console.log('candidateUUID', employeeUUID)

  const { data: clientData } = useGetClientById(clientUUID || '')
  const { data: vendorData } = useGetVendorById(vendorUUID || '')
  const { data: employeeData } = useGetCandidateById(employeeUUID || '')

  // onboarding flow states
  const form = useForm<TOnboarding>({
    initialValues: {
      ...onboardingStepperData,
    },
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  })

  useEffect(() => {
    if (onboardingData) {
      setOnboardingStepperData(onboardingData || {})
    }
  }, [onboardingData])

  useEffect(() => {
    if (active === 4) {
      setOnboardingStepperData(form.values)
    }
  }, [active, form.values])

  // onConfirmSaveOnboarding
  const onConfirmSaveOnboarding = (values: TOnboarding) => {
    const d = new Date(values.start_date)
    d.setHours(0, 0, 0, 0)
    const onboardingData = {
      ...values,
      employee_uuid: employeeUUID,
      vendor_uuid: vendorUUID,
      client_uuid: clientUUID,
      submission_uuid: '',
    }

    console.log(onboardingData)

    if (draft_onboarding_uuid) {
      onboardingData.uuid = draft_onboarding_uuid
    }

    setIsOnboardingInitiated(true)
    createOnboarding(onboardingData)
      .then((data) => {
        if (active >= 4) {
          localStorage.removeItem('draft_onboarding_uuid')
        } else {
          localStorage.setItem(
            'draft_onboarding_uuid',
            data?.uuid ? data.uuid : ''
          )
        }

        showNotification({
          title: 'Success!!',
          message: 'Onboarding save called successfully.',
        })
        if (active === 4) {
          navigate('/onboarding-list')
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setIsOnboardingInitiated(false))
  }

  // handleSave function
  const handleSave = (values: TOnboarding) => {
    console.log(values)
    if (active >= 4) {
      openConfirmModal({
        title: 'Are you sure you want to submit the details?',
        children: (
          <Text size="sm">
            After submit the details, You cannot edit them back. So, Please take
            your Action Carefully.
          </Text>
        ),
        labels: { confirm: 'Yes', cancel: 'No' },
        onCancel: () => console.log('Cancel'),
        onConfirm: () => {
          onConfirmSaveOnboarding(values)
        },
      })
    } else {
      onConfirmSaveOnboarding(values)
    }
  } // End of handleSave function

  const canName = `${employeeData?.data?.fname || ''} ${
    employeeData?.data?.lname || ''
  }`

  const clName = `${clientData?.data?.first_name || ''} ${
    clientData?.data?.last_name || ''
  }`

  const venName = `${vendorData?.data?.first_name || ''} ${
    vendorData?.data?.last_name || ''
  }`

  // next btn
  const nextStep = () => {
    setActive((current) => (current < 5 ? current + 1 : current))
  }

  // prev btn
  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current))
  }

  return (
    <>
      <div className={classes.onboarding}>
        {/* Onboarding flow stepper */}
        <div className={classes.stepperMain}>
          <form onSubmit={form.onSubmit(handleSave)}>
            {/* Candidate */}
            <Accordion defaultValue="">
              <Accordion.Item
                value="employee_details"
                style={{ borderBottom: 'none' }}
              >
                <Accordion.Control style={{ padding: '0' }}>
                  <Divider
                    className={classes.dividerText}
                    my="20px"
                    label={
                      <>
                        <IconChevronsRight />
                        <Box
                          style={{
                            fontFamily: '-moz-initial',
                            fontSize: '16px',
                          }}
                          ml={5}
                        >
                          Candidate : {canName}
                        </Box>
                      </>
                    }
                  />
                </Accordion.Control>
                {/* candidate */}
                <Accordion.Panel>
                  <Group grow align="center" mb="lg">
                    <Tooltip
                      label="Click to view"
                      color="blue"
                      withArrow
                      transition="pop-top-right"
                      transitionDuration={300}
                      onClick={() => setCandidateDetailsIsOpened(true)}
                    >
                      <TextInput
                        readOnly={true}
                        label="Candidate Name"
                        type={'text'}
                        placeholder="Candidate Name"
                        value={canName}
                        onClick={() => setCandidateDetailsIsOpened(true)}
                        style={{ minWidth: '200px' }}
                      />
                    </Tooltip>
                    <TextInput
                      readOnly={true}
                      label="Email"
                      type={'email'}
                      placeholder="Email"
                      value={employeeData?.data?.email}
                      style={{ minWidth: '200px' }}
                    />
                    <TextInput
                      readOnly={true}
                      label="Phone"
                      type={'number'}
                      placeholder="Phone"
                      value={employeeData?.data?.phone}
                      style={{ minWidth: '200px' }}
                    />
                    <TextInput
                      readOnly={true}
                      label="SSN"
                      type={'text'}
                      placeholder="SSN"
                      value={employeeData?.data?.ssn_no}
                      style={{ minWidth: '200px' }}
                    />
                    <TextInput
                      readOnly={true}
                      label="Date of birth"
                      type={'date'}
                      placeholder="Date of birth"
                      value={employeeData?.data?.dob}
                      style={{ minWidth: '100px' }}
                    />
                  </Group>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>

            <Stepper
              color="green"
              size="sm"
              active={active}
              onStepClick={setActive}
              breakpoint="sm"
            >
              <Stepper.Step
                icon={<IconBriefcase size={18} />}
                label="Job"
                description="Job Information..."
              >
                {/* client and vendor */}
                <Accordion defaultValue="">
                  {/* Client */}
                  <Accordion.Item
                    value="client"
                    style={{ borderBottom: 'none' }}
                  >
                    <Accordion.Control style={{ padding: '0' }}>
                      <Divider
                        className={classes.dividerText}
                        my="20px"
                        label={
                          <>
                            <IconChevronsRight />
                            <Box
                              ml={5}
                              style={{
                                fontFamily: '-moz-initial',
                                fontSize: '16px',
                              }}
                            >
                              Client : {clName}
                            </Box>
                          </>
                        }
                      />
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Group grow align="center" mt="md">
                        <Tooltip
                          label="Click to view"
                          color="blue"
                          withArrow
                          transition="pop-top-right"
                          transitionDuration={300}
                          onClick={() => setClientDetailsIsOpened(true)}
                        >
                          <TextInput
                            readOnly={true}
                            label="Account Name"
                            type={'text'}
                            placeholder="Account Name"
                            value={clName}
                            onClick={() => setClientDetailsIsOpened(true)}
                          />
                        </Tooltip>
                        <TextInput
                          readOnly={true}
                          label="Address line 1"
                          type={'text'}
                          placeholder="Address line 1"
                          value={clientData?.data?.address_line1}
                        />
                        <TextInput
                          readOnly={true}
                          label="Address line 2"
                          type={'text'}
                          placeholder="Address line 2"
                          value={clientData?.data?.address_line2}
                        />
                        <TextInput
                          readOnly={true}
                          label="City"
                          type={'text'}
                          placeholder="City"
                          value={clientData?.data?.city}
                        />
                        <TextInput
                          readOnly={true}
                          label="State"
                          type={'text'}
                          placeholder="State"
                          value={clientData?.data?.state}
                        />
                      </Group>
                    </Accordion.Panel>
                  </Accordion.Item>

                  {/* Vendor */}
                  <Accordion.Item
                    value="vendor"
                    style={{ borderBottom: 'none' }}
                  >
                    <Accordion.Control style={{ padding: '0' }}>
                      <Divider
                        className={classes.dividerText}
                        my="20px"
                        label={
                          <>
                            <IconChevronsRight />
                            <Box
                              style={{
                                fontFamily: '-moz-initial',
                                fontSize: '16px',
                              }}
                              ml={5}
                            >
                              Vendor : {venName}
                            </Box>
                          </>
                        }
                      />
                    </Accordion.Control>
                    <Accordion.Panel>
                      {/* <OnboardVendorDetails
                        key={((vendorData?.data || {}) as TVendor)?.uuid}
                        {...((vendorData?.data || {}) as TVendor)}
                      /> */}
                      <Group grow align="center" mt="md">
                        <Tooltip
                          label="Click to view"
                          color="blue"
                          withArrow
                          transition="pop-top-right"
                          transitionDuration={300}
                          onClick={() => setVendorDetailsIsOpened(true)}
                        >
                          <TextInput
                            readOnly={true}
                            label="Vendor Name"
                            type={'text'}
                            placeholder="Vendor Name"
                            value={venName}
                            onClick={() => setVendorDetailsIsOpened(true)}
                          />
                        </Tooltip>
                        <TextInput
                          readOnly={true}
                          label="Email"
                          type={'email'}
                          placeholder="email@email.com"
                          value={vendorData?.data?.primary_email}
                        />
                        <TextInput
                          readOnly={true}
                          label="Phone"
                          type={'tel'}
                          placeholder="Phone"
                          value={vendorData?.data?.primary_phone}
                        />
                        <TextInput
                          readOnly={true}
                          label="City"
                          type={'text'}
                          placeholder="City"
                          value={vendorData?.data?.city}
                        />
                        <TextInput
                          readOnly={true}
                          label="State"
                          type={'text'}
                          placeholder="State"
                          value={vendorData?.data?.state}
                        />
                      </Group>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
                <Job form={form} />
              </Stepper.Step>
              <Stepper.Step
                icon={<IconWallet size={18} />}
                label="Payments"
                description="Payment Information..."
              >
                <Payment form={form} />
              </Stepper.Step>
              <Stepper.Step
                icon={<IconWorldUpload size={18} />}
                label="Immigration"
                description="Immigration Information..."
              >
                <Immigration form={form} />
              </Stepper.Step>
              <Stepper.Step
                icon={<IconFileDots size={18} />}
                label="Documents"
                description="Documents Information..."
              >
                <Documents form={form} />
              </Stepper.Step>
              <Stepper.Step
                icon={<IconShieldCheck size={18} />}
                label="Summary"
                description="Summary Information..."
              >
                <Review
                  onboardingData={onboardingStepperData}
                  onReviewTileClick={(id) => setActive(+id)}
                />
              </Stepper.Step>
            </Stepper>
            <Group position="center" mt="5rem">
              <Button
                variant="default"
                disabled={active <= 0}
                onClick={prevStep}
              >
                Previous
              </Button>
              {active < 5 ? (
                <Button variant="light" type="submit">
                  Save
                </Button>
              ) : (
                <Button variant="light" type="submit">
                  {isOnboardingInitiated
                    ? 'Onboarding Initiated'
                    : 'Initiate Onboarding'}
                  Initiate Onboarding
                </Button>
              )}
              {active <= 3 && <Button onClick={nextStep}>Next</Button>}
            </Group>
          </form>
        </div>
        {/* candidate details */}
        <Drawer
          opened={candidateDetailsOpened}
          onClose={() => setCandidateDetailsIsOpened(false)}
          transitionDuration={700}
          transitionTimingFunction="ease"
          title="Candidate Details"
          padding="xl"
          size="1200px"
          position="right"
        >
          <Divider
            className={classes.dividerText}
            my="10px"
            label={
              <>
                <IconChevronsRight />
                <Box style={{ fontFamily: '-moz-initial' }} ml={5}>
                  {canName}
                </Box>
              </>
            }
          />
          <CandidateDetails
            key={employeeUUID}
            {...((employeeData?.data || {}) as TCandidate)}
          />
        </Drawer>
        {/* client details */}
        <Drawer
          opened={clientDetailsOpened}
          onClose={() => setClientDetailsIsOpened(false)}
          transitionDuration={700}
          transitionTimingFunction="ease"
          title="Client Details"
          padding="xl"
          size="1200px"
          position="right"
        >
          <Divider
            className={classes.dividerText}
            my="10px"
            label={
              <>
                <IconChevronsRight />
                <Box style={{ fontFamily: '-moz-initial' }} ml={5}>
                  {clName}
                </Box>
              </>
            }
          />
          <ClientDetails
            key={clientUUID}
            {...((clientData?.data || {}) as TClient)}
          />
        </Drawer>
        {/* vendor details */}
        <Drawer
          opened={vendorDetailsOpened}
          onClose={() => setVendorDetailsIsOpened(false)}
          transitionDuration={700}
          transitionTimingFunction="ease"
          title="Vendor Details"
          padding="xl"
          size="1200px"
          position="right"
        >
          <Divider
            className={classes.dividerText}
            my="10px"
            label={
              <>
                <IconChevronsRight />
                <Box style={{ fontFamily: '-moz-initial' }} ml={5}>
                  {venName}
                </Box>
              </>
            }
          />
          <VendorDetails
            key={vendorUUID}
            {...((vendorData?.data || {}) as TVendor)}
          />
        </Drawer>
      </div>
    </>
  )
}
