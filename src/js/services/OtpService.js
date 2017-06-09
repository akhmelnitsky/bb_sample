import React from 'react';

export default class OtpService {
    validate(formData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (formData['otp'] === '1234') {
                    resolve()
                } else {
                    reject();
                }
            }, 500);
        });
    }
}