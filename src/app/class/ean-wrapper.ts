export class EanWrapper {

    eanValue:string = ""
    barcodeValue:string = ""
    setA = {
        "0":"0001101",
        "1":"0011001",
        "2":"0010011",
        "3":"0111101",
        "4":"0100011",
        "5":"0110001",
        "6":"0101111",
        "7":"0111011",
        "8":"0110111",
        "9":"0001011",
    }
    
    setB = {
        "0":"0100111",
        "1":"0110011",
        "2":"0011011",
        "3":"0100001",
        "4":"0011101",
        "5":"0111001",
        "6":"0000101",
        "7":"0010001",
        "8":"0001001",
        "9":"0010111",
    }
    
    setC = {
        "0":"1110010",
        "1":"1100110",
        "2":"1101100",
        "3":"1000010",
        "4":"1011100",
        "5":"1001110",
        "6":"1010000",
        "7":"1000100",
        "8":"1001000",
        "9":"1110100",
    }

    constructor(possibleEan:string) {
        if(this.isCorrectEan(possibleEan)){
            this.eanValue = possibleEan;
            this.calculateBarCodeValue()

        } else {
            throw "Invalid EAN: " + possibleEan;
        }

    }

    isCorrectEan(inputValue:string) {
        if (! inputValue){
          return false
        }
              
        var testLen = inputValue.length
      
        if (testLen != 13 && testLen != 8){
          return false
        }
      
        if (! (inputValue.match(/^[0-9]+$/) != null && parseInt(inputValue) >0)){
          return false
        }
      
        var eanDigitLess = inputValue.slice(0,testLen-1)
        var possibleDigitCheck = inputValue[testLen-1]
        if (possibleDigitCheck != this.calculateDigitCheck(eanDigitLess)){
            return false
        }
                  
        return true
        
    }

    calculateDigitCheck(eanDigitCheckLess:string) {
  
        var lenstrCalcul = eanDigitCheckLess.length
        var factor = 3
        var somme = 0
      
        if (! (eanDigitCheckLess.match(/^[0-9]+$/) != null && parseInt(eanDigitCheckLess) >0)){
          return "KO"
        }
      
        for (let index = lenstrCalcul -1; index >-1 ; index--) {
          somme += parseInt(eanDigitCheckLess[index]) * factor
          factor = 4 - factor
        }   
            
        const digitCheck = ((10 - (somme % 10))%10).toString()
      
        return digitCheck
    }

    calculateBarCodeValue() {
        this.barcodeValue = "101"
    
        var prefix = this.eanValue[0]
    
        if (this.eanValue.length == 13){
            var firstPartRaw = this.eanValue.substring(1,7)
            var lastPartRaw = this.eanValue.substring(7)
        } else if (this.eanValue.length == 8) {
            var firstPartRaw = this.eanValue.substring(0,4)
            var lastPartRaw = this.eanValue.substring(4)
        } else {
            this.barcodeValue = ""
            return
        }
        
    
        for (let index = 0; index < firstPartRaw.length; index++) {
            if (firstPartRaw.length == 6){
                const setToApply = this.findSetByPrefixAndIndex(prefix,index)
                if (setToApply == "A") {
                    this.barcodeValue = this.barcodeValue + this.setA[firstPartRaw[index] as keyof typeof this.setA]
                } else {
                    this.barcodeValue = this.barcodeValue + this.setB[firstPartRaw[index] as keyof typeof this.setB]
                }
            } else {
                this.barcodeValue = this.barcodeValue + this.setA[firstPartRaw[index] as keyof typeof this.setA]
            }
            
        }
    
        this.barcodeValue = this.barcodeValue + "01010"
    
        for (let index = 0; index < lastPartRaw.length; index++) {
            this.barcodeValue = this.barcodeValue + this.setC[lastPartRaw[index] as keyof typeof this.setC]
            
        }
        
        this.barcodeValue = this.barcodeValue + "101"
    
        this.barcodeValue = this.barcodeValue
    }

    findSetByPrefixAndIndex(prefix:string,index:number) {

        if (index == 0 || prefix == "0"){
            return "A"
        } else if (prefix == "1"){
    
            return (index==1 || index==3) ? "A" : "B"
    
        } else if (prefix == "2") {
            
            return (index==1 || index==4) ? "A" : "B"
        
        } else if (prefix == "3") {
        
            return (index==1 || index==5) ? "A" : "B"
        
        } else if (prefix == "4") {
        
            return (index==2 || index==3) ? "A" : "B"
        
        } else if (prefix == "5") {
        
            return (index==3 || index==4) ? "A" : "B"
        
        } else if (prefix == "6") {
        
            return (index==4 || index==5) ? "A" : "B"
        
        } else if (prefix == "7") {
        
            return (index==2 || index==4) ? "A" : "B"
        
        } else if (prefix == "8") {
        
            return (index==2 || index==5) ? "A" : "B"
        
        } else if (prefix == "9") {
        
            return (index==3 || index==5) ? "A" : "B"
        
        } else {
            return null
        }
                
    }

    getMaskStyle() {
        var styleMask ="111"
    
        if (this.eanValue.length == 13){
            var numberOfValue = 6
    
         } else if (this.eanValue.length == 8) {
            var numberOfValue = 4
    
        } else {
            return ""
        }
    
        for (let index = 0; index < numberOfValue; index++) {
            styleMask = styleMask +"0000000"
        }
    
        styleMask = styleMask +"11111"
    
        for (let index = 0; index < numberOfValue; index++) {
            styleMask = styleMask +"0000000"
        }
    
        styleMask = styleMask +"111"
    
        return styleMask
    }
}
