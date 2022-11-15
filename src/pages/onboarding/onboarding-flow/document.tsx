import { TDocument, TOnboarding } from '@/types/onboarding-flow-type'
import {
  Group,
  createStyles,
  Select,
  FileInput,
  ActionIcon,
  Text,
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { IconPlus, IconTrash, IconUpload } from '@tabler/icons'
import { randomId } from '@mantine/hooks'
import { useState } from 'react'

const useStyles = createStyles(() => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
}))

type onboardingStepperProps = {
  form: UseFormReturnType<TOnboarding>
}

// interface IDoc {
//   key: string
//   name: string
//   document_type: string
//   file: File | null
// }

const initialDoc = {
  key: '',
  name: '',
  document_type: '',
  file: undefined,
}

export default function Documents({ form }: onboardingStepperProps) {
  const { classes } = useStyles()

  const documents = form.values.documents || []

  const [docs, setDocs] = useState<TDocument[]>(
    documents.length > 0 ? documents : [{ ...initialDoc, key: randomId() }]
  )

  const addNewDoc = () => {
    initialDoc.key = randomId()
    setDocs((prevState) => [...prevState, initialDoc])
  } // End of addNewDoc

  const updateDocs = (data: TDocument) => {
    const updatedDocs = docs.map((doc) => {
      if (doc.key === data.key) {
        return {
          ...doc,
          document_type: data.document_type || doc.document_type,
          file: data.file || doc.file || undefined,
        }
      }
      return doc
    })

    form.setValues({ ...form.values, documents: updatedDocs })
    setDocs(updatedDocs)
  } // End of updateDocs

  const deleteDoc = (key: string) => {
    const updatedDocs = docs.filter((doc) => doc.key !== key)
    setDocs(updatedDocs)
  } // End of deleteDoc

  return (
    <>
      <ActionIcon
        style={{
          position: 'absolute',
          right: '46px',
        }}
        color="blue"
        onClick={addNewDoc}
      >
        <IconPlus size={40} />
      </ActionIcon>

      {docs.map((doc) => (
        <Group key={doc.key} align="center" grow mb={16}>
          <Select
            label="Document Type"
            placeholder="Document Type"
            value={doc.document_type}
            data={[
              { value: 'regular', label: 'Regular' },
              { value: 'premium', label: 'Premium' },
            ]}
            onChange={(value) =>
              updateDocs({
                document_type: value || '',
                key: doc.key,
                file: doc.file,
              })
            }
          />
          <FileInput
            label="Choose File"
            accept="image/*"
            placeholder="Choose File"
            icon={<IconUpload size={14} />}
            onChange={(value) =>
              updateDocs({
                document_type: doc.document_type || '',
                key: doc.key,
                file: value || undefined,
              })
            }
          />

          <div
            style={{
              position: 'absolute',
              right: '46px',
            }}
          >
            <ActionIcon
              color="red"
              mt={'xl'}
              // onClick={() => form.removeListItem('documents', index)}
              onClick={() => deleteDoc(doc.key)}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </div>
        </Group>
      ))}

      {/* <div className={classes.paper}>
        {form.values.documents?.length > 0 ? (
          <></>
        ) : (
          <Text color="dimmed" align="center">
            No document here...
          </Text>
        )}
        {form.values.documents ? (
          form.values.documents?.map((item, index) => (
            <Group key={item.key} align="center" grow>
              <Select
                label="Document Type"
                placeholder="Document Type"
                {...form.getInputProps(item.key + index.toString())}
                data={[
                  { value: 'regular', label: 'Regular' },
                  { value: 'premium', label: 'Premium' },
                ]}
              />
              <FileInput
                label="Choose File"
                type={'file'}
                accept="image/*"
                placeholder="Choose File"
                icon={<IconUpload size={14} />}
                {...form.getInputProps(item.key)}
              />

              <div
                style={{
                  position: 'absolute',
                  right: '46px',
                }}
              >
                <ActionIcon
                  color="red"
                  mt={'xl'}
                  onClick={() => form.removeListItem('documents', index)}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </div>
            </Group>
          ))
        ) : (
          <div></div>
        )}
        <ActionIcon
          style={{
            position: 'absolute',
            right: '46px',
          }}
          color="blue"
          onClick={() =>
            form.insertListItem('documents', {
              document_type: '',
              choose_file: '',
              key: randomId(),
            })
          }
        >
          <IconPlus size={16} />
        </ActionIcon>
      </div> */}
    </>
  )
}
