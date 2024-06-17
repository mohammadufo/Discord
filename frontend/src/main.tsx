import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
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
import RootLayout from './layout/RootLayout.tsx'
import HomePage from './pages/HomePage.tsx'

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
        <Route path="" element={<RootLayout />}>
          <Route
            index={true}
            element={
              <ProtectedRoute>
                <HomePage />
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
      <BrowserRouter>
        <RouterComponent />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
)

export default RouterComponent
