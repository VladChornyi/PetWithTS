interface IError{
  message: string
}

export const setErrorStatus = (error:IError) => {
  return {
    status: +error.message.slice(-3),
    message: error.message,
  };
};
