export interface User {
    id?: string;
    first_name: string;
    second_name: string;
    email: string;
    avatar: string;
}

export interface UserListProps {
    isLoading: boolean;
    isError: boolean;
    data: User[] | [];
    handleDeleteUser: (id: string) => void;
    handleSaveUser: (user?: User) => void;
}
