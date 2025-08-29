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
      throw new Error(responseData?.detail || "Failed to add hunter");
    }
    return responseData;
  } catch (error) {
    console.error("Error posting data:", error);
    return null;
  }
};
