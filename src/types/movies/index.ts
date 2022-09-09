
export interface Movie {
    _id: string,
    name: string,
    year: number,
    isInTheaters: boolean,
    genres: [MovieGenres],
    stars: [MovieActor]
    posters: [Poster]
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

export interface Poster {
    sourceId: string,
    url: string,
    deleteHash: string,
    isMain?: Boolean
}