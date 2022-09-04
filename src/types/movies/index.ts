
export interface Movie {
    _id: string,
    name: string,
    year: number,
    isInTheaters: boolean,
    genres: [MovieGenres],
    stars: [MovieActor]
    posterUrl: string
}

export enum MovieGenres {
    THRILLER,
    ACTION,
    FANTASY,
    DRAMA
}

export interface MovieActor {
    _id: string,
    name: string
}