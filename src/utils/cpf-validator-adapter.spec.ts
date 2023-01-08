import { CpfValidatorAdapter } from './cpf-validator-adapter'
import { cpf } from 'cpf-cnpj-validator'

const makeSut = (): CpfValidatorAdapter => {
  return new CpfValidatorAdapter()
}

describe('CpfValidator Adapter', () => {
  test('Should return false if cpf-cnpj-validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(cpf, 'isValid').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_cpf')
    expect(isValid).toBe(false)
  })

  test('Should return true if cpf-cnpj-validator returns true', () => {
    const sut = makeSut()
    jest.spyOn(cpf, 'isValid').mockReturnValueOnce(true)
    const isValid = sut.isValid('valid_cpf')
    expect(isValid).toBe(true)
  })

  test('Should call cpf-cnpj-validator with correct email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(cpf, 'isValid')
    sut.isValid('any_cpf')
    expect(isEmailSpy).toHaveBeenCalledWith('any_cpf')
  })
})
