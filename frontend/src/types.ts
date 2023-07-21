export type SpringPage<T> = {
    content: T[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty: boolean;
};

export type User = {
    id:number;
    name: string;
    email: string;
    password: string;
    imgUrl: string;
    roles : Role[];
    notifications: Notification[];
    myBooks: Book[];
    wishList: Book[];
    exchangesCreatedId: number[];
    exchangesReceivedId: number[];
}

export type Role = {
    id: number;
    authority : string;
}

export type Book = {
    id: number;
    title: string;
    author: string;
    year: number;
    imgUrl: string;
    usersMyId: number[];
    usersWishId: number[];
    exchangesOfferedId: number[];
    exchangesReceivedId: number[];
}

export type Exchange = {
    id: number;
    status: string;
    creationTime: string;
    creator: User;
    receiver: User | null;
    bookOffered: Book;
    bookReceived: Book | null;
}

export type Notification = {
    id: number;
    description: string;
    moment: string;
    read: boolean;
    userId: number;
}

export type PieChartConfig = {
    labels: string[];
    series: number[];
}

export type ExchangesByStatus = {
    status: string;
    sum: number;
}
