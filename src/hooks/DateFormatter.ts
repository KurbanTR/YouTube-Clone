const DateFormatter = (dateString: string|number) => {
    const formatDate = (date: Date) => {
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
        const diffMonths = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        const diffDays = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

        if (diffYears > 0) {
            return `${diffYears} г. назад`;
        } else if (diffMonths > 0) {
            return `${diffMonths} мес. назад`;
        } else if (diffDays > 0) {
            return `${diffDays} дн. назад`;
        } else if (diffHours > 0) {
            return `${diffHours} ч. назад`;
        } else if (diffMinutes > 0) {
            return `${diffMinutes} мин. назад`;
        } else {
            return 'Только что';
        }
    };

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }
    return formatDate(date);
};

export default DateFormatter;