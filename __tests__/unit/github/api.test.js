const GithubAPI = require('../../../lib/github/api')
const Helper = require('../../../__fixtures__/unit/helper')

describe('listFiles', () => {
  test('return correct data if no error', async () => {
    const res = await GithubAPI.listFiles(Helper.mockContext({ files: ['abc.js', 'def.js'] }))

    expect(res.length).toEqual(2)
    expect(res[0]).toEqual({ filename: 'abc.js', additions: 0, deletions: 0, changes: 0, status: 'modified' })
  })

  test('that error are re-thrown', async () => {
    const context = Helper.mockContext()
    context.octokit.pulls.listFiles.endpoint.merge = jest.fn().mockRejectedValue({ status: 402 })

    try {
      await GithubAPI.listFiles(context)
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false)
    } catch (e) {
      expect(e.status).toBe(402)
    }
  })
})

describe('createChecks', () => {
  test('return correct data if no error', async () => {
    const res = await GithubAPI.createChecks(Helper.mockContext())

    expect(res.data.id).toEqual(1)
  })

  test('that error are re-thrown', async () => {
    const context = Helper.mockContext()
    context.octokit.checks.create = jest.fn().mockRejectedValue({ status: 402 })

    try {
      await GithubAPI.createChecks(context)
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false)
    } catch (e) {
      expect(e.status).toBe(402)
    }
  })
})

describe('updateChecks', () => {
  test('return correct data if no error', async () => {
    const res = await GithubAPI.updateChecks(Helper.mockContext())
    expect(res).toEqual({})
  })

  test('that error are re-thrown', async () => {
    const context = Helper.mockContext()
    context.octokit.checks.update = jest.fn().mockRejectedValue({ status: 402 })

    try {
      await GithubAPI.updateChecks(context)
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false)
    } catch (e) {
      expect(e.status).toBe(402)
    }
  })
})