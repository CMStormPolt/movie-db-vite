import { useEffect, useRef } from 'react'
import { Input, Flex, Box, FormLabel, FormControl,
     FormHelperText, Button, Tag, Checkbox, Text,
     Spinner, useToast, Image, IconButton  
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";
import { useMutation, gql } from '@apollo/client'
import { useLocation } from "wouter";
import {
  useMutation as rqUseMutation
} from "@tanstack/react-query";

import { Page } from 'components'
import { MovieGenres, Poster } from 'types'
import { getValuesFromEnumAsArray } from 'utils'
import { imgur } from 'api'

const createSchema = z.object({
    name: z.string()
        .min(1, "name of the movie is required")
        .max(40, "the name is too long"),
    year: z.number({invalid_type_error: "year of the movie is required"})
        .positive("not a valid year")
        .max(new Date().getFullYear() + 10, "the year is too far into the future")
        .min(1895, "not a valid year, movies were not invented yet"),
    genres: z.set(z.number()),
    isInTheaters: z.boolean(),
    posters: z.array(z.object({
        sourceId: z.string(),
        url: z.string(),
        deleteHash: z.string(),
        isMain: z.boolean().optional()
    }))
})

interface CreateFormState {
    name: string, 
    year: null | number,
    genres: Set<MovieGenres>,
    isInTheaters: boolean,
    posters: [Poster]
}

const movieGenresList = getValuesFromEnumAsArray(MovieGenres)

const CREATE_MOVIE_QUERY = gql`
    mutation createMovie($input: CreateMovieInput) {
        createMovie(input: $input) {
            _id
            name
            year
            isInTheaters
            genres
            posters {
                sourceId
                url
                deleteHash
                isMain
            }
    }
}
`

export function CreateMovie(){
    const { register, handleSubmit, formState: {errors}, setValue, watch } = useForm<CreateFormState>(
        {
            defaultValues: {
                name: "", 
                year: null,
                genres: new Set(),
                isInTheaters: false,
                posters: []
            },
            resolver: zodResolver(createSchema)
        }
    )

    const [location, setLocation] = useLocation();

    const [createMovieGraphql, { loading, error, data }] = useMutation(CREATE_MOVIE_QUERY)

    const toast = useToast()

    

    useEffect(()=>{
        if(data){
            setLocation('/')
        }
        if(error) { 
            toast({
                title: 'Could not add movie',
                description: error.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
            }) 
        }
    },[data, error])

    const selectedGenres = watch('genres')
    const posters = watch('posters')

   
    function onSubmit(data: CreateFormState){
        const dataToSubmit = {
            ...data,
            genres: Array.from(data.genres)
        }
        createMovieGraphql({variables: {input: dataToSubmit}})
    }

    function onGenreClick(genreName: MovieGenres, isSelected: boolean){
        if(isSelected){
            selectedGenres.delete(genreName)
        } else {
            selectedGenres.add(genreName)
        }
        setValue('genres', new Set(selectedGenres))
    }




    return (
        <Page>
            <Flex justifyContent="center" mt="10">
                <Box width="xl" bg="twitter.100" p="4" borderRadius="sm" height="fit-content">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl my="2">
                            <FormLabel >* Name:</FormLabel>
                            <Input variant="filled" placeholder="Add name for the movie" disabled={loading}
                            {...register('name')}
                            />
                            <FormHelperText color="red" pl="4">{errors.name?.message}</FormHelperText>
                        </FormControl>
                        <FormControl my="2">
                            <FormLabel>* Year:</FormLabel>
                                <Input  variant="filled" placeholder="Add year for the movie" type="number"
                                 disabled={loading}
                                {...register('year', {valueAsNumber: true})}
                                />
                                <FormHelperText color="red" pl="4">{errors.year?.message}</FormHelperText>
                        </FormControl>
                        <FormLabel >Genres:</FormLabel>
                        <Flex flexWrap="wrap">
                            {movieGenresList.map((genre)=>{
                                const isSelected = selectedGenres.has(genre)
                                return (
                                    <Tag 
                                        key={genre}
                                        cursor="pointer"
                                        textTransform="capitalize"
                                        mr="2" 
                                        p="2" 
                                        colorScheme="twitter" 
                                        variant={isSelected ? "solid" : "outline"}
                                        onClick={(()=>{
                                            if(!loading){
                                                onGenreClick(genre, isSelected)
                                            }
                                        })}
                                    >
                                        {MovieGenres[genre].toLowerCase()}
                                    </Tag>
                                )
                            })}
                        </Flex>
                        <Checkbox 
                            {...register('isInTheaters')}
                            mt="4"
                            colorScheme="facebook"
                            size="lg"
                            borderColor="facebook.900"
                            disabled={loading}
                        >
                            <Text fontSize="md">Currently in Theaters</Text>
                        </Checkbox>
                        <Flex justify="flex-end" mt="4" alignItems="center">
                            <Button
                                type="submit"
                            
                                colorScheme="telegram"
                                disabled={loading}
                            >
                                Create
                            </Button>
                            {loading && (<Spinner size="lg" ml="4"/>)}
                        </Flex>
                    </form>
                </Box>
                {/* <Poster posterUrl={"https://m.media-amazon.com/images/M/MV5BZDBkZjRiNGMtZGU2My00ODdkLWI0MGYtNGU4MmJjN2MzOTkxXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg"}/> */}
                <MainPoster posters={posters} setValue={setValue}/>
            </Flex>
        </Page>
    )
}

function MainPoster({posters, setValue}: {posters: [Poster], setValue: Function}){
    const inputRef = useRef<HTMLInputElement>(null)

    const onClick = () => {
        inputRef.current?.click()
    }


    const { mutate, data, isLoading }  = rqUseMutation((file: File)=>{
        return imgur.uploadImage(file)
    })

    const { mutate: deleteMutate, data: deletedHash, isLoading: deleteIsLoading } =
    rqUseMutation((deleteHash: string)=>{
        return imgur.deleteImage(deleteHash)
    })

    useEffect(()=>{
        if(data){
            const sourceData = data?.data.data
            setValue('posters',[
                ...posters,
                {
                    sourceId: sourceData.id,
                    url: sourceData.link,
                    deleteHash: sourceData.deletehash,
                    isMain: true
                }
            ])
        }
    }, [data])

    useEffect(()=>{
        if(deletedHash){
            setValue('posters', posters.filter((poster: Poster)=>{
                return poster.deleteHash !== deletedHash
            }))
        }
    }, [deletedHash])

    const poster = !!posters.length && posters[0]
    
    
    return (
        <Flex alignItems="center" w="315px" h="470px" ml="4" cursor="pointer"
            boxSizing="border-box" justify="center" 
            border={poster && !isLoading && !deleteIsLoading ? "none" : "1px"}
            onClick={onClick} 
        >
            {(isLoading || deleteIsLoading) && (<Spinner size="lg"/>)}     
            {!isLoading && !deleteIsLoading && poster && (
                <Box position="relative" role="group" height="100%">
                    <IconButton aria-label='remove poster' icon={<CloseIcon />} 
                    position="absolute" top="10px" right="10px"
                    onClick={(ev)=>{
                        ev.stopPropagation()
                        deleteMutate(poster.deleteHash)
                    }}
                    visibility="hidden"
                    variant="solid"
                    _groupHover={{visibility: "visible"}}
                    size="md"
                    colorScheme="red"
                />
                    <Image src={poster.url} htmlHeight="470px" htmlWidth="315px"
                        alt="No poster yet"
                    />
                </Box>
            )}
            {!isLoading && !deleteIsLoading && !poster && (
                <Text>
                    Add Poster
                </Text>
            )} 
            <Input ref={inputRef} display="none" type="file" onChange={(ev)=>{ 
                if(ev.target.files?.length){
                    mutate(ev.target.files[0])
                }
                ev.target.value = ""

            }}/> 
        </Flex>
    )    
}