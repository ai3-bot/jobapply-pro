const thaiUnits = ['', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];

export const numberToThai = (num) => {
    if (!num || num === '' || num === 0) return '';
    
    const n = parseInt(num);
    if (isNaN(n) || n <= 0) return '';

    let result = '';
    let billion = Math.floor(n / 1000000000);
    let million = Math.floor((n % 1000000000) / 1000000);
    let thousand = Math.floor((n % 1000000) / 1000);
    let hundred = Math.floor((n % 1000) / 100);
    let ten = Math.floor((n % 100) / 10);
    let one = n % 10;

    if (billion > 0) {
        result += numberToThai(billion) + 'พันล้าน';
    }
    if (million > 0) {
        result += numberToThai(million) + 'ล้าน';
    }
    if (thousand > 0) {
        result += numberToThai(thousand) + 'พัน';
    }
    if (hundred > 0) {
        result += thaiUnits[hundred] + 'ร้อย';
    }
    if (ten > 0) {
        if (ten === 1) {
            result += 'สิบ';
        } else {
            result += thaiUnits[ten] + 'สิบ';
        }
    }
    if (one > 0) {
        if (one === 1 && ten > 0) {
            result += 'เอ็ด';
        } else {
            result += thaiUnits[one];
        }
    }

    return result + 'บาทถ้วน';
};