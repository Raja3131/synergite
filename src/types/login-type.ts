import { z } from 'zod'

const zLoginValidation = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string(),
})

const zForgotValidation = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

// reset password
const zResetPassword = z
  .object({
    password: z.string().min(6),
    confirm_password: z.string().min(6),
  })
  .superRefine(({ confirm_password, password }, ctx) => {
    if (confirm_password !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
      })
    }
  })

interface user {
  id: number
  first_name: string
  last_name: string
  email_id: string
}

export { zLoginValidation, zForgotValidation, zResetPassword, user }
