describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('should show login screen on startup', async () => {
    await expect(element(by.text('This is Login Page'))).toBeVisible()
  })
})
