# 📊 Financial Calculator Suite

A comprehensive collection of professional financial calculators to help users plan investments, track returns, beat inflation, and make informed financial decisions. Each calculator features interactive charts, PDF export functionality, dark mode, and shareable links.

🌐 **Live Demo**: [https://bhuvanesh-m-dev.github.io/calculator/](https://bhuvanesh-m-dev.github.io/calculator/)

---

## 🧮 Available Calculators

| Calculator | Description | Best For |
|------------|-------------|----------|
| **SIP Calculator** | Systematic Investment Plan with inflation adjustment | Monthly investments, wealth building |
| **SWP Calculator** | Systematic Withdrawal Plan for retirement income | Regular withdrawals, retirement planning |
| **CAGR Calculator** | Compound Annual Growth Rate | Investment performance tracking |
| **Inflation Calculator** | Future & present value with inflation impact | Purchasing power analysis |
| **IRR Calculator** | Internal Rate of Return | Regular periodic cash flows |
| **XIRR Calculator** | Extended Internal Rate of Return | Irregular cash flows (SIPs, MF) |

---

## 🚀 Features

### Common Features Across All Calculators

- ✅ **Interactive Charts** - Visual representation of data (Line, Bar, Pie charts)
- ✅ **PDF Export** - Download professional reports with 8-second promo overlay
- ✅ **Dark Mode** - Toggle between light and dark themes (persists via localStorage)
- ✅ **Shareable Links** - URL parameters save all inputs for easy sharing
- ✅ **WhatsApp & Telegram Sharing** - Share results directly with friends
- ✅ **Copy Link** - One-click copy of calculation URL
- ✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- ✅ **Yearly Breakdown Tables** - Detailed year-by-year analysis
- ✅ **Input Validation** - Smart validation with helpful error messages
- ✅ **Funny Messages** - Engaging random tips and quotes

### Calculator-Specific Features

#### 📈 SIP Calculator
- Monthly SIP with yearly step-up option
- Lump sum investment support
- Inflation-adjusted future value
- Total invested vs total gains analysis

#### 💸 SWP Calculator
- Monthly withdrawal with step-up
- Corpus depletion warning
- Total withdrawn vs remaining balance
- Effective yield calculation

#### 📊 CAGR Calculator
- Yearly growth simulation (monthly compounding)
- Cumulative return tracking
- Investment value progression

#### 📉 Inflation Calculator
- Future Value calculation (what money becomes)
- Present Value calculation (today's worth)
- Purchasing power loss percentage
- With/without inflation comparison

#### 💰 IRR Calculator
- Regular periodic cash flow analysis
- NPV and PV calculations
- Cash flow timeline visualization

#### 📅 XIRR Calculator
- Date-specific cash flow tracking
- Handles irregular intervals
- Perfect for mutual fund SIP tracking
- Day-count fraction calculation

---

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure & semantics |
| CSS3 | Styling, animations, responsive design |
| JavaScript (ES6+) | Logic, calculations, interactivity |
| Chart.js | Interactive charts & visualizations |
| html2pdf.js | PDF report generation |

---

## 📁 Project Structure

```
calculator/
├── index.html              # Homepage with all calculator links
├── sip/
│   ├── index.html         # SIP entry page
│   └── calculator.html    # SIP main calculator
├── swp/
│   ├── index.html         # SWP entry page
│   └── calculator.html    # SWP main calculator
├── cagr/
│   ├── index.html         # CAGR entry page
│   └── calculator.html    # CAGR main calculator
├── inflation/
│   ├── index.html         # Inflation entry page
│   └── calculator.html    # Inflation main calculator
├── irr/
│   ├── index.html         # IRR entry page
│   └── calculator.html    # IRR main calculator
└── xirr/
    ├── index.html         # XIRR entry page
    └── calculator.html    # XIRR main calculator
```

---

## 🔗 URL Parameters

Each calculator accepts URL parameters for pre-filled values and shareable links:

### SIP Calculator
```
?sip=5000&return=12&years=15&stepup=10&lumpsum=100000&inflation=6&adj_inflation=1
```

### SWP Calculator
```
?principal=5000000&withdrawal=25000&return=12&years=20&stepup=5&inflation=6&adj_inflation=1
```

### CAGR Calculator
```
?initial=100000&final=300000&years=5
```

### Inflation Calculator
```
?amount=100000&inflation=6&years=10&type=future
```

### IRR Calculator
```
?initial=-500000&cf_count=5&cf_0_year=1&cf_0_amount=100000
```

### XIRR Calculator
```
?cf_count=6&cf_0_date=2024-01-01&cf_0_amount=-500000
```

### Auto PDF Download
Add `&autoDownload=true` to automatically trigger PDF generation on page load.

---

## 🎨 Color Schemes

| Calculator | Primary Color | Gradient |
|------------|---------------|----------|
| SIP | Blue `#3b82f6` | Blue → Dark Blue |
| SWP | Orange `#f59e0b` | Orange → Red |
| CAGR | Purple `#8b5cf6` | Purple → Dark Purple |
| Inflation | Red `#ef4444` | Red → Dark Red |
| IRR | Cyan `#06b6d4` | Cyan → Teal |
| XIRR | Pink `#ec489a` | Pink → Rose |

---

## 📊 Calculation Formulas

### SIP Formula
```
FV = P × ((1 + r)^n - 1) / r × (1 + r)
where:
P = Monthly investment
r = Monthly rate of return
n = Number of months
```

### SWP Formula
```
Balance(n) = Balance(n-1) × (1 + r) - Withdrawal
```

### CAGR Formula
```
CAGR = (Final Value / Initial Investment)^(1/Years) - 1
```

### Inflation Formula
```
Future Value = Present Value × (1 + Inflation Rate)^Years
Present Value = Future Value / (1 + Inflation Rate)^Years
```

### IRR / XIRR Formula
```
NPV = Σ(CashFlow_i / (1 + r)^t_i) = 0
where t_i = time in years (IRR) or (Date_i - Date_0)/365.25 (XIRR)
```

---

## 📄 PDF Export

All calculators include PDF export functionality:

1. Click **"Download as PDF"** button
2. 8-second countdown with promo overlay
3. Automatic PDF generation with:
   - Professional header with timestamp
   - All charts converted to images
   - Complete results and tables
   - Footer with credit and promo banner

---

## 🚀 Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/bhuvanesh-m-dev/calculator.git
   cd calculator
   ```

2. **Open in browser**
   ```bash
   # Simply open any HTML file in your browser
   open index.html
   ```

3. **Live Server (recommended)**
   ```bash
   # Using VS Code Live Server or Python
   python -m http.server 8000
   ```

### Deployment

The project is deployed on **GitHub Pages**:
- Repository: `bhuvanesh-m-dev/calculator`
- Domain: `https://bhuvanesh-m-dev.github.io/calculator/`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see below:

```
MIT License

Copyright (c) 2026 - Present Bhuvanesh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions...

Full license text available at: https://opensource.org/licenses/MIT
```

---

## 🙏 Acknowledgments

- **Chart.js** - Beautiful charts and visualizations
- **html2pdf.js** - PDF generation made easy
- **GitHub Pages** - Free and reliable hosting

---

## 📞 Contact

**Developer**: Bhuvanesh  
**GitHub**: [@bhuvanesh-m-dev](https://github.com/bhuvanesh-m-dev)  
**Website**: [https://bhuvanesh-m-dev.github.io/](https://bhuvanesh-m-dev.github.io/)

---

## ⭐ Support

If you find this project useful, please:
- ⭐ Star the repository on GitHub
- 🔗 Share with friends and family
- 🐛 Report bugs via Issues

---

## 📊 Visitor Count

![Visitor Count](https://count.getloli.com/@bhuvanesh-m-dev?name=bhuvanesh-m-dev-calculator&theme=ai-1&padding=0&offset=0&align=top&scale=0.1&pixelated=1&darkmode=auto)

---

## 🔜 Upcoming Features

- [ ] EMI Calculator
- [ ] FD Calculator
- [ ] RD Calculator
- [ ] Mutual Fund Return Calculator
- [ ] Tax Calculator
- [ ] Retirement Planning Calculator
- [ ] Multi-language Support
- [ ] Export to Excel
- [ ] Save calculations to localStorage
- [ ] Comparison between multiple scenarios

---

## 📖 Documentation

For detailed documentation on each calculator:

| Calculator | Documentation Link |
|------------|-------------------|
| SIP | [SIP Documentation](wiki/SIP-Calculator.md) |
| SWP | [SWP Documentation](wiki/SWP-Calculator.md) |
| CAGR | [CAGR Documentation](wiki/CAGR-Calculator.md) |
| Inflation | [Inflation Documentation](wiki/Inflation-Calculator.md) |
| IRR | [IRR Documentation](wiki/IRR-Calculator.md) |
| XIRR | [XIRR Documentation](wiki/XIRR-Calculator.md) |

---

**Made with 💙 by Bhuvanesh** | *Smart tools for smarter financial decisions*
