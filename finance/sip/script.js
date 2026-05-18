document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const monthlyInvestmentInput = document.getElementById('monthlyInvestment');
    const expectedReturnInput = document.getElementById('expectedReturn');
    const timePeriodInput = document.getElementById('timePeriod');
    const adjustInflationCheckbox = document.getElementById('adjustInflation');
    const inflationRateGroup = document.getElementById('inflationRateGroup');
    const inflationRateInput = document.getElementById('inflationRate');
    
    const investedAmountEl = document.getElementById('investedAmount');
    const estReturnsEl = document.getElementById('estReturns');
    const totalValueEl = document.getElementById('totalValue');
    const adjustedValueGroup = document.getElementById('adjustedValueGroup');
    const adjustedValueEl = document.getElementById('adjustedValue');
    
    const themeToggleBtn = document.getElementById('themeToggle');
    const shareWhatsappBtn = document.getElementById('shareWhatsapp');
    const shareTelegramBtn = document.getElementById('shareTelegram');
    const copyLinkBtn = document.getElementById('copyLink');

    // Theme Management
    const initTheme = () => {
        const isDark = localStorage.getItem('darkMode') === 'true';
        if (isDark) {
            document.body.classList.add('dark-mode');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    };

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        themeToggleBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // Formatting currency
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    // Calculation Logic
    const calculateSIP = () => {
        const P = parseFloat(monthlyInvestmentInput.value) || 0;
        const r = parseFloat(expectedReturnInput.value) || 0;
        const years = parseFloat(timePeriodInput.value) || 0;
        const isInflationAdjusted = adjustInflationCheckbox.checked;
        const inflationRate = parseFloat(inflationRateInput.value) || 0;

        const i = r / 12 / 100; // monthly rate of return
        const n = years * 12; // total months

        // SIP Formula: M = P * ({[1 + i]^n - 1} / i) * (1 + i)
        let totalValue = 0;
        if (i === 0) {
            totalValue = P * n;
        } else {
            totalValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        }

        const investedAmount = P * n;
        const estReturns = totalValue - investedAmount;

        // Display basic results
        investedAmountEl.textContent = formatCurrency(investedAmount);
        estReturnsEl.textContent = formatCurrency(estReturns);
        totalValueEl.textContent = formatCurrency(totalValue);

        // Inflation Adjustment
        if (isInflationAdjusted) {
            inflationRateGroup.classList.remove('hidden');
            adjustedValueGroup.classList.remove('hidden');
            
            // PV = FV / (1 + r)^n where r is annual inflation rate
            const adjustedValue = totalValue / Math.pow(1 + (inflationRate / 100), years);
            adjustedValueEl.textContent = formatCurrency(adjustedValue);
        } else {
            inflationRateGroup.classList.add('hidden');
            adjustedValueGroup.classList.add('hidden');
        }

        updateURL();
    };

    // Stateless URL Management
    const updateURL = () => {
        const params = new URLSearchParams();
        params.set('p', monthlyInvestmentInput.value);
        params.set('r', expectedReturnInput.value);
        params.set('t', timePeriodInput.value);
        
        if (adjustInflationCheckbox.checked) {
            params.set('adj', 'true');
            params.set('inf', inflationRateInput.value);
        }

        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, '', newUrl);
    };

    const loadFromURL = () => {
        const params = new URLSearchParams(window.location.search);
        
        if (params.has('p')) monthlyInvestmentInput.value = params.get('p');
        if (params.has('r')) expectedReturnInput.value = params.get('r');
        if (params.has('t')) timePeriodInput.value = params.get('t');
        
        if (params.get('adj') === 'true') {
            adjustInflationCheckbox.checked = true;
            if (params.has('inf')) inflationRateInput.value = params.get('inf');
        }
    };

    // Share Functionality
    const getShareMessage = () => {
        const P = monthlyInvestmentInput.value;
        const r = expectedReturnInput.value;
        const t = timePeriodInput.value;
        return `Check out my SIP Calculation: ₹${P}/month for ${t} years at ${r}% p.a.`;
    };

    shareWhatsappBtn.addEventListener('click', () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(getShareMessage() + '\n\n');
        window.open(`https://api.whatsapp.com/send?text=${text}${url}`, '_blank');
    });

    shareTelegramBtn.addEventListener('click', () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(getShareMessage());
        window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
    });

    copyLinkBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            
            // Visual feedback
            const originalIcon = copyLinkBtn.innerHTML;
            copyLinkBtn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                copyLinkBtn.innerHTML = originalIcon;
            }, 2000);
        } catch (err) {
            alert('Failed to copy link');
        }
    });

    // Event Listeners
    [monthlyInvestmentInput, expectedReturnInput, timePeriodInput, inflationRateInput].forEach(input => {
        input.addEventListener('input', calculateSIP);
    });

    adjustInflationCheckbox.addEventListener('change', calculateSIP);

    // Initialization
    initTheme();
    loadFromURL();
    calculateSIP();
});