# 📄 Resume Maker

A modern, professional resume builder that lets you create **ATS-friendly resumes** in minutes. Built with React and designed for simplicity.

![Resume Maker](frontend/public/favicon.png)

## ✨ Features

- **Live Preview** — See your resume update in real-time as you type
- **PDF Export** — Download your resume as a high-quality PDF with one click
- **Bullet Point Descriptions** — Project descriptions auto-format into clean bullet points
- **Tech Stack Highlighting** — Technologies are displayed boldly for easy scanning
- **Responsive Design** — Works seamlessly on desktop and tablet
- **Local Storage** — Your data is saved automatically in the browser
- **Firebase Authentication** — Secure login with Google sign-in

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **Vite** | Build tool & dev server |
| **Tailwind CSS 4** | Styling |
| **Firebase** | Authentication |
| **html2pdf.js** | PDF generation |
| **Lucide React** | Icons |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Manoharreddi2/Resume-Maker.git
   cd Resume-Maker
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

   ```

3. **Run the app**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser 🎉

## 📁 Project Structure

```
Resume-Maker/
├── frontend/
│   ├── public/
│   │   └── favicon.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth.jsx          # Authentication component
│   │   │   ├── ResumeForm.jsx    # Form to input resume data
│   │   │   └── ResumePreview.jsx # Live resume preview & PDF export
│   │   ├── App.jsx               # Main app component
│   │   ├── firebase.js           # Firebase configuration
│   │   ├── index.css             # Global styles
│   │   └── main.jsx              # Entry point
│   ├── index.html
│   └── package.json
└── README.md
```

## 📝 Resume Sections

- **Personal Info** — Name, email, phone, LinkedIn, GitHub, portfolio
- **Education** — Degree, institution, year, CGPA
- **Skills** — Displayed as bold tags
- **Projects** — Title, bullet-point descriptions, tech stack, GitHub & live links
- **Experience** — Company, role, duration, description
- **Certifications** — Name, issuer, link

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ by [Manohar Reddy](https://github.com/Manoharreddi2)
