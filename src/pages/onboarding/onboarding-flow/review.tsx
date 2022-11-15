import theme from '@/theme/theme'
import { TOnboarding } from '@/types/onboarding-flow-type'
import { Accordion, ActionIcon, Card, Group, TextInput } from '@mantine/core'
import { randomId } from '@mantine/hooks'
import {
  IconBriefcase,
  IconEdit,
  IconFileDots,
  IconWallet,
  IconWorldUpload,
} from '@tabler/icons'
import { useState } from 'react'

interface ReviewProps {
  onReviewTileClick: (id: string) => void
  onboardingData: TOnboarding
}

const styles = {
  accordionControl: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  previewKey: {
    color: theme.colors?.grey?.[9],
  },
}

const Review: React.FC<ReviewProps> = ({
  onboardingData,
  onReviewTileClick,
}) => {
  const [documentFilePreview, setDocumentFilePreview] = useState<string>()

  const actionIcon = (index: string) => {
    return (
      <ActionIcon
        style={{ textAlign: 'right' }}
        onClick={() => onReviewTileClick(index)}
      >
        <IconEdit size={16} style={{ textAlign: 'right', color: 'blue' }} />
      </ActionIcon>
    )
  }

  console.log('[onboardingData] =', onboardingData)

  const documentFile = []
  // if (typeof onboardingData.choose_file === 'object') {
  //   const fileReader = new FileReader()
  //   fileReader.readAsDataURL(onboardingData.choose_file)
  //   fileReader.onload = (event) => {
  //     setDocumentFilePreview((event.target?.result || []) as string)
  //   }
  // } else {
  //   documentFile = onboardingData.choose_file
  // }

  const getFileImage = (file: File | undefined) => {
    if (!file) return ''

    let filePreviewUrl = ''
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = (event) => {
      // setDocumentFilePreview((event.target?.result || []) as string)
      // console.log(event.target?.result)
      filePreviewUrl = (event.target?.result || []) as string
    }

    return filePreviewUrl
  } // End of getFileImage

  return (
    <div>
      <h3>Review</h3>

      <Accordion defaultValue="jobs">
        <Accordion.Item value="jobs">
          <Accordion.Control>
            <div style={styles.accordionControl}>
              <Group>
                <IconBriefcase size={18} style={{ color: 'blue' }} />
                <span>Jobs</span>
              </Group>
              <span>{actionIcon('0')}</span>
            </div>
          </Accordion.Control>
          <Accordion.Panel>
            <Card
              style={{
                border: `1px solid skyblue`,
              }}
            >
              <Group grow align="center" mb="lg">
                <TextInput
                  readOnly={true}
                  label="Start Date"
                  type={'date'}
                  placeholder="Start Date"
                  value={onboardingData.start_date?.toString()}
                  style={{ minWidth: '200px' }}
                />
                <TextInput
                  readOnly={true}
                  label="End Date"
                  type={'date'}
                  placeholder="End Date"
                  value={onboardingData.end_date?.toString()}
                  style={{ minWidth: '200px' }}
                />
                <TextInput
                  readOnly={true}
                  label="Reporting to"
                  type={'text'}
                  placeholder="Reporting to"
                  value={onboardingData.reporting_to}
                  style={{ minWidth: '200px' }}
                />
                <TextInput
                  readOnly={true}
                  label="Designation"
                  type={'text'}
                  placeholder="Designation"
                  value={onboardingData.designation}
                  style={{ minWidth: '200px' }}
                />
              </Group>
              <Group grow align="center" mb="lg">
                <TextInput
                  readOnly={true}
                  label="Overtime Exemption"
                  type={'text'}
                  placeholder="Overtime Exemption"
                  value={onboardingData.overtime_exemption}
                  style={{ minWidth: '100px' }}
                />
                <TextInput
                  readOnly={true}
                  label="Remarks"
                  type={'text'}
                  placeholder="Remarks"
                  value={onboardingData.remarks}
                  style={{ minWidth: '100px' }}
                />
              </Group>
            </Card>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="payments">
          <Accordion.Control>
            <div style={styles.accordionControl}>
              <Group>
                <IconWallet size={18} style={{ color: 'blue' }} />
                <span>Payments</span>
              </Group>
              <span>{actionIcon('1')}</span>
            </div>
          </Accordion.Control>
          <Accordion.Panel>
            <Card
              style={{
                border: `1px solid skyblue`,
              }}
            >
              <Group grow align="center" mb="lg">
                <TextInput
                  readOnly={true}
                  label="Bill Rate"
                  type={'text'}
                  placeholder="Bill Rate"
                  value={onboardingData.bill_rate}
                  style={{ minWidth: '200px' }}
                />
                <TextInput
                  readOnly={true}
                  label="Pay Rate"
                  type={'text'}
                  placeholder="Pay Rate"
                  value={onboardingData.pay_rate}
                  style={{ minWidth: '200px' }}
                />
                <TextInput
                  readOnly={true}
                  label="Payment frequency"
                  type={'text'}
                  placeholder="Payment frequency"
                  value={onboardingData.payment_frequency}
                  style={{ minWidth: '200px' }}
                />
                <TextInput
                  readOnly={true}
                  label="Account Manager Commission"
                  type={'text'}
                  placeholder="Account Manager Commission"
                  value={onboardingData.account_manager_commission}
                  style={{ minWidth: '200px' }}
                />
              </Group>
              <Group grow align="center" mb="lg">
                <TextInput
                  readOnly={true}
                  label="Recruitment Manager Commission"
                  type={'text'}
                  placeholder="Recruitment Manager Commission"
                  value={onboardingData.recruitment_manager_commission}
                  style={{ minWidth: '100px' }}
                />
                <TextInput
                  readOnly={true}
                  label="Recruitment Commission"
                  type={'text'}
                  placeholder="Recruitment Commission"
                  value={onboardingData.recruitment_commission}
                  style={{ minWidth: '100px' }}
                />
                <TextInput
                  readOnly={true}
                  label="Additional Commission"
                  type={'text'}
                  placeholder="Additional Commission"
                  value={onboardingData.additional_commission}
                  style={{ minWidth: '100px' }}
                />
                <TextInput
                  readOnly={true}
                  label="Additional Information"
                  type={'text'}
                  placeholder="Additional Information"
                  value={onboardingData.additional_information}
                  style={{ minWidth: '100px' }}
                />
              </Group>
            </Card>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="immigration">
          <Accordion.Control>
            <div style={styles.accordionControl}>
              <Group>
                <IconWorldUpload size={18} style={{ color: 'blue' }} />
                <span>Immigration</span>
              </Group>
              <span>{actionIcon('2')}</span>
            </div>
          </Accordion.Control>
          <Accordion.Panel>
            <Card
              style={{
                border: `1px solid skyblue`,
              }}
            >
              <Group grow align="center" mb="lg">
                <TextInput
                  readOnly={true}
                  label="Processing Type"
                  type={'text'}
                  placeholder="Processing Type"
                  value={onboardingData.processing_type}
                  style={{ minWidth: '100px' }}
                />
                <TextInput
                  readOnly={true}
                  label="Who is going to pay Premium"
                  type={'text'}
                  placeholder="Who is going to pay Premium"
                  value={onboardingData.who_is_going_to_pay_premium}
                  style={{ minWidth: '100px' }}
                />
                <TextInput
                  readOnly={true}
                  label="Immigration Job Title"
                  type={'text'}
                  placeholder="Immigration Job Title"
                  value={onboardingData.immigration_job_title}
                  style={{ minWidth: '100px' }}
                />
                <TextInput
                  readOnly={true}
                  label="Current H1B validity"
                  type={'text'}
                  placeholder="Current H1B validity"
                  value={onboardingData.current_h1b_validity}
                  style={{ minWidth: '100px' }}
                />
                <TextInput
                  readOnly={true}
                  label="Current LCA Number"
                  type={'text'}
                  placeholder="Current LCA Number"
                  value={onboardingData.current_lac_number}
                  style={{ minWidth: '100px' }}
                />
              </Group>
            </Card>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="document">
          <Accordion.Control>
            <div style={styles.accordionControl}>
              <Group>
                <IconFileDots size={18} style={{ color: 'blue' }} />
                <span>Document</span>
              </Group>
              <span>{actionIcon('3')}</span>
            </div>
          </Accordion.Control>
          <Accordion.Panel>
            <Card
              style={{
                border: `1px solid skyblue`,
              }}
            >
              {onboardingData?.documents?.map((document) => (
                <Group key={document.key} grow align="center" mb="lg">
                  <TextInput
                    readOnly={true}
                    label="Document Type"
                    type={'text'}
                    placeholder="Document Type"
                    value={document.document_type}
                    style={{ minWidth: '100px' }}
                  />
                  <p>
                    <span style={styles.previewKey}>File:</span>{' '}
                    <span>{document.file?.name}</span>
                  </p>
                </Group>
              ))}

              {/* <Group grow align="center" mb="lg">
                <TextInput
                  readOnly={true}
                  label="Document Type"
                  type={'text'}
                  placeholder="Document Type"
                  value={onboardingData.document_type}
                  style={{ minWidth: '100px' }}
                />
                <p>
                  <span style={styles.previewKey}>File:</span>{' '}
                  {documentFilePreview ? (
                    <img
                      src={documentFilePreview}
                      alt="document preview"
                      style={{
                        width: '80px',
                        height: '80px',
                        marginLeft: '8px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    'documentFile'
                  )}
                </p>
              </Group> */}
            </Card>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default Review
