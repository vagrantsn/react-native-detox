describe('Login Page', () => {
  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('should show login screen on startup', async () => {
    await expect(element(by.text('Login'))).toBeVisible()
  })

  it('should login successfully', async () => {
    await element(by.id('email')).typeText('vagner-teste')
    await element(by.id('password')).typeText('123')
    await element(by.id('login')).tap()

    await expect(element(by.text('Welcome to LoggedArea'))).toBeVisible()
  })

  it('should not login successfully', async () => {
    await element(by.id('email')).typeText('vagner-erro')
    await element(by.id('password')).typeText('123')
    await element(by.id('login')).tap()

    await expect(element(by.text('Welcome to LoggedArea'))).toBeNotVisible()
  })
})
