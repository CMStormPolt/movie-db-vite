export function getValuesFromEnumAsArray(enumData: Object){
    return Object.values(enumData).filter((value: string)=>{
        console.log(value, 'value')
        return Number.isInteger(Number(value))
    })
}
