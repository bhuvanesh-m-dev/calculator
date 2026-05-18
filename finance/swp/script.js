// ===== State Management (Stateless - URL based) =====

class SWPCalculator {
    constructor() {
        this.form = document.getElementById('swpForm');
        this.resultsBox = document.getElementById('results');
        this.themeToggle = document.getElementById('themeToggle');
        this.toast = document.getElementById('toast');

        this.init();
    }

    init() {
        this.loadTheme();
        this.loadFromURL();
        this.attachEventListeners();
        this.updateThemeIcon();
    }

    // ===== Theme Management =====
    loadTheme() {
        const savedTheme = localStorage.getItem('swp-theme') || 'light';
        this.setTheme(savedTheme);
    }

    setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark-mode');
            localStorage.setItem('swp-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark-mode');
            localStorage.setItem('swp-theme', 'light');
        }
        this.updateThemeIcon();
    }

    toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark-mode');
        this.setTheme(isDark ? 'light' : 'dark');
    }

    updateThemeIcon() {
        const isDark = document.documentElement.classList.contains('dark-mode');
        const icon = this.themeToggle.querySelector('.theme-icon');
        icon.textContent = isDark ? '☀️' : '🌙';
    }

    // ===== URL State Management =====
    loadFromURL() {
        const params = new URLSearchParams(window.location.search);
        
        if (params.has('principal')) {
            document.getElementById('principalAmount').value = params.get('principal');
            document.getElementById('withdrawalAmount').value = params.get('withdrawal') || '';
            document.getElementById('annualReturn').value = params.get('return') || '';
            document.getElementById('years').value = params.get('years') || '';
            
            // Auto-calculate if all params present
            if (params.has('principal') && params.has('withdrawal') && params.has('return') && params.has('years')) {
                this.calculate();
            }
        }
    }

    saveToURL(principal, withdrawal, annualReturn, years) {
        const params = new URLSearchParams({
            principal: principal,
            withdrawal: withdrawal,
            return: annualReturn,
            years: years
        });
        window.history.replaceState({}, '', `?${params.toString()}`);
    }

    // ===== Event Listeners =====
    attachEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculate();
        });

        this.form.addEventListener('reset', () => {
            this.resultsBox.classList.add('hidden');
            window.history.replaceState({}, '', window.location.pathname);
        });

        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        document.getElementById('shareWhatsApp').addEventListener('click', () => {
            this.shareOnWhatsApp();
        });

        document.getElementById('shareTelegram').addEventListener('click', () => {
            this.shareOnTelegram();
        });

        document.getElementById('copyLink').addEventListener('click', () => {
            this.copyLink();
        });
    }

    // ===== SWP Calculation Logic =====
    calculate() {
        const principal = parseFloat(document.getElementById('principalAmount').value);
        const withdrawal = parseFloat(document.getElementById('withdrawalAmount').value);
        const annualReturn = parseFloat(document.getElementById('annualReturn').value);
        const years = parseInt(document.getElementById('years').value);

        // Validation
        if (!this.validate(principal, withdrawal, annualReturn, years)) {
            return;
        }

        // Save to URL
        this.saveToURL(principal, withdrawal, annualReturn, years);

        // Calculate
        const monthlyReturn = annualReturn / 12 / 100;
        const months = years * 12;

        let balance = principal;
        let totalWithdrawal = 0;
        let totalInterest = 0;
        const tableData = [];

        for (let month = 1; month <= months; month++) {
            const openingBalance = balance;
            const interest = openingBalance * monthlyReturn;
            balance = balance + interest - withdrawal;
            totalWithdrawal += withdrawal;
            totalInterest += interest;

            if (month % 1 === 0 || month === months) { // Show monthly for table
                tableData.push({
                    month: month,
                    opening: openingBalance,
                    interest: interest,
                    withdrawal: withdrawal,
                    closing: Math.max(balance, 0)
                });
            }

            // Stop if balance goes negative
            if (balance < withdrawal) {
                balance = 0;
                break;
            }
        }

        // Display Results
        this.displayResults(principal, totalWithdrawal, balance, totalInterest, tableData);
        this.resultsBox.classList.remove('hidden');
    }

    validate(principal, withdrawal, annualReturn, years) {
        if (principal <= 0) {
            this.showToast('❌ Principal amount must be greater than 0');
            return false;
        }
        if (withdrawal <= 0) {
            this.showToast('❌ Monthly withdrawal must be greater than 0');
            return false;
        }
        if (annualReturn < 0 || annualReturn > 100) {
            this.showToast('❌ Annual return must be between 0 and 100');
            return false;
        }
        if (years <= 0) {
            this.showToast('❌ Period must be greater than 0');
            return false;
        }
        return true;
    }

    displayResults(principal, totalWithdrawal, finalBalance, totalInterest, tableData) {
        // Summary Cards
        document.getElementById('totalWithdrawal').textContent = this.formatCurrency(totalWithdrawal);
        document.getElementById('finalBalance').textContent = this.formatCurrency(finalBalance);
        document.getElementById('interestEarned').textContent = this.formatCurrency(totalInterest);
        
        const months = tableData.length;
        const monthlyAvgReturn = months > 0 ? totalInterest / months : 0;
        document.getElementById('monthlyReturn').textContent = this.formatCurrency(monthlyAvgReturn);

        // Table
        this.populateTable(tableData);
    }

    populateTable(tableData) {
        const tbody = document.getElementById('tableBody');
        tbody.innerHTML = '';

        tableData.forEach((row) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>Month ${row.month}</td>
                <td>${this.formatCurrency(row.opening)}</td>
                <td>${this.formatCurrency(row.interest)}</td>
                <td>${this.formatCurrency(row.withdrawal)}</td>
                <td>${this.formatCurrency(row.closing)}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    // ===== Utility Functions =====
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(Math.max(amount, 0));
    }

    formatCurrencyShort(amount) {
        if (amount >= 10000000) {
            return '₹' + (amount / 10000000).toFixed(1) + 'Cr';
        } else if (amount >= 100000) {
            return '₹' + (amount / 100000).toFixed(1) + 'L';
        } else if (amount >= 1000) {
            return '₹' + (amount / 1000).toFixed(1) + 'K';
        }
        return '₹' + amount.toFixed(0);
    }

    showToast(message) {
        this.toast.textContent = message;
        this.toast.classList.add('show');
        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 3000);
    }

    getCurrentURL() {
        return window.location.href;
    }

    // ===== Share Functions =====
    getShareMessage() {
        const principal = document.getElementById('principalAmount').value;
        const withdrawal = document.getElementById('withdrawalAmount').value;
        const annualReturn = document.getElementById('annualReturn').value;
        const years = document.getElementById('years').value;

        const totalWithdrawal = document.getElementById('totalWithdrawal').textContent;
        const finalBalance = document.getElementById('finalBalance').textContent;

        const message = `📊 SWP Calculator Results\n\n` +
            `Principal: ${this.formatCurrency(principal)}\n` +
            `Monthly Withdrawal: ${this.formatCurrency(withdrawal)}\n` +
            `Annual Return: ${annualReturn}%\n` +
            `Period: ${years} years\n\n` +
            `Total Withdrawal: ${totalWithdrawal}\n` +
            `Final Balance: ${finalBalance}\n\n` +
            `🔗 Check the calculation: `;

        return message;
    }

    shareOnWhatsApp() {
        const message = this.getShareMessage();
        const url = this.getCurrentURL();
        const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message + url)}`;
        window.open(whatsappURL, '_blank');
    }

    shareOnTelegram() {
        const message = this.getShareMessage();
        const url = this.getCurrentURL();
        const telegramURL = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
        window.open(telegramURL, '_blank');
    }

    copyLink() {
        const url = this.getCurrentURL();
        navigator.clipboard.writeText(url).then(() => {
            this.showToast('✅ Link copied to clipboard!');
        }).catch(() => {
            this.showToast('❌ Failed to copy link');
        });
    }
}

// ===== Initialize on DOM Load =====
document.addEventListener('DOMContentLoaded', () => {
    new SWPCalculator();
});
