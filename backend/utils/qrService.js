const QRCode = require('qrcode');
const crypto = require('crypto');

class QRService {
    static async generateQR(ticketData) {
        const uniqueString = crypto.randomBytes(32).toString('hex');
        const data = {
            ticketData,
            uniqueString,
            timestamp: Date.now()
        };

        const qrString = JSON.stringify(data);
        const qrImage = await QRCode.toDataURL(qrString);

        return {
            qrImage,
            uniqueString
        };
    }

    static async verifyQR(qrData, storedData) {
        try {
            const parsedData = JSON.parse(qrData);
            return parsedData.uniqueString === storedData.uniqueString;
        } catch (error) {
            return false;
        }
    }
}

module.exports = QRService;
