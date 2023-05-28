import Api from "./Api";

export const UserLogin = async (data) => {
  try {
    const result = await Api("/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};

// export const StockList = async (data) => {
//   try {
//     const result = await Api("/trx/stock-in", {
//       method: "GET",
//       headers: {
//         "content-type": "application/json",
//       },
//       data: data,
//     });
//     return result;
//   } catch (error) {
//     return error;
//   }
// };

