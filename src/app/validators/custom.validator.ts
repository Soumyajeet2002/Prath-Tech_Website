import { AbstractControl, FormControl, FormGroup } from "@angular/forms";

export function emailValidator(control: FormControl): { [key: string]: any } | null {
    const pattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidEmail: true };
    }
    return null;
}

export function nameValidator(control: FormControl): { [key: string]: any } | null {
    const pattern = /^[A-Za-z0-9\-\/() ]{1,150}$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidName: true };
    }
    return null;
}

export function alphabetValidator(control: FormControl): { [key: string]: any } | null {
    const pattern = /^[A-Za-z ]+$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidName: true };
    }
    return null;
}

export function addressValidator(control: FormControl): { [key: string]: any } | null {
    const pattern = /^[a-zA-Z0-9 ,.-/()&:]*$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidAddress: true };
    }
    return null;
}

export function specialNameValidator(control: FormControl): { [key: string]: any } | null {
    const pattern = /^[a-zA-Z ,.&@#]*$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidChar: true };
    }
    return null;
}

export function passwordValidator(control: FormControl): { [key: string]: any } | null {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidPassword: true };
    }
    return null;
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        const password = group.controls[passwordKey];
        const passwordConfirmation = group.controls[passwordConfirmationKey];
        if ((passwordConfirmation.value !== '') && (password.value !== passwordConfirmation.value)) {
            return passwordConfirmation.setErrors({ mismatchedPasswords: true });
        }
    };
}

export function fileValidator(control: AbstractControl) {
    const allowedMimeTypes: string[] = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSizeMB = 2;
    const file: File = control.value;
    if (file) {
        // Check if the file size exceeds the limit
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > maxSizeMB) {
            return { maxSize: true }; // Return error if size exceeds limit
        }

        // Check if the MIME type is allowed
        const mimeType = file.type;
        if (!allowedMimeTypes.includes(mimeType)) {
            return { invalidMimeType: true }; // Return error if MIME type is invalid
        }
    }
    return null;
}

export function mobileNumberValidator(control: FormControl): { [key: string]: any } | null {
    const pattern = /^[6-9]{1}[0-9]{9}$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidMobileNumber: true };
    }
    return null;
}

export function decimalOnly(control: FormControl): { [key: string]: any } | null {
    const pattern = /^\d*\.\d+$/;
    if (control.value && !pattern.test(control.value)) {
        return { invalidDecimal: true };
    }
    return null;
}

export function noWhiteSpaceValidator(control: AbstractControl) {
    const value = control.value || '';
    if (!value.trim()) {
        return value === '' ? { required: true } : { whitespace: true };
    }
    return null;
}
