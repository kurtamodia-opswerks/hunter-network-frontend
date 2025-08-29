export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchAuthData = async (url, authFetch) => {
  try {
    const response = await authFetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Failed to fetch raid participations", error);
    throw error;
  }
};

export const postData = async (url, data, authFetch) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await authFetch(url, options);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData?.detail || "Failed to add data");
    }
    return responseData;
  } catch (error) {
    console.error("Error posting data:", error);
    return null;
  }
};

export const putData = async (url, data, authFetch) => {
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await authFetch(url, options);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData?.detail || "Failed to update data");
    }
    return responseData;
  } catch (error) {
    console.error("Error updating data:", error);
    return null;
  }
};

export const deleteData = async (url, authFetch) => {
  try {
    const options = { method: "DELETE" };
    const response = await authFetch(url, options);
    if (response.status === 204) {
      // No content, deletion successful
      return true;
    }
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData?.detail || "Failed to delete data");
    }
    return responseData;
  } catch (error) {
    console.error("Error deleting data:", error);
    return null;
  }
};
