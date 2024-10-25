export interface user {
    username: string,
    email: string,
    passwordHash: string,
    createdAt: Date,
    updatedAt: Date
}

export interface profile {
    owner: string,
    first_name: string,
    last_name: string,
    theme: "light" | "dark",
    phoneNumber: bigint,
    profilePhoto: string
}

