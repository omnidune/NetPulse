# NetPulse - Network Latency & Quality Diagnostics

![NetPulse Preview](https://img.shields.io/badge/NetPulse-Diagnostic_Lab-00f2fe?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech-HTML5_|_CSS3_|_JS-7f00ff?style=for-the-badge)

NetPulse is an advanced, interactive web application designed to measure real-time network stability, latency, jitter, and packet loss without relying on heavy external dependencies. It operates entirely on the client-side using pure HTML, CSS, and JavaScript, leveraging the native Fetch API for accurate, no-CORS network polling.

## ✨ Features

- **Real-Time Latency Graphing**: Dynamic HTML5 Canvas rendering of your ping data in real-time, providing immediate visual feedback on connection stability.
- **Deep Metrics Analysis**: Automatically calculates Average Ping, Jitter (variance in latency), and Packet Loss percentages.
- **Global CDN Edge Comparison**: Quickly test and compare your routing latency against major edge networks (AWS, Cloudflare, Fastly, Google DNS).
- **Internationalization (i18n)**: Fully translated into 12 distinct languages (English, Bengali, German, Gujarati, Hindi, Japanese, Malayalam, Marathi, Punjabi, Spanish, Tamil, Telugu) with dynamic, on-the-fly switching.
- **Advanced UI/UX**:
  - Sleek, modern "Glassmorphism" aesthetic.
  - Seamless Dark and Light themes.
  - Fully responsive grid layout that adapts flawlessly to desktop, tablet, and mobile screens.

## 🚀 Getting Started

Since NetPulse is a pure static web application, there is no build step or package manager required. 

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/netpulse.git
   ```
2. **Open the application:**
   Simply open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).

## 🛠️ Technical Architecture

- **`index.html`**: The semantic layout, utilizing CSS Grid and Flexbox for responsive structural integrity. Contains all meta-data and schemas.
- **`style.css`**: The core styling engine. Uses CSS variables for instant theme switching and scalable design tokens.
- **`app.js`**: The main application logic handling the network polling loops, wake-lock APIs, Canvas rendering, and UI state management.
- **`translations.js`**: A lightweight, dictionary-based localization file powering the 12-language support matrix.

## 🔍 How it Works

NetPulse measures connection quality by performing high-frequency, lightweight HTTP `HEAD` or `GET` requests (via `fetch` with `no-cors` mode) to highly available, geo-distributed edge endpoints. It measures the RTT (Round Trip Time) of the TCP handshake and TLS negotiation to gauge raw network responsiveness from your browser.

## 🛡️ Privacy

All tests run locally in your browser. No telemetry, IP addresses, or diagnostic logs are transmitted to or stored on any external servers.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
