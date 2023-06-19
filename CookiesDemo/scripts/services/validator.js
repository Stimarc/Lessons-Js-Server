export class Validator {

    static validateFields(key,val,exp) {
        try {
            if (key === '') {
                throw new Error('Ви не заповнили поле Ключ!');
            }
            if (val === '') {
                throw new Error('Ви не заповнили поле Значення!');
            }
            if (exp === '') {
                throw new Error('Ви не заповнили поле Термін!');
            }
            return true;
        } catch (e) {
             alert(e.message);
             return false;
        }
    }

}