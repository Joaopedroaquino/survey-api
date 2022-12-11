import { EmailValidatorAdapter } from "./email-validator"
import  validator  from "validator"

jest.mock('validator', ()=> ({
    isEmail(): boolean {
        return true
        
    } 
}))


describe('EmailValidator Adapter', ()=>{
    test('Should return false if validato returns false', ()=> {
        jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
        const sut = new EmailValidatorAdapter()
        const isValid = sut.isValid('invalid_email@mail.com')
        expect(isValid).toBe(false)

    }),
    test('Should return true if validato returns true', ()=> {
        const sut = new EmailValidatorAdapter()
        const isValid = sut.isValid('valid_email@mail.com')
        expect(isValid).toBe(true)

    }),
    test('Should call validator with correct email', ()=> {

        const isEmailSpy = jest.spyOn(validator, 'isEmail')
        const sut = new EmailValidatorAdapter()
        sut.isValid('any_email@mail.com')
        expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')

    })
})