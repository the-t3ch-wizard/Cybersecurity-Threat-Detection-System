

export const response = (success: boolean, data: any, message: string) => {
  return {
    success, data, message
  }
}