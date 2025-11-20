

export const clearCache = () => {

const today = new Date()
const tomorrow = new Date(today.getFullYear() , today.getMonth() , today.getDate() + 1)
const secondUntilMidnight = Math.ceil((tomorrow.getTime() - today.getTime()) / 1000)

return secondUntilMidnight


}
