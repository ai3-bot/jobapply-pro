const thaiUnits = ['', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];

const convertToThai = (num) => {
    if (num === 0) return '';
    
    let result = '';
    let billion = Math.floor(num / 1000000000);
    let million = Math.floor((num % 1000000000) / 1000000);
    let thousand = Math.floor((num % 1000000) / 1000);
    let hundred = Math.floor((num % 1000) / 100);
    let ten = Math.floor((num % 100) / 10);
    let one = num % 10;

    if (billion > 0) {
        result += convertToThai(billion) + 'พันล้าน';
    }
    if (million > 0) {
        result += convertToThai(million) + 'ล้าน';
    }
    if (thousand > 0) {
        result += convertToThai(thousand) + 'พัน';
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

    return result;
};

export const numberToThai = (num) => {
    if (!num || num === '' || num === 0) return '';
    
    const n = parseInt(num);
    if (isNaN(n) || n <= 0) return '';

    return convertToThai(n) + 'บาทถ้วน';
};