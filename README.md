# EasyBeema - Digital Insurance Marketplace

EasyBeema is a frontend web application built with React.js. It is a trusted digital insurance marketplace that makes it simple for users to compare, choose, and buy the right insurance coverage anytime, anywhere.

---

## Tech Stack

- **React.js** - UI framework
- **React Router DOM** - client-side routing
- **Tailwind CSS** - utility-first styling
- **class-variance-authority** + **tailwind-merge** - component variant management
- **react-icons** - icon library

---

## Project Structure

```
src/
├── App.jsx                        # Root component with all routes
├── main.jsx                       # Entry point
├── constants/
│   └── insurance.js               # Shared constants (product titles, nav links, footer links)
├── layouts/
│   └── MainLayout.jsx             # Wraps all pages, conditionally renders Header/Footer
├── components/
│   ├── common/
│   │   ├── Header.jsx             # Site-wide navigation bar
│   │   ├── Footer.jsx             # Site-wide footer
│   │   └── Container.jsx          # Max-width wrapper for consistent page layout
│   ├── ui/
│   │   ├── Button.jsx             # Reusable button
│   │   ├── EditText.jsx           # Reusable text input
│   │   └── TextArea.jsx           # Reusable textarea
│   └── OtpPopup.jsx               # 2-step OTP verification modal
├── pages/
│   ├── Home/                      # Landing page (HeroSection, ProductGrid, ProcessSection, etc.)
│   ├── authentication/
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── Policy/                    # Insurance purchase flow
│   │   ├── PolicyDetails.jsx      # User fills personal details + survey
│   │   ├── Plans.jsx              # Compare available plans
│   │   ├── Payments.jsx           # Select add-ons, enter details
│   │   ├── ConfirmationPanel.jsx  # Review before payment
│   │   ├── PaymentPortal.jsx      # Choose payment method
│   │   └── Paymentcompleted.jsx   # Success screen
│   ├── Insurance/
│   │   ├── RenewPolicy.jsx        # Policy renewal flow
│   │   ├── Claims.jsx             # File a claim
│   │   └── ComparePlans.jsx       # Side-by-side plan comparison
│   ├── Dashboard/
│   │   └── index.jsx              # User dashboard — active policies, profile
│   └── Static/
│       ├── AboutUs.jsx
│       ├── TermsAndPrivacy.jsx
│       └── NotFound.jsx         
└── styles/
    ├── index.css
    └── tailwind.css
```

---

## Getting Started

**Prerequisites:** Node.js v18+

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Key Design Decisions

- **Shared constants** - `src/constants/insurance.js` holds product titles, nav links, and footer links in one place to avoid duplication across files.
- **MainLayout pattern** - Header and Footer are conditionally hidden on the policy purchase flow pages (which have their own internal headers), keeping those pages focused.
- **State passed via React Router** - user data (name, DOB, gender, selected plan, billing cycle) is passed between pages using `navigate(route, { state: {...} })` - no external state management library needed for this scale.
- **Component variants** - `Button.jsx` uses `class-variance-authority` to handle `primary`, `secondary`, and `ghost` variants cleanly without inline styles.

---

## Frontend Only - No Backend 
 
This is intentionally a frontend-only project. All data (insurance plans, user profiles, payment details) is currently hardcoded as demo data directly in the components.
 
---

## Author

**[Iksha Malhotra](https://github.com/IkshaMalhotra)** - Frontend Development
