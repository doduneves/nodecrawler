class Utils{
    static specifyMonthNumber(strMonth){
        try{
            var monthNumber = 0
            switch(strMonth.toLowerCase()){
                case 'jan':
                case 'janeiro':
                    monthNumber = 1
                    break
                case 'fev':
                case 'fevereiro':
                    monthNumber = 2
                    break
                case 'mar':
                case 'março':
                    monthNumber = 3
                    break
                case 'abr':
                case 'abril':
                    monthNumber = 4
                    break
                case 'mai':
                case 'maio':
                    monthNumber = 5
                    break
                case 'jun':
                case 'junho':
                    monthNumber = 6
                    break
                case 'jul':
                case 'julho':
                    monthNumber = 7
                    break
                case 'ago':
                case 'agosto':
                    monthNumber = 8
                    break
                case 'set':
                case 'setembro':
                    monthNumber = 9
                    break
                case 'out':
                case 'outubro':
                    monthNumber = 10
                    break
                case 'nov':
                case 'novembro':
                    monthNumber = 11
                    break
                case 'dez':
                case 'dezembro':
                    monthNumber = 12
                    break
                default:
                    break
                
            }
    
            return monthNumber
        }catch (e){
            console.log(e)
        }
        

    }

    static formatDate(postDate){
        try{
            var dia = postDate.split(" ")[0]
            var mes = postDate.split(" ")[1]
            mes = Utils.specifyMonthNumber(mes.replace(',',''))
            var ano = postDate.split(" ")[2]
    
            var date = new Date(Date.UTC(ano,mes,dia,3,0,0))
    
            return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
        }catch(e){
            console.log(e)
        }
    }
}

module.exports = Utils
