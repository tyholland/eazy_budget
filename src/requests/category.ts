const api = process.env.REACT_APP_API;

export const createCategory = async (accessToken: string, category: string) => {
  try {
    const categoryResponse = await fetch(`${api}/category/create`, {
      method: "POST",
      body: JSON.stringify({ category }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });

    return await categoryResponse.json();
  } catch (err) {
    throw new Error(`Failed to create user`);
  }
};

export const deleteCategory = async (
  accessToken: string,
  category_id: number,
) => {
  try {
    const categoryResponse = await fetch(`${api}/category/remove`, {
      method: "PUT",
      body: JSON.stringify({ category_id }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });

    return await categoryResponse.json();
  } catch (err) {
    throw new Error(`Failed to delete category`);
  }
};

export const getCategory = async (accessToken: string) => {
  try {
    const categoryResponse = await fetch(`${api}/category`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });

    return await categoryResponse.json();
  } catch (err) {
    throw new Error(`Failed to get categories`);
  }
};
