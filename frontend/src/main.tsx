import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import {
  SignedOut,
  RedirectToSignIn,
  SignedIn,
  ClerkProvider,
} from '@clerk/clerk-react'
import { useNavigate, Routes, Route, BrowserRouter } from 'react-router-dom'
import RouteLayout from './layout/RouteLayout.tsx'
import HomePage from './pages/HomePage.tsx'
import CreateServerModal from './components/modals/CreateServerModal.tsx'
import { ApolloProvider } from '@apollo/client'
import client from './apolloClient.ts'
import CreateChannelModal from './components/modals/CreateChannelModal.tsx'
import ChannelLayout from './layout/ChannelLayout.tsx'
import ChannelPage from './pages/ChannelPage.tsx'
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}
const RouterComponent = () => {
  const navigate = useNavigate()

  return (
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path="" element={<RouteLayout />}>
          <Route
            index={true}
            element={
              <ProtectedRoute>
                <CreateServerModal />
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="servers/:serverId/channels/:channelType/:channelId"
          element={<ChannelLayout />}
        >
          <Route
            index
            element={
              <ProtectedRoute>
                <CreateChannelModal />
                <ChannelPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </ClerkProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <RouterComponent />
        </BrowserRouter>
      </ApolloProvider>
    </MantineProvider>
  </React.StrictMode>
)

export default RouterComponent
