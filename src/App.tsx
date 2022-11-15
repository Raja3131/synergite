import React, { useContext, useEffect } from 'react'
import Login from './pages/login'
import ForgotPassword from './pages/forgot-password'
import ConfirmPassword from './pages/confirm-password'
import ServerError from './pages/server-error'
import NotFound from './pages/not-found'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashBoard from './pages/dashboard'
import Client from './pages/client'
import Vendor from './pages/vendor'
import ClientDetails from './pages/client/client-details'
import VendorDetails from './pages/vendor/vendor-details'
import Employee from './pages/employee'
import EmployeeDetails from './pages/employee/employee-details'
import SubmissionMain from './pages/client/client-details/jobs/submissions'
import { Loader } from '@mantine/core'
import ProtectedRoute from './components/routes/protected-route'
import PublicRoute from './components/routes/public-route'
import ForgotPasswordSuccess from './pages/forgot-password/forgotPasswordSuccess'
import OnboardingList from './pages/onboarding/components/onboarding-list'
import { AdminActivity } from './pages/admin/activity'
import AdminActivityDetails from './pages/admin/activity-details'
import { useAuth } from './store/auth.store'
import Onboarding from './pages/onboarding'
import Activity from './pages/activity'
import ActivityDetails from './pages/activity/activity-details'
import Candidate from './pages/candidate'
import Department from './pages/department'
import CandidateDetails from './pages/candidate/candidate-details'
import Roles from './pages/roles'
import DepartmentDetails from './pages/department/department-details'
import RolesDetails from './pages/roles/roles-details'
import JobList from './pages/job/job-list'
import CreateJobForm from './pages/job/create-job-form'
import Timesheets from './pages/timesheets/timesheets'
const LazyAppShallMain = React.lazy(() => import('./components/layout'))

function App() {
  const isAuth = useAuth((state) => state.isAuth)

  return (
    <BrowserRouter>
      <React.Suspense fallback={<Loader variant="dots" />}>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute isAuth={isAuth}>
                <Login />
              </PublicRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/confirm-password" element={<ConfirmPassword />} />
          <Route path="/server-error" element={<ServerError />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route
            path="/forgotPasswordSuccess"
            element={<ForgotPasswordSuccess />}
          />

          <Route element={<LazyAppShallMain />}>
            {/* Protected Routes */}
            {/* <Route element={<ProtectedRoute isAuth={isAuth} />}> */}
            <Route
              path="/"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <DashBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <DashBoard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/onboarding-list"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <OnboardingList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/job"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <JobList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/job/add"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <CreateJobForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="/onboarding"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <Onboarding />
                </ProtectedRoute>
              }
            />
            <Route
              path="/timesheets"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <Timesheets />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/admin-activity"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <AdminActivity />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-activity/:activityId"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <AdminActivityDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/client"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <Client />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vendor"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <Vendor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <Employee />
                </ProtectedRoute>
              }
            />
            <Route
              path="/candidate"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <Candidate />
                </ProtectedRoute>
              }
            />
            <Route
              path="/client-details/:clientId"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <ClientDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path={'/vendor-details/:vendorId'}
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <VendorDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee-details/:employeeId"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <EmployeeDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/candidate-details/:candidateId"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <CandidateDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/submissions/:jobId"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <SubmissionMain />
                </ProtectedRoute>
              }
            />
            <Route
              path="/activity-details/:activityId"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <ActivityDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/department-details/:departmentId"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <DepartmentDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/roles-details/:rolesId"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <RolesDetails />
                </ProtectedRoute>
              }
            />
            <Route path="/activity" element={<Activity />} />
            <Route path="/department" element={<Department />} />
            <Route path="/roles" element={<Roles />} />
            {/* </Route> */}
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App
