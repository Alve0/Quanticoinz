# Micro-Task and Earning Platform

This is a MERN stack project for a Micro-Task and Earning Platform.

## Website Features

- User roles: Worker, Buyer, and Admin.
- Workers can complete tasks to earn coins.
- Buyers can post tasks and review submissions.
- Admins can manage users and tasks.
- Secure authentication with role-based access.
- Coin purchasing system for Buyers.
- Coin withdrawal system for Workers.
- Notification system for user actions.
- Responsive design for mobile, tablet, and desktop.

---

## Project To-Do List

### Phase 1: Project Setup & Core Layout

- [ ] **GitHub Setup:**
  - [ + ] Initialize client-side repository.
  - [ ] Initialize server-side repository.
  - [ ] Aim for 20+ client-side commits and 12+ server-side commits.
- [ ] **Environment Variables:**
  - [ ] Set up `.env` file for Firebase config, MongoDB URI, etc.
- [ ] **Basic Layout:**
  - [ ] Create a main layout component.
  - [ ] Implement the Navbar for unauthenticated users (Logo, Login, Register, "Join as Developer").
  - [ ] Implement the Navbar for authenticated users (Logo, Dashboard, Coin, Profile, "Join as Developer").
  - [ ] Create the Footer with logo and social media links.
- [ ] **Routing:**
  - [ ] Set up basic routing for Home, Login, Register, and Dashboard.

### Phase 2: Home Page

- [ ] **Hero Section:**
  - [ ] Implement a slider (e.g., Swiper Slider) or a background video.
- [ ] **Best Workers Section:**
  - [ ] Display the top 6 workers based on their coin balance.
- [ ] **Testimonial Section:**
  - [ ] Create a static testimonial slider.
- [ ] **Extra Sections:**
  - [ ] Design and implement at least three additional, informative sections.
- [ ] **Animations:**
  - [ ] Add animations to make the homepage engaging.

### Phase 3: User Authentication

- [ ] **Registration Page:**
  - [ ] Create the registration form (Name, Email, Photo URL, Password, Role).
  - [ ] Implement email/password validation.
  - [ ] Set default coins (10 for Worker, 50 for Buyer).
  - [ ] **Challenge:** Integrate `imgBB` for profile picture uploads.
- [ ] **Login Page:**
  - [ ] Create the login form (Email, Password).
  - [ ] Implement Google Sign-In.
  - [ ] Ensure users are redirected to the dashboard upon successful login.
- [ ] **Private Routes:**
  - [ ] Secure dashboard routes.
  - [ ] Ensure users are not logged out on page reload.

### Phase 4: Dashboard Implementation

- [ ] **General Dashboard Layout:**
  - [ ] Create a consistent layout for all dashboard pages.
- [ ] **Role-Based Authorization:**
  - [ ] **Challenge:** Implement middleware for Worker, Buyer, and Admin roles.
  - [ ] Handle unauthorized (401, 403) access gracefully.

#### Worker Dashboard

- [ ] **Worker Home:**
  - [ ] Display stats: Total Submissions, Pending Submissions, Total Earnings.
  - [ ] Show a list of approved submissions.
- [ ] **Task List:**
  - [ ] Display available tasks in a card format.
- [ ] **Task Details:**
  - [ ] Show detailed information for a selected task.
  - [ ] Implement the submission form.
- [ ] **My Submissions:**
  - [ ] Show all submissions by the worker in a table.
  - [ ] **Challenge:** Implement pagination for this table.
- [ ] **Withdrawals:**
  - [ ] Display current coin and potential withdrawal amount in dollars.
  - [ ] Create the withdrawal form (20 coins = 1 dollar).

#### Buyer Dashboard

- [ ] **Buyer Home:**
  - [ ] Display stats: Total Tasks, Pending Tasks, Total Payments.
  - [ ] Show tasks that need review with "Approve" and "Reject" buttons.
- [ ] **Add New Tasks:**
  - [ ] Create the form for adding new tasks.
  - [ ] **Challenge:** Integrate `imgBB` for task image uploads.
  - [ ] Implement logic to check for sufficient coins before posting.
- [ ] **My Tasks:**
  - [ ] Display all tasks added by the buyer with "Update" and "Delete" options.
- [ ] **Purchase Coin:**
  - [ ] Create a page with different coin packages.
  - [ ] **Challenge:** Integrate Stripe for payments.
- [ ] **Payment History:**
  - [ ] Show a table of all payments made by the buyer.

#### Admin Dashboard

- [ ] **Admin Home:**
  - [ ] Display platform stats: Total Users, Total Coins, Total Payments.
  - [ ] Show pending withdrawal requests.
- [ ] **Manage Users:**
  - [ ] Display all users with options to "Remove" or "Update Role".
- [ ] **Manage Tasks:**
  - [ ] Display all tasks with an option to "Delete".

### Phase 5: Advanced Features & Finalization

- [ ] **Notification System:**
  - [ ] **Challenge:** Implement a real-time notification system for events like task approval/rejection.
- [ ] **Responsiveness:**
  - [ ] Ensure the entire application, including the dashboard, is responsive on all devices.
- [ ] **Final Review:**
  - [ ] Remove all "Lorem Ipsum" text.
  - [ ] Test all features thoroughly.
- [ ] **Deployment:**
  - [ ] Deploy the client-side (e.g., Firebase, Netlify).
  - [ ] Deploy the server-side.
- [ ] **Submission:**
  - [ ] Update this `README.md` with the live site URL, admin credentials, and repository links.
