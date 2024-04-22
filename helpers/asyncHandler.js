export const asyncHandler = (apiFunction) => {
  return async (req, res, next) => {
    try {
      await apiFunction(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
