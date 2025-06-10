export interface Employee {
    firstName: string,
    lastName: string,
    employeeID: string,
    dateOfBirth: string,
    uploadFile: string,
    email: string,
    phone: number,
    address: string,
    city: string,
    state: string,
    pinCode: string,
    position: string,
    department: string,
    hireDate: string,
    salary: string,
    employmentStatus: string,
    employmentType: string,
    contactName: string,
    contactPhone: string,
    alternatePhone: string,
    emergencyContactRelationship: string
}

export interface SignUp {
    firstName: string;
    lastName: string;
    email: string
    mobileNumber: number;
    password: string
    reenterPassword: string;
}

export interface Login {
    email: string;
    password: string;
}