export function getValuesFromEnumAsArray(enumData: Object){
    return Object.values(enumData).filter((value: string)=>{
        return Number.isInteger(Number(value))
    })
}
