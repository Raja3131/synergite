// import { TClientFindAll } from '@/types'
// import { create } from 'domain'
// import { devtools, persist } from 'zustand/middleware'

// interface ClientState {
//   removeHeroDataById: (id: number) => void
//   clientData: TClientFindAll
// }

// const useClientData = create<ClientState>()(
//   devtools(
//     persist((set) => ({
//       removeClientDataById: (id) =>
//         set((state) => ({
//           clientData: {
//             data: state.clientData.data.filter(
//               (client: { id: any }) => client.id !== id
//             ),
//           },
//         })),
//     }))
//   )
// )
// export { useClientData }
