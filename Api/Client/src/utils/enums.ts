export enum ERole {
    TENANT_ROLE = 0,
    MANAGER_ROLE = 1,
    OWNER_ROLE = 2,
}

export enum EGender {
    'Male' = 0,
    'Female' = 1,
    'Unknown' = 2,
}

export enum ECommitmentStatus {
    Expired = 'Expired',
    Approved = 'Approved',
    Pending = 'Pending',
    Active = 'Active',
}

export enum ERoomStatus {
    Available = 'Available',
    Rented = 'Rented',
}

export enum EInvoiceStatus {
    Pending = 'Pending',
    Unpaid = 'Unpaid',
    Paid = 'Paid',
    Overdue = 'Overdue',
}
