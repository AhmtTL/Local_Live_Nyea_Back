export function useFormatters() {
    const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
        if (!amount && amount !== 0) return '-';
        
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(parseFloat(amount));
    };

    const formatDate = (date, options = {}) => {
        if (!date) return '-';
        
        const defaultOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };
        
        return new Date(date).toLocaleDateString('en-US', { 
            ...defaultOptions, 
            ...options 
        });
    };

    const formatDateTime = (date, options = {}) => {
        if (!date) return '-';
        
        const defaultOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        
        return new Date(date).toLocaleDateString('en-US', { 
            ...defaultOptions, 
            ...options 
        });
    };

    const formatNumber = (number, options = {}) => {
        if (!number && number !== 0) return '-';
        
        return new Intl.NumberFormat('en-US', options).format(number);
    };

    const formatPercentage = (value, decimals = 1) => {
        if (!value && value !== 0) return '-';
        
        return `${(parseFloat(value) * 100).toFixed(decimals)}%`;
    };

    const truncateText = (text, length = 50) => {
        if (!text) return '-';
        return text.length > length ? `${text.substring(0, length)}...` : text;
    };

    return {
        formatCurrency,
        formatDate,
        formatDateTime,
        formatNumber,
        formatPercentage,
        truncateText,
    };
} 